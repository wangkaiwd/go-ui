<template>
  <div class="tabs">
    <go-tabs v-model="selected">
      <!-- 如何加icon -->
      <go-tab-pane disabled label="tab1" key="1">
        content1
      </go-tab-pane>
      <go-tab-pane label="tab2" key="2">
        content2
      </go-tab-pane>
      <go-tab-pane label="tab3" key="3">
        content3
      </go-tab-pane>
    </go-tabs>
    <go-tabs v-model="selected1">
      <go-tab-pane v-for="n in 40" :key="n" :label="n">
        {{ n }}
      </go-tab-pane>
    </go-tabs>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      selected: '1',
      selected1: 1
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs {

}
</style>
