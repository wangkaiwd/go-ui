<template>
  <div class="tabs">
    <ul class="tabs-label-wrapper" ref="labelWrapper">
      <li
        class="tabs-label-item"
        @click="onChange(item.key)" v-for="(item,i) in labels"
        :class="{active: value === item.key}"
        ref="labelItems"
      >
        {{ item.label }}
      </li>
      <div class="line" ref="line"></div>
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
      labels: [],
    };
  },
  computed: {
    activeIndex () {
      return this.labels.findIndex(label => label.key === this.value);
    }
  },
  mounted () {
    this.getLabels();
    this.calculateLinePosition();
  },
  methods: {
    getLabels () {
      this.labels = this.$children.map(child => {
        return { label: child.label, key: child.key };
      });
    },
    onChange (key) {
      this.$emit('input', key);
      this.$emit('change', key);
      this.calculateLinePosition();
    },
    calculateLinePosition () {
      this.$nextTick(() => {
        if (this.activeIndex === -1) {return; }
        // line width equal active tab width
        const { labelWrapper, line, labelItems } = this.$refs;
        const activeLabel = labelItems[this.activeIndex];
        const { left: wrapperLeft } = labelWrapper.getBoundingClientRect();
        const { left: labelLeft, width } = activeLabel.getBoundingClientRect();
        line.style.left = labelLeft - wrapperLeft + labelWrapper.scrollLeft + 'px';
        line.style.width = width + 'px';
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/vars.scss';
.tabs {
  .tabs-label-wrapper {
    position: relative;
    display: flex;
    border-bottom: 1px solid $gray300;
    margin-bottom: 16px;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 0;
      background: transparent; /* Chrome/Safari/Webkit */
    }
  }
  .tabs-label-item {
    cursor: pointer;
    margin-right: 32px;
    padding: 12px 0;
    &:hover {
      color: $primary;
    }
    &.active {
      font-weight: bold;
      color: $primary;
    }
  }
  .line {
    position: absolute;
    transition: all 0.3s;
    transition-property: left, width;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: $primary;
  }
}
</style>
