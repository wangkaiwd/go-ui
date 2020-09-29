<template>
  <div class="demo-grid">
    <go-row :gutter="gutter">
      <go-col class="col" :xs="6" :md="10" :span="8">
        <div class="inner">
          1
        </div>
      </go-col>
      <go-col class="col" :xs="6" :md="7" :span="8">
        <div class="inner">
          2
        </div>
      </go-col>
      <go-col class="col" :xs="6" :md="7" :span="8">
        <div class="inner">
          3
        </div>
      </go-col>
      <go-col class="col" :xs="6" :span="8">
        <div class="inner">
          4
        </div>
      </go-col>
    </go-row>
  </div>
</template>

<script>
export default {
  name: 'DemoGrid',
  data () {
    return {
      gutter: 16
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.demo-grid {
  .col {
    padding: 4px 0;
  }
  .inner {
    padding: 8px 0;
    text-align: center;
    color: #fff;
    background-color: $default;
  }
}
</style>
