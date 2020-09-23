<template>
  <div class="example">
    <go-button class="button">
      Default Button
    </go-button>
    <go-button class="button" color="primary">
      Default Button
    </go-button>
    <go-button class="button" color="secondary">
      Default Button
    </go-button>
    <go-button class="button" color="info">
      Default Button
    </go-button>
    <go-button class="button" color="success">
      Default Button
    </go-button>
    <go-button class="button" color="danger">
      Default Button
    </go-button>
    <go-button class="button" color="warning">
      Default Button
    </go-button>
    <go-icon name="complete"></go-icon>
  </div>
</template>

<script>

export default {
  name: 'Example',
  data () {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.example {
  height: 100%;
  padding: 20px;
  background-color: #f5f7f9;
  .button + .button {
    margin-left: 4px;
  }
}
</style>
