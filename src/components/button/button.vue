<template>
  <button class="go-button">
    button
  </button>
</template>

<script>
export default {
  name: 'GoButton',
  props: {
    type: {}
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
}
</style>
