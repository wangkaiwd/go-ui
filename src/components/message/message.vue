<template>
  <div :class="['message',type]">
    message
  </div>
</template>

<script>
// 需求整理：
//  1. 在body中渲染，否则可能由于overflow:hidden而导致无法看到
export default {
  name: 'GoMessage',
  props: {
    type: {
      type: String,
      validator (val) {
        return ['success', 'error', 'info', 'warning'].includes(val);
      }
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {};
  },
  mounted () {
    this.autoClose();
  },
  methods: {
    autoClose () {
      setTimeout(() => {
        this.close();
      }, this.duration);
    },
    close () {
      this.$destroy();
      this.$el.remove();
    }
  }
};
</script>
<style lang="scss" scoped>
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
