<template>
  <div
    class="go-col"
    :class="colClasses"
    :style="colStyles"
  >
    <slot></slot>
  </div>
</template>

<script>
const dimensions = ['xs', 'sm', 'md', 'lg'];
// dimension: 1. 尺寸；规格 2. 维度
export default {
  name: 'GoCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    xs: {
      type: Number
    },
    sm: {
      type: Number
    },
    md: {
      type: Number
    },
    lg: {
      type: Number
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
    },
    colClasses () {
      return dimensions.reduce((accumulator, dimension) => {
        const value = this[dimension];
        if (value) {
          accumulator.push(`go-col-${dimension}-${value}`);
        }
        return accumulator;
      }, [`go-col-${this.span}`]);
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
  @media screen and (min-width: 1600px) {
    @for $i from 1 through 24 {
      &-xxl-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
  @media screen and (min-width: 1200px) {
    @for $i from 1 through 24 {
      &-xl-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
  @media screen and (min-width: 992px) {
    @for $i from 1 through 24 {
      &-lg-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
  @media screen and (min-width: 786px) {
    @for $i from 1 through 24 {
      &-md-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
  @media screen and (min-width: 576px) {
    @for $i from 1 through 24 {
      &-sm-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
  @media screen and (max-width: 576px) {
    @for $i from 1 through 24 {
      &-xs-#{$i} {
        width: calc(#{$i} / 24 * 100%);
      }
    }
  }
}
</style>
