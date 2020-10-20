<template>
  <div class="upload">
    <go-upload action="http://localhost:3000/upload">
      <go-button color="primary">click to upload</go-button>
    </go-upload>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.go-upload {

}
</style>
