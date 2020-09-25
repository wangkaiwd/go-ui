<template>
  <div class="example">
    <demo-layout></demo-layout>
  </div>
</template>

<script>

import DemoLayout from '@/demo/layout';

export default {
  name: 'Example',
  components: { DemoLayout },
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
}
</style>
