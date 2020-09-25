<template>
  <div class="go-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoRow',
  props: {
    gutter: {
      type: Number
    }
  },
  data () {
    return {};
  },
  mounted () {
    this.checkChildren();
  },
  methods: {
    checkChildren () {
      this.$children.forEach((child) => {
        const { name } = child;
        if (name !== 'GoCol') {
          console.log('Row child component must be Col');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.go-row {
  display: flex;
}
</style>
