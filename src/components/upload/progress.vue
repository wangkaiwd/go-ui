<template>
  <div class="progress">
    <div ref="inner" class="progress-inner"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent: {
      handler (val) {
        this.$nextTick(() => {
          this.$refs.inner.style.width = val + '%';
        });
      },
      immediate: true
    }
  },
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.progress {
  background-color: #eaeef4;
  border-radius: 100px;
  height: 6px;
  .progress-inner {
    background-color: $primary;
    height: 100%;
    border-radius: 100px;
    transition: width 0.2s linear;
  }
}
</style>
