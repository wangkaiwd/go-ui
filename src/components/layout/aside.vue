<template>
  <div class="go-aside" :style="{width: width + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoAside',
  props: {
    width: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-aside {
}
</style>
