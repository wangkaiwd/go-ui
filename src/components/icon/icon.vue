<template>
  <svg
    v-bind="$attrs"
    v-on="$listeners"
    class="go-icon"
    aria-hidden="true"
  >
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
import '@/shared/svg';

export default {
  name: 'GoIcon',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>
.go-icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
