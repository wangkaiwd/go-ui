<template>
  <div
    class="go-col"
    :class="`go-col-${span}`"
    :style="colStyles"
  >
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
  computed: {
    gutter () {
      return this.$parent.gutter || 0;
    },
    colStyles () {
      return {
        paddingLeft: this.gutter + 'px'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.go-col {
  display: inline-block;
  vertical-align: top;
  // 循环生成所有的col
  @for $i from 1 through 24 {
    &-#{$i} {
      width: calc(#{$i} / 24 * 100%);
    }
  }
}
</style>
