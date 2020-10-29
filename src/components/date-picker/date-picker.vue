<template>
  <div class="go-date-picker" ref="picker">
    <go-input
      class="go-date-picker-input"
      @focus="visible=true"
      v-model="displayValue"
      prefix="calendar"
      placeholder="请选择时间"
    >
    </go-input>
    <div class="go-date-picker-popover" v-if="visible">
      <component
        :is="mode"
        :value="value"
        :format-date="formatDate"
        :temp-value.sync="tempValue"
        :mode="mode"
        @mode-change="onModeChange"
      >
      </component>
    </div>
  </div>
</template>

<script>
import { cloneDate, getYearMonthDay } from '@/shared/date';
import PickerDays from './picker-days';
import PickerMonths from './picker-months';
import PickerYears from './picker-years';

export default {
  name: 'GoDatePicker',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  components: { PickerDays, PickerMonths, PickerYears },
  data () {
    return {
      visible: false,
      mode: 'picker-days',
      tempValue: cloneDate(this.value),
    };
  },
  computed: {
    formatDate () {
      const [year, month, day] = getYearMonthDay(this.tempValue);
      return { year, month: month + 1, day };
    },
    displayValue: {
      get () {
        const [year, month, day] = getYearMonthDay(this.value);
        return `${year}-${month + 1}-${day}`;
      },
      set (e) {
        if (e?.target?.value) {
          const reg = /(\d+)-(\d+)-(\d+)/;
          const value = e.target.value;
          const matched = value.match(reg);
          if (matched) {
            const [, year, month, day] = matched;
            this.$emit('input', new Date(year, month - 1, day));
          }
        }
      }
    },
  },
  watch: {
    value (val) {
      this.tempValue = cloneDate(val);
    }
  },
  mounted () {
    document.body.addEventListener('click', this.onClickBody);
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.onClickBody);
  },
  methods: {
    onClickBody (e) { // Vue内部会自动帮我们修改this指向
      const { picker } = this.$refs;
      if (picker.contains(e.target)) {
        return;
      }
      this.visible = false;
    },
    // 42个，每行7个
    onModeChange (mode) {
      setTimeout(() => {
        this.mode = mode;
      });
      // wait all micro tasks execute complete
      // setTimeout(() => {
      //   this.visible = true;
      // });
    },
    changeMonth () {
      const [, month] = getYearMonthDay(this.tempValue);
      const timestamp = this.tempValue.setMonth(month + value);
      this.tempValue = new Date(timestamp);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars.scss";
.go-date-picker {
  position: relative;
  .go-date-picker-input {
    width: 100%;
  }
  .go-date-picker-popover {
    color: #65708c;
    padding: 20px;
    position: absolute;
    top: calc(100% + 10px);
    left: 36px;
    background-color: $white;
    border-radius: 6px;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, .2);
    z-index: 10;
  }
}
</style>
