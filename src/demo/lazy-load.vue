<template>
  <div class="lazy-load">
    <h3>图片懒加载</h3>
    <div class="container">
      <img class="img" v-for="(img,index) in images" v-lazy="img" :key="index" :src="img" alt="">
      <!--      <div class="img" v-for="(img,index) in images" v-lazy="img" :key="index">{{ img }}</div>-->
    </div>
  </div>
</template>
<script>
// 实现思路：
//  1. 找到v-lazy的具有滚动的父元素
//  2. preload: 加载比例即超过父元素高度多少时开始加载
//  3. 如何加载？
//      1. 模拟图片加载，在加载过程中放置loading图，加载完毕后将属性设置为正确的属性
//      2. 每次滚动时，计算当前图片是否处于需要加载的位置
//      3. 加载过的图片不再加载
//      4. 优化
export default {
  name: 'LazyLoad',
  data () {
    return {
      images: [
        'https://im0-tub-ru.yandex.net/i?id=9e65a377d26fd77f4861a3390f3fd688&amp;ref=rim&amp;n=33&amp;w=421&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=7e505e6153e0acb3b65984575ed8f79c&amp;ref=rim&amp;n=33&amp;w=448&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=feaa21cd6ec198caf8a2d6c5265511c9&amp;ref=rim&amp;n=33&amp;w=200&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=132e5b95ea20382bf24fc581c2eaef5e&amp;ref=rim&amp;n=33&amp;w=449&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=4115e07599c41ed8ba1fd1ba3f1213c8&amp;ref=rim&amp;n=33&amp;w=402&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=2b71d887bc322761d85d545f5372383a&amp;ref=rim&amp;n=33&amp;w=410&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=9b8fefdf2759f9b567444bb1c05ec902&amp;ref=rim&amp;n=33&amp;w=186&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=0244ec5da0e4bff97e97e4df93a4fd22&amp;ref=rim&amp;n=33&amp;w=480&amp;h=293',
        'https://im0-tub-ru.yandex.net/i?id=c163e96f941e29f52e45c467e4611107&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=0dac4c5085d89466713acd4f42f3e13a&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=4237b7305a5874b48a5137f025314632&amp;ref=rim&amp;n=33&amp;w=418&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=c4aeb8d5544a66030a5731806b20c091&amp;ref=rim&amp;n=33&amp;w=480&amp;h=298',
        'https://im0-tub-ru.yandex.net/i?id=c15e218a9e1a6860eaa4f11b5e5d9abe&amp;ref=rim&amp;n=33&amp;w=248&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=3d09983a61ebafe760da556d8870f303&amp;ref=rim&amp;n=33&amp;w=392&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=381b3571014016a03cb1554cc2616b14&amp;ref=rim&amp;n=33&amp;w=282&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=c54b9b21453b8b15edcb8285ed2cc455&amp;ref=rim&amp;n=33&amp;w=453&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=52976489879bfdebc7339fe7f6d613a9&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=b6266194ad8f9491ff1cd7497ccf79f7&amp;ref=rim&amp;n=33&amp;w=265&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=ffe375a34780765b3f518b44c059c9f9&amp;ref=rim&amp;n=33&amp;w=300&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=52baea42849acd761c2f20641620ffcd&amp;ref=rim&amp;n=33&amp;w=206&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=4cee9a1da08d5d3a6a1fbce9f34463db&amp;ref=rim&amp;n=33&amp;w=448&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=61f60b78e48bc546c8766b2d85a39804&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=e0fb5f05029ca723a8c64cd9e70f094b&amp;ref=rim&amp;n=33&amp;w=412&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=08df986498c8f72d5f1369757cdc6666&amp;ref=rim&amp;n=33&amp;w=480&amp;h=192',
        'https://im0-tub-ru.yandex.net/i?id=8dbb7180c6f8520262820ef450191dba&amp;ref=rim&amp;n=33&amp;w=453&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=5a6c6a2300844ca014210dd6e831e15c&amp;ref=rim&amp;n=33&amp;w=300&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=d703b87e9a2c2635f0e0cc3d4a73587f&amp;ref=rim&amp;n=33&amp;w=400&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=d8297328e7885ab4c44c3869b7bee848&amp;ref=rim&amp;n=33&amp;w=344&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=2808018f598277f20473f929849d4222&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300',
        'https://im0-tub-ru.yandex.net/i?id=cb55401c9eaa8d4adcd6fa4dc0cbd10f&amp;ref=rim&amp;n=33&amp;w=450&amp;h=300'
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.lazy-load {
  .container {
    display: inline-block;
    overflow: auto;
    height: 400px;
    border: 3px solid red;
  }
  .img {
    width: 200px;
    vertical-align: top;
  }
}
</style>
