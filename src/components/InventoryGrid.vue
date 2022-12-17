<template>
  <div class="inventory-grid">
    <inventory-item
      v-for="el in items"
      :id="el.id"
      :key="el.id"
      :amount="el.amount"
      :type="el.type"
      @didDrop="handleItemDrop"
      @openInfo="handleItemClick"
    />
    <item-info-panel
      @close="infoPanelClose"
      @deleteItem="deleteItem"
      v-if="itemId"
      :id="itemId"
      v-motion="'infoPanel'"
      :amount="itemAmount"
      :enter="{
        x: 0,
        transition: {
          stiffness: 2500,
          damping: 600,
          mass: 20,
        },
      }"
      :initial="{
        x: 250,
        transition: {
          stiffness: 2500,
          damping: 600,
          mass: 10,
        },
      }"
      :type="itemType"
    />
  </div>
</template>

<script lang="ts" setup>
import InventoryItem from "@/components/InventoryItem.vue";
import { onMounted, reactive, ref } from "vue";
import ItemInfoPanel from "@/components/ItemInfoPanel.vue";
import { useMotions } from "@vueuse/motion";
import { findIndexById } from "@/helpers/findIndexById";
import type { item } from "@/types/itemType";

const itemsDefault = [
  { id: 1, type: "green", amount: 4 },
  { id: 2, type: "yellow", amount: 2 },
  { id: 3, type: "purple", amount: 5 },
  { id: 4, type: null, amount: null },
  { id: 5, type: null, amount: null },
  { id: 6, type: null, amount: null },
  { id: 7, type: null, amount: null },
  { id: 8, type: null, amount: null },
  { id: 9, type: null, amount: null },
  { id: 10, type: null, amount: null },
  { id: 11, type: null, amount: null },
  { id: 12, type: null, amount: null },
  { id: 13, type: null, amount: null },
  { id: 14, type: null, amount: null },
  { id: 15, type: null, amount: null },
  { id: 16, type: null, amount: null },
  { id: 17, type: null, amount: null },
  { id: 18, type: null, amount: null },
  { id: 19, type: null, amount: null },
  { id: 20, type: null, amount: null },
  { id: 21, type: null, amount: null },
  { id: 22, type: null, amount: null },
  { id: 23, type: null, amount: null },
  { id: 24, type: null, amount: null },
  { id: 25, type: null, amount: null },
];
const items: Array<item> = reactive([]);

const removeItemFromList = (id: number) => {
  const itemIndex = findIndexById(items, id);
  items[itemIndex].type = null;
  items[itemIndex].amount = null;

  updateLocalInventory();
};
const putItemToList = (id: number, type: string, amount: number) => {
  const itemIndex = findIndexById(items, id);
  items[itemIndex].type = type;
  items[itemIndex].amount = amount;

  updateLocalInventory();
};

const updateLocalInventory = () => {
  localStorage.setItem("inventory", JSON.stringify(items));
};

onMounted(() => {
  let inventory: Array<item> = itemsDefault;

  const savedInventory = localStorage.getItem("inventory");
  if (savedInventory) {
    inventory = JSON.parse(savedInventory);
  }
  items.push(...inventory);
});

const infoPanelClose = () => {
  const { infoPanel } = useMotions();
  infoPanel.apply("initial");
};
const infoPanelOpen = () => {
  const { infoPanel } = useMotions();
  infoPanel.apply("enter");
};
const deleteItem = (dataString: string) => {
  const data = JSON.parse(dataString);

  const itemIndex = findIndexById(items, data.id);
  items[itemIndex].amount -= data.deleteAmount;
  if (items[itemIndex].amount < 1) {
    removeItemFromList(data.id);
    resetItemInfo();
  }
  updateLocalInventory();
};

const itemId = ref();
const itemType = ref();
const itemAmount = ref();
const handleItemClick = (data: string) => {
  const item = JSON.parse(data);

  itemId.value = item.id;
  itemType.value = item.type;
  itemAmount.value = item.amount;
  infoPanelOpen();
};
const resetItemInfo = () => {
  infoPanelClose();
  setTimeout(() => {
    itemId.value = undefined;
    itemType.value = undefined;
    itemAmount.value = undefined;
  }, 500);
};

const handleItemDrop = (dataString: string) => {
  const data = JSON.parse(dataString);
  removeItemFromList(data.srcId);
  putItemToList(data.currentId, data.type, data.amount);
};
</script>

<style lang="scss">
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  overflow: hidden;
  position: relative;

  border-top: 1px solid var(--panel-border);
  border-left: 1px solid var(--panel-border);
  border-radius: 12px;
}
</style>
