<template>
  <div class="go-row" :style="{marginLeft: -gutter + 'px'}">
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
        const { name } = child.$options;
        if (name !== 'GoCol') {
          console.warn('Row child component must be Col');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.go-row {
}
</style>
