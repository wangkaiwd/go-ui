<template>
  <div class="infinite-scroll">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-immediate="immediate"
    >
      <li class="item" v-for="i in count" :key="i">{{ i }}</li>
      <li style="text-align:center" v-if="disabled && hasMore">loading...</li>
      <li style="text-align:center" v-if="!hasMore">
        no more!
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  data () {
    return {
      count: 3,
      disabled: false,
      hasMore: true,
      immediate: true
    };
  },
  methods: {
    load () {
      if (this.count >= 40) {
        return this.hasMore = false;
      }
      this.disabled = true;
      setTimeout(() => {
        this.count += 2;
        this.disabled = false;
      }, 1000);
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
