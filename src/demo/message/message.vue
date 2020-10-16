<template>
  <div class="message">
    <go-button @click="show">show message</go-button>
    <go-button @click="show1">show message1</go-button>
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
      this.$message({ type: 'error', message: 'this is a info message', duration: 4000, showClose: true });
    },
    show1 () {
      this.$message.success('this is a success message!');
    }
  }
};
</script>

<style lang="scss" scoped>
.message {

}
</style>
