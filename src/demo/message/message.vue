<template>
  <div class="message">
    <go-button @click="show">show message</go-button>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {};
  },
  methods: {
    show () {
      this.$message();
    }
  }
};
</script>

<style lang="scss" scoped>
.message {

}
</style>
