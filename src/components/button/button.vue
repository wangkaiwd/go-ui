<template>
  <button
    class="go-button"
    v-bind="$attrs"
    v-on="$listeners"
    :class="[color,{ disabled }]"
    :disabled="disabled"
  >
    <span v-if="icon" class="go-button-icon-left">
      <go-icon :name="icon"></go-icon>
    </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GoButton',
  props: {
    inheritAttrs: false,
    icon: {
      type: String
    },
    color: {
      type: String,
      validator (value) {
        return [
          'default',
          'primary',
          'secondary',
          'info',
          'success',
          'danger',
          'warning'
        ].includes(value);
      },
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {};
  },
  mounted () {
    this.setClassForIcon();
  },
  methods: {
    setClassForIcon () {
      // FIXME: has more nest resolution ?
      this.$slots.default.forEach((vNode, i, array) => {
        if (vNode.tag?.includes('GoIcon') && i === 0) {
          vNode.elm.classList.add('go-button-icon-left');
        } else if (vNode.tag?.includes('GoIcon') && i === array.length - 1) {
          vNode.elm.classList.add('go-button-icon-right');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-button {
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  outline: none;
  border: none;
  color: white;
  padding: 4px 15px;
  height: 32px;
  line-height: 1.5715;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
  &-icon-left {
    margin-right: 8px;
  }
  &-icon-right {
    margin-left: 8px;
  }
  &.default {
    background-color: $default;
    &:hover:not(.disabled) {
      background-color: darken($default, 8%);
    }
  }
  &.primary {
    background-color: $primary;
    &:hover:not(.disabled) {
      background-color: darken($primary, 8%);
    }
  }
  &.secondary {
    background-color: $secondary;
    color: $gray900;
    &:hover:not(.disabled) {
      background-color: darken($secondary, 8%);
    }
  }
  &.info {
    background-color: $info;
    &:hover:not(.disabled) {
      background-color: darken($info, 8%);
    }
  }
  &.success {
    background-color: $success;
    &:hover:not(.disabled) {
      background-color: darken($success, 8%);
    }
  }
  &.danger {
    background-color: $danger;
    &:hover:not(.disabled) {
      background-color: darken($danger, 8%);
    }
  }
  &.warning {
    background-color: $warning;
    &:hover:not(.disabled) {
      background-color: darken($warning, 8%);
    }
  }
  &.disabled, &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    box-shadow: none;
  }
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
  }
}
</style>
