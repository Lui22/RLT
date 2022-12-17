<template>
  <div class="search panel">
    <div class="search__input skeleton"></div>
    <icon-component class="search__close" type="close" />
  </div>
</template>

<style lang="scss">
.search {
  padding: 18px 68px 18px 18px;
  position: relative;

  &__input {
    border-radius: 12px;
    height: 36px;
  }

  &__close {
    position: absolute;
    right: 8px;
    top: 8px;
  }
}
</style>
<script>
import IconComponent from "@/components/IconComponent.vue";
export default {
  components: { IconComponent },
};
</script>
