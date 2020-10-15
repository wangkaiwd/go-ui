<template>
  <div class="tabs">
    <ul class="tabs-label-wrapper">
      <li
        class="tabs-label-item"
        @click="onChange(label)" v-for="label in labels"
      >
        {{ label }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoTabs',
  provide () {
    return {
      tabs: this
    };
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      labels: []
    };
  },
  mounted () {
    this.getLabels();
  },
  methods: {
    getLabels () {
      this.labels = this.$children.map(child => {
        console.log('child', child);
        return child.label;
      });
    },
    onChange (key) {
      this.$emit('input', key);
      this.$emit('change', key);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  .tabs-label-wrapper {
    display: flex;
  }
}
</style>
