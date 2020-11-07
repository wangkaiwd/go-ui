<template>
  <div class="example">
    <ul class="menu">
      <router-link
        tag="li"
        class="menu-item"
        v-for="menu in menus"
        :key="menu.path"
        :class="{active: menu.path === $route.path}"
        :to="menu.path"
      >
        {{ menu.name }}
      </router-link>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { routes } from '@/docs/router';

export default {
  name: 'Example',
  data () {
    return {
      menus: []
    };
  },
  mounted () {
    this.generateMenus();
  },
  methods: {
    generateMenus () {
      this.menus = routes.reduce((accumulator, item) => {
        if (item.name === 'Example') {
          accumulator = item.children;
        }
        return accumulator;
      }, []);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.example {
  height: 100%;
  padding: 20px;
  background-color: #f5f7f9;
  overflow: auto;
  display: flex;
  .menu {
    width: 12em;
    height: 100%;
  }
  .menu-item {
    cursor: pointer;
    padding: 4px 8px;
  }
  .content {
    height: 100%;
    overflow: auto;
    padding: 20px;
    flex: 1;
  }
  .active {
    color: #fff;
    background-color: pink;
  }
}
</style>
