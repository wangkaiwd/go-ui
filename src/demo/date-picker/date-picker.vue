<template>
  <div class="date-picker">
    <go-date-picker v-model="value"></go-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      value: undefined
    };
  },
};
</script>

<style lang="scss" scoped>
.date-picker {

}
</style>
