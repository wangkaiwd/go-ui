<template>
  <div class="example">
    <go-button class="button" disabled>
      Button
    </go-button>
    <go-button @click="onClick" class="button" color="primary" disabled>
      Primary
    </go-button>
    <go-button class="button" color="secondary" disabled>
      Default Button
    </go-button>
    <go-button @click="onClick" class="button" color="info">
      Default Button
    </go-button>
    <go-button class="button" color="success">
      <go-icon name="chart-pie"></go-icon>
      Default Button
    </go-button>
    <go-button :loading="loading" class="button" color="danger">
      Default Button
    </go-button>
    <go-button class="button" color="warning">
      Default Button
      <go-icon name="complete"></go-icon>
    </go-button>

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
  name: 'Example',
  data () {
    return {
      loading: false,
      iconList
    };
  },
  methods: {
    onClick () {
      this.loading = true;
      console.log('click');
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.example {
  height: 100%;
  padding: 20px;
  background-color: #f5f7f9;
  .button + .button {
    margin-left: 8px;
  }
  .icon-item {
    font-size: 18px;
  }
}
</style>
