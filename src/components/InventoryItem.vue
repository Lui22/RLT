<template>
  <div
    :class="classList"
    :draggable="isDraggable"
    @click="handleClick"
    @dragstart="start"
    @drop="drop"
    @dragover.prevent
    @drag="drag"
  >
    <item-image-component
      v-if="type"
      :type="type"
      class="inventory-item__image"
    />
    <span v-if="amount" class="inventory-item__counter">{{ amount }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import ItemImageComponent from "@/components/ItemImageComponent.vue";

const emit = defineEmits(["openInfo", "didDrop"]);

const props = defineProps(["id", "type", "amount"]);
const id = ref(props.id);
const type = ref(props.type);
const amount = ref(props.amount);

watch(props, (newProps) => {
  id.value = newProps.id;
  type.value = newProps.type;
  amount.value = newProps.amount;
});

const classList = computed(() => {
  return {
    "inventory-item": true,
    "inventory-item_dragging": isDragging.value,
  };
});

const isDraggable = computed(() => {
  return type.value !== null;
});

const isDragging = ref(false);
const start = (e: DragEvent) => {
  if (!e.dataTransfer) return;
  if (!e.currentTarget) return;

  isDragging.value = true;

  e.dataTransfer.setData("id", id.value);
  e.dataTransfer.setData("type", type.value);
  e.dataTransfer.setData("amount", amount.value);
};
const drop = (e: DragEvent) => {
  isDragging.value = false;
  if (!e.dataTransfer) return;
  if (type.value || amount.value) return;

  const srcId = e.dataTransfer.getData("id");
  emit(
    "didDrop",
    JSON.stringify({
      srcId: parseInt(srcId),
      currentId: parseInt(id.value),
      amount: parseInt(e.dataTransfer.getData("amount")),
      type: e.dataTransfer.getData("type"),
    })
  );
};
const drag = () => {
  isDragging.value = false;
};

const handleClick = () => {
  if (!type.value) return;

  emit(
    "openInfo",
    JSON.stringify({
      id: id.value,
      type: type.value,
      amount: amount.value,
    })
  );
};
</script>

<style lang="scss">
.inventory-item {
  transition: background 0.1s ease-out;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--panel-bg);

  border-bottom: 1px solid var(--panel-border);
  border-right: 1px solid var(--panel-border);

  &:first-of-type {
    border-top-left-radius: 12px;
  }

  &:last-of-type {
    border-bottom-right-radius: 12px;
  }

  &_dragging {
    border-radius: 24px;
    border: 1px solid var(--panel-border);
  }

  &:hover {
    background: var(--hover-bg);
  }

  &__image {
    width: 54px;
    height: 54px;
  }

  &__counter {
    padding: 2px 4px;
    border: 1px solid var(--panel-border);
    border-radius: 6px 0 0 0;
    color: var(--icon-color);
    opacity: 0.4;
    position: absolute;
    bottom: -1px;
    right: -1px;
    font-family: "Inter", sans-serif;
    font-size: 10px;
  }
}
</style>
