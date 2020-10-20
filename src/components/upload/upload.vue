<template>
  <div class="go-upload">
    <input
      class="go-upload-input"
      ref="input"
      type="file"
      @change="onInputChange"
    >
    <div
      class="go-upload-trigger"
      @click="onClickTrigger"
    >
      <slot></slot>
    </div>
    <div class="go-upload-list">
      <div class="go-upload-list-item" v-for="file in fileList">
        <img class="go-upload-list-item-img" :src="file.url" alt="">
        <div class="go-upload-list-item-name">
          <span>{{ file.name }}</span>
        </div>
        <span><go-icon name="delete"></go-icon></span>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/components/upload/request';

export default {
  name: 'GoUpload',
  props: {
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function
    },
    onChange: {
      type: Function
    },
    data: {
      type: Object,
      default: () => ({})
    },
    customHttpRequest: {
      type: Function,
      default: request
    }
  },
  data () {
    return {
      fileList: []
    };
  },
  methods: {
    onInputChange (e) {
      // e.target.files is pseudo array, need to convert to real array
      const files = Array.from(e.target.files);
      this.normalizeFiles(files);
      if (this.beforeUpload && this.beforeUpload()) {
        this.doUpload();
      }
    },
    start () {

    },
    doUpload () {
      this.fileList.forEach(file => {
        const options = {
          url: this.action,
          name: this.name,
          file: file.raw,
          data: this.data,
          onSuccess: this.onSuccess.bind(this, file),
          onError: this.onError.bind(this, file)
        };
        const result = this.customHttpRequest(options);
        if (result instanceof Promise) {
          result.then(this.onSuccess, this.onError);
        }
      });
    },
    normalizeFiles (files) {
      this.fileList = files.map((file) => {
        return {
          name: file.name,
          uid: Date.now(),
          status: 'init', // value list: init pending success failure
          raw: file
        };
      });
    },
    onError (file, error) {
      console.log('error', error);
      file.status = 'failure';
    },
    onSuccess (file, response) {
      file.status = 'success';
      this.$set(file, 'url', response.data.path);
    },
    onProgress () {

    },
    onClickTrigger () {
      this.$refs.input.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.go-upload {
  .go-upload-input {
    display: none;
  }
  .go-upload-list-item-img {
    width: 86px;
    height: 86px;
  }
}
</style>
