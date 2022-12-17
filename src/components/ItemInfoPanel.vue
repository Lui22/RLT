<template>
  <div class="item-info">
    <icon-component
      class="item-info__close"
      type="close"
      @click="$emit('close')"
    />
    <item-image-component class="item-info__image" :type="type" />
    <div class="item-info-text">
      <div class="item-info-heading skeleton"></div>
      <div class="item-info-description">
        <div
          class="item-info-description-line item-info-description-line_1 skeleton"
        />
        <div
          class="item-info-description-line item-info-description-line_1 skeleton"
        />
        <div
          class="item-info-description-line item-info-description-line_1 skeleton"
        />
        <div
          class="item-info-description-line item-info-description-line_2 skeleton"
        />
        <div
          class="item-info-description-line item-info-description-line_3 skeleton"
        />
      </div>
    </div>
    <div class="item-info__buttons">
      <button
        class="item-info__button item-info__button_size_fill button button_danger"
        @click="amountPanelOpen"
      >
        Удалить предмет
      </button>
    </div>

    <div
      v-motion="'amountPanel'"
      :initial="{
        y: 200,
        transition: {
          stiffness: 2500,
          damping: 600,
          mass: 10,
        },
      }"
      :variants="{
        open: {
          y: 0,
          transition: {
            stiffness: 2500,
            damping: 600,
            mass: 20,
          },
        },
      }"
      class="item-info__delete"
    >
      <input
        v-model="deleteAmount"
        :max="amount"
        class="input"
        min="1"
        placeholder="Введите количество"
        type="number"
      />
      <div class="item-info__buttons">
        <button
          class="item-info__button button button_cancel"
          @click="amountPanelClose"
        >
          Отмена
        </button>
        <button
          class="item-info__button button button_danger"
          @click="deleteItem"
        >
          Подтвердить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ItemImageComponent from "@/components/ItemImageComponent.vue";
import IconComponent from "@/components/IconComponent.vue";
import { useMotions } from "@vueuse/motion";
import { ref } from "vue";

const props = defineProps(["id", "amount", "type"]);
const emit = defineEmits(["deleteItem"]);

const amountPanelOpen = () => {
  const { amountPanel } = useMotions();
  amountPanel.apply("open");
};
const amountPanelClose = () => {
  const { amountPanel } = useMotions();
  amountPanel.apply("initial");
};

const deleteAmount = ref();
const deleteItem = () => {
  if (!deleteAmount.value) return;
  if (deleteAmount.value > props.amount) {
    alert("Введите число меньше");
    return;
  }
  emit(
    "deleteItem",
    JSON.stringify({
      id: props.id,
      deleteAmount: deleteAmount.value,
    })
  );
};
</script>

<style lang="scss" scoped>
.item-info {
  width: 250px;
  height: 100%;
  box-sizing: border-box;

  position: absolute;
  right: 0;
  z-index: 2;

  border-left: 1px solid var(--panel-border);
  background: var(--panel-over-bg);
  backdrop-filter: blur(8px);

  display: flex;
  row-gap: 18px;
  flex-direction: column;
  align-items: center;
  padding: 55px 15px 18px;

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &__image {
    margin-bottom: 12px;
  }

  &-text {
    width: 100%;
    padding-inline: 5px;
    padding-top: 16px;
    padding-bottom: 24px;

    border-top: 1px solid var(--panel-border);
    border-bottom: 1px solid var(--panel-border);

    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  &-heading {
    height: 30px;
    border-radius: 8px;
  }

  &-description {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: center;

    &-line {
      height: 10px;
      border-radius: 4px;

      &_1 {
        width: 100%;
      }

      &_2 {
        width: 180px;
      }

      &_3 {
        width: 80px;
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__button_size_fill {
    width: 100%;
    padding-block: 11px;
  }

  .item-info__delete {
    width: 100%;
    padding: 20px 21px;
    box-sizing: border-box;

    background: var(--panel-bg);
    border: 1px solid var(--panel-border);
    border-bottom-right-radius: 12px;

    position: absolute;
    bottom: 0;
    left: -1px;

    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
