<template>
  <div class="demo-icon">
    <ul>
      <li v-for="icon in iconList" :key="icon">
        <go-icon class="icon-item" :name="icon"></go-icon>
        {{ icon }}
      </li>
    </ul>
  </div>
</template>

<script>
import iconList from '@/icon.json';

export default {
  name: 'DemoIcon',
  data () {
    return {
      iconList
    };
  },
};
</script>

<style lang="scss" scoped>
.demo-icon {
  .icon-item {
    font-size: 18px;
  }
}
</style>
