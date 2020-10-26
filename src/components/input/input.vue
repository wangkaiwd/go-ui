<template>
  <div class="go-input">
    <go-icon class="go-input-prefix-icon" v-if="prefix" :name="prefix"></go-icon>
    <input
      :class="{'go-input-prefix':prefix}"
      type="text"
      v-bind="$attrs"
      v-on="$listeners"
    >
  </div>
</template>

<script>
export default {
  name: 'GoInput',
  props: {
    prefix: {
      type: String
    }
  },
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-input {
  position: relative;
  display: inline-block;
  vertical-align: top;
  color: $gray600;
  input {
    padding: 10px 12px;
    border-radius: 4px;
    width: 100%;
    color: $gray600;
    box-shadow: 0 1px 3px rgba(50, 50, 93, .15), 0 1px 0 rgba(0, 0, 0, .02);
    border: 0;
    transition: box-shadow .15s ease;
    &:focus {
      border-color: rgba(50, 151, 211, .25);
      outline: 0;
      box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    }
    &::placeholder {
      color: #b3bcc2;
    }
    &.go-input-prefix {
      padding-left: 36px;
    }
  }
  .go-input-prefix-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 16px;
  }
}
</style>
