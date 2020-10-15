<template>
  <div class="tab-pane">
    <div class="tab-pane-content" v-if="visible">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoTabPane',
  inject: ['tabs'],
  props: {
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible () {
      return this.tabs.value === this.key;
    }
  },
  data () {
    return {
      key: this.$vnode.key
    };
  },
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
.tab-pane {

}
</style>
