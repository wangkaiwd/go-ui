<template>
  <div class="go-col" :class="`go-col-${span}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoCol',
  props: {
    span: {
      type: Number,
      default: 24
    }
  },
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-col {
  // 循环生成所有的col
  @for $i from 1 through 24 {
    &-#{$i} {
      width: calc(#{$i} / 24 * 100%);
    }
  }
}
</style>
