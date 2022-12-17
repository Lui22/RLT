<template>
  <div class="item-image">
    <div :class="classTop"></div>
    <div :class="classBottom"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps(["type"]);

const classTop = computed(
  () => `item-image__top item-image__top_${props.type}`
);
const classBottom = computed(
  () => `item-image__bottom item-image__bottom_${props.type}`
);
</script>

<style lang="scss">
.item-image {
  position: relative;
  height: 130px;
  width: 130px;

  &__top {
    z-index: 1;
    width: 90%;
    height: 90%;
    backdrop-filter: blur(6px);
    top: 0;
    right: 0;
    position: absolute;

    &_green {
      background: rgba(184, 217, 152, 0.35);
    }

    &_yellow {
      background: rgba(217, 187, 152, 0.35);
    }

    &_purple {
      background: rgba(116, 129, 237, 0.35);
    }
  }

  &__bottom {
    width: 90%;
    height: 90%;
    bottom: 0;
    left: 0;
    position: absolute;

    &_green {
      background: #7faa65;
    }

    &_yellow {
      background: #aa9765;
    }

    &_purple {
      background: #656caa;
    }
  }
}
</style>
