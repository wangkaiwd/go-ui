<template>
  <div class="go-date-picker" ref="picker">
    <go-input @focus="visible=true" prefix="calendar" placeholder="请选择时间" style="width:100%"></go-input>
    <div ref="popover" class="go-date-picker-popover" v-if="visible">
      <div class="go-date-picker-popover-header">
        <span class="go-date-picker-prev">‹</span>
        <span class="go-date-picker-info">2020年10月26日</span>
        <span class="go-date-picker-next">›</span>
      </div>
      <div class="go-date-picker-popover-content">
        <div class="go-date-picker-days">
          <div class="go-date-picker-days-row" v-for="row in 6">
            <div class="go-date-picker-days-cell" v-for="cell in 7">
              {{ cell + (row - 1) * 7 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoDatePicker',
  data () {
    return {
      visible: false,
      mode: 'day'
    };
  },
  mounted () {
    document.body.addEventListener('click', (e) => {
      const { picker, popover } = this.$refs;
      if (!popover) {return;}
      if (picker.contains(e.target) || popover.contains(e.target)) {return; }
      this.visible = false;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-date-picker {
  position: relative;
  .go-date-picker-popover {
    color: #65708c;
    padding: 20px;
    position: absolute;
    top: calc(100% + 10px);
    left: 36px;
    background-color: $white;
    border-radius: 6px;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .2);
  }
  .go-date-picker-days-row {
    display: flex;
  }
  .go-date-picker-days-cell,
  .go-date-picker-prev,
  .go-date-picker-next {
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
  }
  .go-date-picker-popover-header {
    display: flex;
    align-items: center;
  }
  .go-date-picker-info {
    text-align: center;
    flex: 1;
  }
}
</style>
