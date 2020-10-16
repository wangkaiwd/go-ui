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
      this.$message.success({ message: 'hello', duration: 4000 });
    }
  }
};
</script>

<style lang="scss" scoped>
.message {

}
</style>
