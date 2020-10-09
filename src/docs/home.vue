<template>
  <div class="home">
    <go-button @click="$router.push('/example')">快速开始</go-button>
  </div>
</template>

<script>
import logo from '@/assets/imgs/logo_transparent.png';

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      logo
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
