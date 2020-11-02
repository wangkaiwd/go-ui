<template>
  <div class="infinite-scroll">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-distance="40"
    >
      <li class="item" v-for="i in count" :key="i">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  data () {
    return {
      count: 40
    };
  },
  methods: {
    load () {
      console.log('load');
    }
  }
};
</script>

<style lang="scss" scoped>
.infinite-scroll {
  .list {
    height: 460px;
    width: 400px;
    overflow: auto;
    border: 1px solid #ea4435;
  }
  .item {
    background-color: #4285f3;
    color: #fff;
    text-align: center;
    padding: 12px 0;
  }
  .item + .item {
    margin-top: 8px;
  }
}
</style>
