<template>
  <div class="upload">
    <go-upload :on-change="onChange" multiple :file-list="fileList" action="http://localhost:3000/upload">
      <go-button color="primary">click to upload</go-button>
    </go-upload>
    <hr>

    <go-upload multiple drag action="http://localhost:3000/upload">
    </go-upload>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      fileList: [],
    };
  },
  methods: {
    onChange (file, fileList) {
      console.log('file', file, fileList);
    }
  }
};
</script>

<style lang="scss" scoped>
.go-upload {

}
</style>
