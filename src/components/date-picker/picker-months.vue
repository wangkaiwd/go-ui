<template>
  <div class="go-picker-months">
    <div class="go-date-picker-popover-header">
      <span class="go-date-picker-prev" @click="changeYear(-1)">‹</span>
      <span class="go-date-picker-info">{{ formatDate.year }}年</span>
      <span class="go-date-picker-next" @click="changeYear(1)">›</span>
    </div>
    <div class="go-date-picker-popover-content">
      <div class="go-date-picker-months">
        <div class="go-date-picker-months-row" v-for="(row,i) in months" :key="`${row}-${i}`">
          <div
            class="go-date-picker-months-cell"
            v-for="(cell,j) in row" :key="`${cell}-${j}`"
            :class="monthClasses(i,j)"
            @click="onClickMonth(i,j)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMatrix } from '@/shared/util';
import { cloneDate, getYearMonthDay } from '@/shared/date';
import emitter from '@/mixins/emitter';

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
export default {
  name: 'PickerMonths',
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
      months: toMatrix(MONTHS, 4)
    };
  },
  methods: {
    changeYear (value) {
      const [year] = getYearMonthDay(this.tempValue);
      const timestamp = cloneDate(this.tempValue).setFullYear(year + value);
      this.$emit('update:tempValue', new Date(timestamp));
    },
    onClickMonth (i, j) {
      const month = j + i * 4;
      const { year, day } = this.formatDate;
      this.dispatch('input', new Date(year, month, day), 'GoDatePicker');
      this.$emit('mode-change', 'picker-years');
    },
    monthClasses (i, j) {
      const month = j + i * 4;
      return {
        active: this.isSameMonth(month),
        current: this.isCurrentMonth(month)
      };
    },
    isCurrentMonth (month) {
      const year = this.formatDate.year;
      const [year2, month2] = getYearMonthDay(new Date());
      return year === year2 && month === month2;
    },
    isSameMonth (month) {
      const year = this.formatDate.year;
      const [year2, month2] = getYearMonthDay(this.value);
      return year === year2 && month === month2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-picker-months {
  .go-date-picker-popover-header {
    display: flex;
  }
  .go-date-picker-prev,
  .go-date-picker-next {
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
  }
  .go-date-picker-prev,
  .go-date-picker-next,
  .go-date-picker-info,
  .go-date-picker-months-cell {
    &:hover {
      background: #eee;
    }
  }
  .go-date-picker-info {
    cursor: pointer;
    line-height: 36px;
    text-align: center;
    border-radius: 6px;
    flex: 1;
  }
  .go-date-picker-months-row {
    display: flex;
  }
  .go-date-picker-months-cell {
    width: 56px;
    text-align: center;
    line-height: 56px;
    border-radius: 6px;
    cursor: pointer;
    &.current {
      color: $info;
    }
    &.active {
      color: $white;
      background-color: $info;
    }
  }
}
</style>
