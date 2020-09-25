<template>
  <div class="go-main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoMain',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-main {
  flex: 1;
  min-height: 120px;
  line-height: 120px;
}
</style>
