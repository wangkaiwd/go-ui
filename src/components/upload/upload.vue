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
    <upload-dragger v-if="drag" @handle-files="uploadFiles"></upload-dragger>
    <div
      v-else
      class="go-upload-trigger"
      @click="onClickTrigger"
    >
      <slot></slot>
    </div>
    <upload-list @on-delete="onDelete" :files="this.files"></upload-list>
  </div>
</template>

<script>
import request from '@/components/upload/request';
import MyProgress from '@/components/upload/progress';
import UploadList from '@/components/upload/upload-list';
import { noop } from '@/shared/util';
import UploadDragger from '@/components/upload/upload-dragger';

export default {
  name: 'GoUpload',
  components: { UploadDragger, UploadList, MyProgress },
  props: {
    name: { type: String, default: 'file' },
    fileList: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      required: true
    },
    beforeUpload: { type: Function },
    onChange: { type: Function, default: noop },
    onSuccess: { type: Function, default: noop },
    onError: { type: Function, default: noop },
    onProgress: { type: Function, default: noop },
    onExceed: { type: Function, default: noop },
    data: { type: Object, default: () => ({}) },
    accept: { type: String },
    multiple: { type: Boolean, default: false },
    customHttpRequest: { type: Function, default: request },
    limit: { type: Number },
    // active drag and drop mode
    drag: {
      type: Boolean,
      default: false
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
      // when multiple picture upload together, uid will same.
      // So need to set a auto increment value tempIndex to ensure uid is unique value
      tempIndex: 0,
      // store all uploading files xhr instance, so that can invoke xhr.abort to cancel upload request
      reqs: {}
    };
  },
  methods: {
    onInputChange (e) {
      // e.target.files is pseudo array, need to convert to real array
      const rawFiles = Array.from(e.target.files);
      this.uploadFiles(rawFiles);
    },
    uploadFiles (rawFiles) {
      const filesLen = rawFiles.length + this.files.length;
      if (this.limit && this.limit > filesLen) {
        return this.onExceed(rawFiles, this.files);
      }
      this.startUpload(rawFiles);
    },
    startUpload (rawFiles) {
      rawFiles.forEach(rawFile => {
        const file = this.normalizeFiles(rawFile);
        if (!this.beforeUpload || this.beforeUpload()) {
          this.upload(file);
        }
      });
    },
    upload (file) {
      const { uid } = file;
      const options = {
        url: this.action,
        name: this.name,
        file: file.raw,
        data: this.data,
        onSuccess: this.handleSuccess.bind(this, file),
        onError: this.handleError.bind(this, file),
        onProgress: this.handleProgress.bind(this, file)
      };
      file.status = 'pending';
      this.onChange(file, this.files);
      const req = this.customHttpRequest(options);
      this.reqs[uid] = req;
      if (req instanceof Promise) {
        req.then(options.onSuccess, options.handleError);
      }
    },
    normalizeFiles (rawFile) {
      const file = {
        name: rawFile.name,
        size: rawFile.size,
        type: rawFile.type,
        percent: 0,
        uid: Date.now() + this.tempIndex++,
        status: 'init', // value list: init pending success failure
        raw: rawFile
      };
      // concat does not change the existing arrays, but instead returns a new array
      this.files.push(file);
      return file;
    },
    handleError (file, error) {
      const { uid } = file;
      delete this.reqs[uid];
      file.status = 'failure';
      this.onError(error, file, this.files);
    },
    handleSuccess (file, response) {
      const { uid } = file;
      delete this.reqs[uid];
      file.status = 'success';
      this.$set(file, 'response', response);
      // Not only front end can implement picture preview but also back end can do it. Here make use of back end api
      this.$set(file, 'url', response.data.path);
      this.onChange(file, this.files);
      this.onSuccess(response, file, this.files);
    },
    handleProgress (file, event) {
      file.percent = event.percent;
      this.onChange(file, this.files);
      this.onProgress(event, file, this.files);
    },
    onClickTrigger () {
      this.$refs.input.click();
    },
    onDelete (file) {
      const i = this.files.indexOf(file);
      this.files.splice(i, 1);
      this.abort(file);
    },
    abort (file) {
      const { uid } = file;
      if (this.reqs[uid]) {
        this.reqs[uid].abort();
        delete this.reqs[uid];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.go-upload {
  .go-upload-input {
    display: none;
    width: 100%;
  }
}
</style>
