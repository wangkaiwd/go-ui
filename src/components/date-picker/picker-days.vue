<template>
  <div class="go-picker-days">
    <div class="go-date-picker-popover-header">
      <span class="go-date-picker-prev" @click="changeMonth(-1)">‹</span>
      <span class="go-date-picker-info" @click="$emit('mode-change','picker-months')">
        {{ formatDate.year }}年{{ formatDate.month }}月{{ formatDate.day }}日</span>
      <span class="go-date-picker-next" @click="changeMonth(1)">›</span>
    </div>
    <div class="go-date-picker-popover-content">
      <div class="go-date-picker-days">
        <div class="go-date-picker-weeks">
          <div class="go-date-picker-week-cell" v-for="week in weeks">
            {{ week }}
          </div>
        </div>
        <div class="go-date-picker-days-row" v-for="(row,i) in getDays" :key="`${row}-${i}`">
          <div
            class="go-date-picker-days-cell"
            :class="dayClasses(cell)"
            v-for="(cell,j) in row"
            :key="`${cell}-${j}`"
            @click="onClickDay(cell)"
          >
            {{ getDay(cell) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDate, getCurrentMonthLastDay, getPrevMonthLastDay, getYearMonthDay } from '@/shared/date';
import emitter from '@/mixins/emitter';
import { createMatrix } from '@/shared/util';

export default {
  name: 'PickerDays',
  props: {
    tempValue: {
      type: Date
    },
    visible: {
      type: Boolean
    },
    formatDate: {
      type: Object
    },
    value: {
      type: Date
    },
    mode: {
      type: String
    }
  },
  mixins: [emitter],
  data () {
    return {
      weeks: ['一', '二', '三', '四', '五', '六', '日']
    };
  },
  computed: {
    getDays () {
      const [year, month] = getYearMonthDay(this.tempValue);
      // 0 ~ 6, 需要往前推 startWeek + 1天
      const startWeek = new Date(year, month, 1).getDay();
      const prevLastDay = getPrevMonthLastDay(year, month);
      const curLastDay = getCurrentMonthLastDay(year, month);
      const days = [...this.getPrevMonthDays(prevLastDay, startWeek), ...this.getCurrentMonthDays(curLastDay), ...this.getNextMonthDays(curLastDay, startWeek)];
      return createMatrix(days, 7);
    },
  },
  methods: {
    changeMonth (value) {
      const [, month] = getYearMonthDay(this.tempValue);
      const timestamp = cloneDate(this.tempValue).setMonth(month + value);
      this.$emit('update:tempValue', new Date(timestamp));
    },
    dayClasses (cell) {
      return {
        prev: cell.status === 'prev',
        next: cell.status === 'next',
        active: this.isSameDay(cell.date, this.value),
        today: this.isToday(cell.date)
      };
    },
    onClickDay (cell) {
      this.dispatch('input', cell.date, 'GoDatePicker');
      this.$emit('update:visible', false);
    },
    isSameDay (date1, date2) {
      const [y1, m1, d1] = getYearMonthDay(date1);
      const [y2, m2, d2] = getYearMonthDay(date2);
      return y1 === y2 && m1 === m2 && d1 === d2;
    },
    isToday (date) {
      const [y1, m1, d1] = getYearMonthDay(date);
      const [y2, m2, d2] = getYearMonthDay();
      return y1 === y2 && m1 === m2 && d1 === d2;
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
    },
    getDay (cell) {
      return cell.date.getDate();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-picker-days {
  .go-date-picker-days-row,
  .go-date-picker-weeks,
  .go-date-picker-months {
    display: flex;
  }
  .go-date-picker-days-cell,
  .go-date-picker-week-cell,
  .go-date-picker-prev,
  .go-date-picker-next {
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .go-date-picker-week-cell {
    cursor: default;
  }
  .go-date-picker-days-cell {
    border-radius: 50%;
  }
  .go-date-picker-prev,
  .go-date-picker-next,
  .go-date-picker-info,
  .go-date-picker-days-cell {
    &:hover {
      background: #eee;
    }
  }
  .go-date-picker-days-cell.prev,
  .go-date-picker-days-cell.next {
    color: $gray500;
    font-weight: 300;
  }
  .go-date-picker-days-cell {
    &.today {
      color: $info;
    }
    &.active {
      background-color: $info;
      color: $white;
    }
  }
  .go-date-picker-popover-header {
    display: flex;
  }
  .go-date-picker-info {
    cursor: pointer;
    line-height: 36px;
    text-align: center;
    border-radius: 6px;
    flex: 1;
  }
}
</style>
