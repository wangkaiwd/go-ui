<template>
  <div class="demo-grid">
    <go-row>
      <go-col :span="8">1</go-col>
      <go-col :span="8">2</go-col>
      <go-col :span="8">3</go-col>
    </go-row>
  </div>
</template>

<script>
export default {
  name: 'DemoGrid',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.demo-grid {

}
</style>
