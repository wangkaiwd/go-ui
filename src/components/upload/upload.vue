<template>
  <div class="go-upload">
    <input
      :multiple="multiple"
      :accept="accept"
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
      <div :class="['go-upload-list-item',file.status]" v-for="file in files" :key="file.uid">
        <!--  FIXME:code in here is so chaos, can it become more elegance?  -->
        <div class="go-upload-list-item-img">
          <go-icon v-if="file.status === 'pending'" class="go-upload-item-img-loading" name="loading"></go-icon>
          <template v-else-if="file.status === 'success'">
            <img v-if="isImage(file.raw)" class="go-upload-list-item-img" :src="file.url" alt="">
            <go-icon v-else class="go-upload-item-file" name="file"></go-icon>
          </template>
          <go-icon v-else class="go-upload-item-img-error" name="picture"></go-icon>
        </div>
        <div class="go-upload-list-item-name">
          <span>{{ file.name }}</span>
          <my-progress v-if="file.status === 'pending'" :percent="file.percent"></my-progress>
        </div>
        <span class="go-upload-list-item-delete">
          <go-icon name="delete"></go-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/components/upload/request';
import MyProgress from '@/components/upload/progress';

export default {
  name: 'GoUpload',
  components: { MyProgress },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    fileList: {
      type: Array,
      default: () => []
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
    accept: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    customHttpRequest: {
      type: Function,
      default: request
    }
  },
  watch: {
    // 用watch监听的问题，可以设置默认值，如何传入的fileList发生更改，会彻底覆盖组件中的files数据。
    // 可以在onChange事件中对fileList进行赋值操作
    fileList: {
      handler (val) {
        this.files = val.map(file => {
          file.uid = file.uid || Date.now() + this.tempIndex++;
          file.status = file.status || 'success';
          return file;
        });
      },
      immediate: true
    }
  },
  data () {
    return {
      files: [],
      // 解决多图同时上传问题
      tempIndex: 0
    };
  },
  methods: {
    onInputChange (e) {
      // e.target.files is pseudo array, need to convert to real array
      const rawFiles = Array.from(e.target.files);
      const files = this.normalizeFiles(rawFiles);
      if (!this.beforeUpload || this.beforeUpload(files, this.files)) {
        this.doUpload(files);
      }
    },
    start () {

    },
    doUpload (files) {
      files.forEach(file => {
        const options = {
          url: this.action,
          name: this.name,
          file: file.raw,
          data: this.data,
          onSuccess: this.onSuccess.bind(this, file),
          onError: this.onError.bind(this, file),
          onProgress: this.onProgress.bind(this, file)
        };
        file.status = 'pending';
        if (this.onChange) {
          this.onChange(file, this.files);
        }
        const result = this.customHttpRequest(options);
        if (result instanceof Promise) {
          result.then(this.onSuccess, this.onError);
        }
      });
    },
    normalizeFiles (rawFiles) {
      const files = rawFiles.map((file) => {
        return {
          name: file.name,
          uid: Date.now() + this.tempIndex++,
          status: 'init', // value list: init pending success failure
          raw: file
        };
      });
      // concat does not change the existing arrays, but instead returns a new array
      // concat 不会修改已经存在的数组而是会返回一个新数组
      this.files = this.files.concat(files);
      return files;
    },
    onError (file, error) {
      console.log('error', error);
      file.status = 'failure';
    },
    onSuccess (file, response) {
      file.status = 'success';
      this.$set(file, 'response', response);
      this.$set(file, 'url', response.data.path);
      if (this.onChange) {
        this.onChange(file, this.files);
      }
    },
    onProgress (file, event) {
      const percent = event.loaded / event.total * 100;
      this.$set(file, 'percent', percent);
      if (this.onChange) {
        this.onChange(file, this.files);
      }
    },
    onClickTrigger () {
      this.$refs.input.click();
    },
    isImage (rawFile) {
      if (!rawFile) {return;}
      return rawFile.type.includes('image');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixins.scss";
@import "~@/assets/styles/vars.scss";
.go-upload {
  .go-upload-input {
    display: none;
    align-items: center;
  }
  .go-upload-list {
  }
  .go-upload-list-item {
    margin-top: 8px;
    padding: 8px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
  }
  .go-upload-list-item.failure {
    border: 1px solid $danger;
    color: $danger;
  }
  .go-upload-list-item.success {
    .go-upload-list-item-name {
      color: $primary;
    }
  }
  .go-upload-list-item-name {
    margin-left: 8px;
    flex: 1;
    @include ellipsis;
  }
  .go-upload-list-item-delete {
    cursor: pointer;
  }
  .go-upload-list-item-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .go-upload-item-img-loading {
    font-size: 20px;
    @include spinner;
  }
  .go-upload-item-error,
  .go-upload-item-file {
    font-size: 38px;
  }
}
</style>
