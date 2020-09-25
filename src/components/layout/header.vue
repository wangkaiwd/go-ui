<template>
  <div class="go-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoHeader',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-header {
  height: 64px;
  line-height: 64px;
  padding: 0 50px;
}
</style>
