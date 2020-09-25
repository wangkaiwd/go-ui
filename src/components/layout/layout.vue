<template>
  <div
    class="go-layout"
    :class="{'go-layout-has-aside':hasAside }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoLayout',
  data () {
    return {
      hasAside: false
    };
  },
  mounted () {
    this.hasAside = this.handleChildren();
  },
  methods: {
    handleChildren () {
      const children = this.$children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const { name } = child.$options;
        if (name === 'GoAside') {
          return true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.go-layout {
  display: flex;
  flex-direction: column;
  &-has-aside {
    flex-direction: row;
  }
}
</style>
