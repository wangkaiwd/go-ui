<template>
  <div class="example">
    <!--    <demo-layout></demo-layout>-->
    <demo-grid></demo-grid>
  </div>
</template>

<script>

import DemoLayout from '@/demo/layout';
import DemoGrid from '@/demo/grid';

export default {
  name: 'Example',
  components: { DemoGrid, DemoLayout },
  data () {
    return {};
  },

};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.example {
  height: 100%;
  padding: 20px;
  background-color: #f5f7f9;
  overflow: auto;
}
</style>
