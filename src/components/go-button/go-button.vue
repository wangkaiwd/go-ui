<template>
  <button class="go-button"></button>
</template>

<script>
export default {
  name: "GoButton",
  props: {
    type: {}
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
@import "~@/assets/styles/vars.scss";
.go-button {
  outline: none;
  border: none;
}
</style>
