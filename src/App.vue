<template>
  <div class="inventory">
    <profile-panel />
    <inventory-grid />
    <search-panel class="inventory__search" />
  </div>
</template>

<script setup>
import InventoryGrid from "@/components/InventoryGrid.vue";
import ProfilePanel from "@/components/ProfilePanel.vue";
import SearchPanel from "@/components/SearchPanel.vue";
</script>

<style lang="scss">
.inventory {
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 24px;

  &__search {
    grid-column: 1/3;
  }
}
</style>
