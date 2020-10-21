<template>
  <div
    class="go-upload-dragger"
    :class="{dragging}"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
    @dragover="onDragover"
    @drop="onDrop"
    @click="onClick"
  >
    <go-icon class="go-upload-dragger-icon" name="upload"></go-icon>
    <div class="go-upload-dragger-describe">
      <span>Drop file here or click to upload</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadDragger',
  data () {
    return {
      dragging: false
    };
  },
  methods: {
    onDragenter (e) {
      this.dragging = true;
      e.stopPropagation();
      e.preventDefault();
    },
    onDragleave (e) {
      this.dragging = false;
      e.stopPropagation();
      e.preventDefault();
    },
    onDragover (e) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop (e) {
      this.dragging = false;
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.$emit('handle-files', files);
    },
    onClick () {
      this.$emit('on-click');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/vars.scss';
.go-upload-dragger {
  border: 1px dashed $gray400;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.dragging {
    border-width: 2px;
    border-color: $primary;
    background-color: $gray200;
    .go-upload-dragger-icon {
      color: $primary;
    }
  }
  &:hover {
    border-color: $primary;
    cursor: pointer;
  }
  .go-upload-dragger-icon {
    font-size: 60px;
    color: $gray600;
  }
}
</style>
