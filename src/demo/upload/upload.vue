<template>
  <div class="upload">
    <h3>普通上传以及拖拽上传demo</h3>
    <go-upload :on-change="onChange" multiple :file-list="fileList" :action="action">
      <go-button color="primary">click to upload</go-button>
    </go-upload>
    <hr>

    <go-upload multiple drag :action="action">
    </go-upload>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      fileList: [],
      action: 'https://afternoon-dawn-09444.herokuapp.com/upload'
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
