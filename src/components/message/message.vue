<template>
  <transition name="slide" @after-leave="onAfterLeave">
    <div :class="['message',type]" v-show="visible">
      <go-icon class="message-icon" :name="type"></go-icon>
      <div class="message-content">
        {{ message }}
      </div>
      <go-icon class="message-close" name="close" @click="visible=false" v-if="showClose"></go-icon>
    </div>
  </transition>
</template>

<script>
// 需求整理：
//  1. 在body中渲染，否则可能由于overflow:hidden而导致无法看到
export default {
  name: 'GoMessage',
  props: {
    type: {
      type: String,
      default: 'info',
      validator (val) {
        return ['success', 'error', 'info', 'warning'].includes(val);
      }
    },
    duration: {
      type: Number,
      default: 3000
    },
    message: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    };
  },
  mounted () {
    this.visible = true;
    // 0 or show close button, message will not automatically close
    if (!this.showClose || this.duration === 0) {
      this.autoClose();
    }
  },
  methods: {
    autoClose () {
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
    onAfterLeave () {
      this.close();
    },
    close () {
      this.$destroy();
      this.$el.remove();
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  min-width: 380px;
  background-color: #fff;
  padding: 15px 15px 15px 20px;
  .message-icon {
    margin-right: 10px;
    font-size: 16px;
  }
  &.success {
    .message-icon {
      color: $success;
    }
  }
  &.info {
    .message-icon {
      color: $info;
    }
  }
  &.warning {
    .message-icon {
      color: $warning;
    }
  }
  &.error {
    .message-icon {
      color: $danger;
    }
  }
  .message-content {
    padding-right: 16px;
  }
  .message-close {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $gray600;
    cursor: pointer;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
  transition-property: opacity, top;
}
.slide-enter, .slide-leave-to {
  top: 0;
  opacity: 0;
}
</style>
