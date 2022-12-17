<template>
  <div class="icon">
    <svg
      v-if="type === 'close'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
        fill="currentColor"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps(["type"]);
</script>

<style lang="scss">
.icon {
  cursor: pointer;
}

svg {
  color: var(--icon-color);
}
</style>
