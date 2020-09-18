<template>
  <div class="home">
    <div class="header">
      <div class="logo-wrapper">
        <div class="logo">
          <img :src="logo" alt="" />
        </div>
      </div>
      <div class="top-nav">
        <button class="button">
          文档
        </button>
      </div>
    </div>
    <div class="feature">
      <button class="button">快速开始</button>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/imgs/logo_transparent.png";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      logo
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .logo-wrapper {
    padding: 70px 80px 0;
    height: 274px;
    width: 244px;
    border-bottom-right-radius: 100%;
    background-color: #fffde7;
  }
  .top-nav {
    padding: 70px 80px 0;
  }
  .logo {
    width: 60px;
    height: 60px;
    padding: 2px;
    border-radius: 20%;
    overflow: hidden;
    background-color: #e9af6e;
    > img {
      transform: scale(1.5);
    }
  }
  .button {
    padding: 10px 26px;
    color: #fff;
    background-color: #4a7649;
    border-radius: 4px;
    outline: none;
    border: none;
  }
}
</style>
