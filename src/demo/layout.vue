<template>
  <div class="demo-layout">
    <go-layout class="layout">
      <go-header class="header">
        Header
      </go-header>
      <go-main class="main">
        Main
      </go-main>
      <go-footer class="footer">
        Footer
      </go-footer>
    </go-layout>

    <go-layout class="layout">
      <go-header class="header">
        Header
      </go-header>
      <go-layout>
        <go-aside class="aside">
          aside
        </go-aside>
        <go-main class="main">
          Main
        </go-main>
      </go-layout>
      <go-footer class="footer">
        Footer
      </go-footer>
    </go-layout>

    <go-layout class="layout">
      <go-header class="header">
        Header
      </go-header>
      <go-layout>
        <go-main class="main">
          Main
        </go-main>
        <go-aside class="aside">
          aside
        </go-aside>
      </go-layout>
      <go-footer class="footer">
        Footer
      </go-footer>
    </go-layout>
  </div>
</template>

<script>
export default {
  name: 'DemoLayout',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";

.demo-layout {
  // text-align 会被子元素继承
  text-align: center;
  .layout {
    font-size: 18px;
    color: #fff;
  }
  .layout + .layout {
    margin-top: 20px;
  }
  .header, .footer {
    background-color: $primary;
  }
  .aside {
    line-height: 120px;
    background-color: $info;
  }
  .main {
    background-color: $default;
  }
}
</style>
