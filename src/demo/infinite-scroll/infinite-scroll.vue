<template>
  <div class="infinite-scroll">
    <div class="list">
      <ul
        v-infinite-scroll="load"
        infinite-scroll-distance="60"
        infinite-scroll-disabled="disabled"
        infinite-scroll-immediate="immediate"
      >
        <li class="item" v-for="i in count" :key="i">{{ i }}</li>
      </ul>
      <p class="load-text" v-if="disabled && hasMore">loading...</p>
      <p class="load-text" v-if="!hasMore">
        no more!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  data () {
    return {
      count: 0,
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
        this.count += 5;
        this.disabled = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.infinite-scroll {
  ul {
    margin: 0;
    padding: 0;
  }
  .load-text {
    text-align: center;
    padding: 12px;
  }
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
    height: 50px;
    line-height: 50px;
  }
  .item + .item {
    margin-top: 8px;
  }
}
</style>
