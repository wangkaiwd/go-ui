<template>
  <div class="go-date-picker" ref="picker">
    <go-input @focus="visible=true" prefix="calendar" placeholder="请选择时间" style="width:100%"></go-input>
    <div ref="popover" class="go-date-picker-popover" v-if="visible">
      <div class="go-date-picker-popover-header">
        <span class="go-date-picker-prev">‹</span>
        <span class="go-date-picker-info">{{ formatDate.year }}年{{ formatDate.month }}月{{ formatDate.day }}日</span>
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
// 如何展示当前页所有天数？
//   1. 找到当月的第一天，判断它是星期几（天数最少28，上边和下边个空开一行）
const getYearMonthDay = (value) => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return [year, month, day];
};

// https://stackoverflow.com/a/13773408/12819402
const getCurrentMonthLastDay = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
// https://stackoverflow.com/a/37803823/12819402
const getPrevMonthLastDay = (year, month) => {
  return new Date(year, month, 0).getDate();
};
export default {
  name: 'GoDatePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      visible: false,
      mode: 'day',
      tempValue: this.value
    };
  },
  computed: {
    formatDate () {
      const [year, month, day] = getYearMonthDay(this.tempValue);
      return { year, month: month + 1, day };
    }
  },
  mounted () {
    document.body.addEventListener('click', this.onClickBody);
    this.getDays();
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.onClickBody);
  },
  methods: {
    onClickBody (e) { // Vue内部会自动帮我们修改this指向
      const { picker, popover } = this.$refs;
      if (!popover) {return;}
      if (picker.contains(e.target) || popover.contains(e.target)) {
        return;
      }
      this.visible = false;
    },
    createMatrix (array, rowLength) {

    },
    getDays () {
      const [year, month, day] = getYearMonthDay(this.tempValue);
      // 0 ~ 6, 需要往前推 startWeek + 1天
      const startWeek = new Date(year, month, 1).getDay();
      const prevLastDay = getPrevMonthLastDay(year, month);
      const curLastDay = getCurrentMonthLastDay(year, month);
      const days = [...this.getPrevMonthDays(prevLastDay, startWeek), ...this.getCurrentMonthDays(curLastDay), ...this.getNextMonthDays(curLastDay, startWeek)];
      console.log(days.map(day => day.date.getDate()));
    },
    getPrevMonthDays (prevLastDay, startWeek) {
      const [year, month] = getYearMonthDay(this.tempValue);
      const prevMonthDays = [];
      for (let i = prevLastDay - startWeek + 1; i <= prevLastDay; i++) {
        prevMonthDays.push({
          date: new Date(year, month - 1, i),
          status: 'prev'
        });
      }
      return prevMonthDays;
    },
    getCurrentMonthDays (curLastDay) {
      const [year, month] = getYearMonthDay(this.tempValue);
      const curMonthDays = [];
      for (let i = 1; i <= curLastDay; i++) {
        curMonthDays.push({
          date: new Date(year, month, i),
          status: 'current'
        });
      }
      return curMonthDays;
    },
    getNextMonthDays (curLastDay, startWeek) {
      const [year, month] = getYearMonthDay(this.tempValue);
      const nextMonthDays = [];
      for (let i = 1; i <= 42 - startWeek - curLastDay; i++) {
        nextMonthDays.push({
          date: new Date(year, month + 1, i),
          status: 'next'
        });
      }
      return nextMonthDays;
    }
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
