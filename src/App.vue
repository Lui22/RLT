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
