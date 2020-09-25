<template>
  <div class="go-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoFooter',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-footer {
  padding: 24px 50px;
}
</style>
