<template>
  <div class="go-picker-years">
    <div class="go-date-picker-popover-header">
      <span class="go-date-picker-prev" @click="changeYear(-10)">‹</span>
      <span class="go-date-picker-info">{{ startYear }}-{{ endYear }}</span>
      <span class="go-date-picker-next" @click="changeYear(10)">›</span>
    </div>
    <div class="go-date-picker-popover-content">
      <div class="go-date-picker-years">
        <div class="go-date-picker-years-row" v-for="(row,i) in years" :key="`${row}-${i}`">
          <div
            class="go-date-picker-years-cell"
            v-for="(cell,j) in row" :key="`${cell}-${j}`"
            :class="yearClasses(cell)"
            @click="onClickYear(cell)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createMatrix } from '@/shared/util';
import { cloneDate, getYearMonthDay } from '@/shared/date';
import emitter from '@/mixins/emitter';

export default {
  name: 'PickerYears',
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
    return {};
  },
  computed: {
    startYear () {
      const { year } = this.formatDate;
      return year - year % 10;
    },
    endYear () {
      return this.startYear + 9;
    },
    years () {
      const arr = [];
      for (let i = this.startYear; i <= this.endYear; i++) {
        arr.push(i);
      }
      return createMatrix(arr, 4);
    }
  },
  methods: {
    changeYear (value) {
      const [year] = getYearMonthDay(this.tempValue);
      const timestamp = cloneDate(this.tempValue).setFullYear(year + value);
      this.$emit('update:tempValue', new Date(timestamp));
    },
    onClickYear (year) {
      const { month, day } = this.formatDate;
      this.dispatch('input', new Date(year, month, day), 'GoDatePicker');
      this.$emit('mode-change', 'picker-days');
    },
    yearClasses (year) {
      return {
        active: this.isSameYear(year),
        current: this.isCurrentYear(year)
      };
    },
    isCurrentYear (year) {
      const [year2] = getYearMonthDay(new Date());
      return year === year2;
    },
    isSameYear (year) {
      const [year2] = getYearMonthDay(this.value);
      return year === year2;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-picker-years {
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
  .go-date-picker-years-cell {
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
  .go-date-picker-years-row {
    display: flex;
  }
  .go-date-picker-years-cell {
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
