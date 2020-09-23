<template>
  <button class="go-button" :class="color">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GoButton',
  props: {
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
    }
  },
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-button {
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
  &.default {
    background-color: $default;
    &:hover {
      background-color: darken($default, 8%);
    }
  }
  &.primary {
    background-color: $primary;
    &:hover {
      background-color: darken($primary, 8%);
    }
  }
  &.secondary {
    background-color: $secondary;
    color: $gray900;
    &:hover {
      background-color: darken($secondary, 8%);
    }
  }
  &.info {
    background-color: $info;
    &:hover {
      background-color: darken($info, 8%);
    }
  }
  &.success {
    background-color: $success;
    &:hover {
      background-color: darken($success, 8%);
    }
  }
  &.danger {
    background-color: $danger;
    &:hover {
      background-color: darken($danger, 8%);
    }
  }
  &.warning {
    background-color: $warning;
    &:hover {
      background-color: darken($warning, 8%);
    }
  }
  &:hover {
    transform: translateY(-1px);
  }
}
</style>
