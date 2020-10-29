## `Vue`实战：日期选择器
> * [源码地址](https://github.com/wangkaiwd/go-ui/blob/master/src/components/date-picker/date-picker.vue)
> * [`demo`演示](http://localhost:8080/#/date-picker)

在日常工作中需要填写日期的时候，会用到日期选择器，来方便的进行日、月、年的选择。这里我们会用`Vue`来实现一个日期选择器，效果如下：
<p align="center">
  <img src="https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Oct-29-2020%2014-48-17.gif" alt="">
</p>

实现功能： 
- [x] 日期选择弹出层
- [x] 选择天面板
- [x] 选择月面版
- [x] 选择年面版
- [x] 支持用户输入
- [x] `CSS`样式美化

组件的使用方式很简单，只需要传入对应的日期对象`value`即可：  
```vue
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
```
下面就开始一步步实现组件吧😁！

### 日期选择弹出层
当用户点击输入框时，会弹出日期选择面板。在组件内部，会通过`visible`来控制弹出层的显示隐藏：  
```vue
<template>
  <div class="go-date-picker" ref="picker">
    <go-input
      class="go-date-picker-input"
      @focus="visible=true"
      prefix="calendar"
      placeholder="请选择时间"
    >
    </go-input>
    <div ref="popover" class="go-date-picker-popover" v-if="visible">
        <!-- day/month/year  panel    -->
    </div>
  </div>
</template>

<script>
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
    };
  },
  mounted () {
    document.body.addEventListener('click', this.onClickBody);
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.onClickBody);
  },
  methods: {
    onClickBody (e) { // Vue内部会自动帮我们修改this指向
      const { picker, popover } = this.$refs;
      if (!popover) {return;}
      // 过滤掉弹出层和日期选择器内的元素
      if (picker.contains(e.target) || popover.contains(e.target)) {
        return;
      }
      this.visible = false;
    },
  }
};
</script>
```
当输入框激活时，显示弹出层，当点击外部区域时，会隐藏弹出层。需要注意的是当*点击`date-picker`内部，弹出层并不会隐藏*。

`Node.contains(otherNode)`可以用来判断`otherNode`是否是`Node`的后代节点(包括`Node`本身)，返回`Boolean`。这里我们通过这个`api`来判断点击的元素`e.target`是否在`date-picker`内部，如果是的话不会隐藏弹出层，可以让用户在`date-picker`进行相应的操作。

### 展示天面板
当用户点击输入框后，首先弹出的是天面板，面板头部会显示当前的年月信息。面板主体有6行，会分别包括上月、当前月、下月的天数： 
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201029152243.png)

#### 显示头部信息
头部信息我们对传入的`value`进行拷贝，在内部通过`tempValue`来进行保存，并且监听`watch`的变化，保证`tempValue`可以获取到`value`的最新值。当我们在内部切换日期面板而并没有选中某个日期时，就不会更新`value`，而只是更新内部的`tempValue`属性：  
```vue
<script>
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
  },
  watch: {
    value (val) {
      this.tempValue = cloneDate(val);
    }
  },
  // some code ...
};
</script>
```
`formatDate`计算属性会通过`tempValue`计算出当前的年、月、日，方便展示。

#### 显示内容区域
内容区域的展示会复杂很多，实现的思路如下：
* 获取当前月第一天是星期几，推导出前一个月展示的天数
* 获取当月的展示总天数
* 总共要展示的天数为42，减去前一个月和当前月展示的天数即为下个月展示的天数
```vue
<script>
export default {
  name: 'PickerDays',
  data () {
    return {
      weeks: ['一', '二', '三', '四', '五', '六', '日']
    };
  },
  // some code ...
  computed: {
    getDays () {
      const [year, month] = getYearMonthDay(this.tempValue);
      // 0 ~ 6, 需要往前推 startWeek + 1天
      const startWeek = new Date(year, month, 1).getDay();
      const prevLastDay = getPrevMonthLastDay(year, month);
      const curLastDay = getCurrentMonthLastDay(year, month);
      const days = [...this.getPrevMonthDays(prevLastDay, startWeek), ...this.getCurrentMonthDays(curLastDay), ...this.getNextMonthDays(curLastDay, startWeek)];
      // 转换成二维数组
      return toMatrix(days, 7);
    },
  },
  methods: {
    // 获取前一个月天数
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
    // 获取当前月天数
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
    // 获取下一个月天数
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
```
我们将前一个月、当前月、下一个月的日期信息组成一个数组，然后转换位为拥有6个子数组，每个子数组中有7条信息的二维数组，方便遍历展示： 
```vue
<template>
  <div class="go-picker-days">
    <!--  some code ...  -->
    <div class="go-date-picker-days-row" v-for="(row,i) in getDays" :key="`${row}-${i}`">
      <div
        class="go-date-picker-days-cell"
        v-for="(cell,j) in row"
        :key="`${cell}-${j}`"
      >
        {{ getDay(cell) }}
      </div>
    </div>
  </div>
</template>
```
数组的格式如下： 
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201029155114.png)

在计算日期时，如果传入的天数为0，则表示前一个月的最后一天。利用这个特性，可以节省我们很多的计算逻辑：  
```javascript
export const getCurrentMonthLastDay = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getPrevMonthLastDay = (year, month) => {
  return new Date(year, month, 0).getDate();
};
```
> * [Calculate last day of month in JavaScript](https://stackoverflow.com/a/13773408/12819402)
> * [How to get the last day of the previous month in Javascript or JQuery](https://stackoverflow.com/a/37803823/12819402)

在遍历展示的天的过程中，还可以通过日期信息来为其设置样式：  
```vue
<template>
  <div class="go-picker-days">
    <div class="go-date-picker-days-row" v-for="(row,i) in getDays" :key="`${row}-${i}`">
      <div
        class="go-date-picker-days-cell"
        :class="dayClasses(cell)"
        v-for="(cell,j) in row"
        :key="`${cell}-${j}`"
      >
        {{ getDay(cell) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // some code ...
  methods: {
    dayClasses (cell) {
      return {
        prev: cell.status === 'prev',
        next: cell.status === 'next',
        active: this.isSameDay(cell.date, this.value),
        today: this.isToday(cell.date)
      };
    },
    // 是否是选中的天
    isSameDay (date1, date2) {
      const [y1, m1, d1] = getYearMonthDay(date1);
      const [y2, m2, d2] = getYearMonthDay(date2);
      return y1 === y2 && m1 === m2 && d1 === d2;
    },
    // 是否是今天
    isToday (date) {
      const [y1, m1, d1] = getYearMonthDay(date);
      const [y2, m2, d2] = getYearMonthDay();
      return y1 === y2 && m1 === m2 && d1 === d2;
    }
  }
};
</script>
}
```
通过`dayClasses`方法，我们分别为添加如下`class`: 
* `prev`: 前一个月
* `next`: 下一个月
* `active`: 选中的日期
* `today`: 今天

之后便可以为这些不同状态分别添加不同的样式了。

#### 月份切换
在面板的头部，支持点击左右箭头进行月份切换。其实现利用了`Date.prototype.setMonth`方法：
```vue
<template>
  <div class="go-picker-days">
    <div class="go-date-picker-popover-header">
      <span class="go-date-picker-prev" @click="changeMonth(-1)">‹</span>
      <span class="go-date-picker-info" @click="$emit('mode-change','picker-months')">
        {{ formatDate.year }}年{{ formatDate.month }}月{{ formatDate.day }}日</span>
      <span class="go-date-picker-next" @click="changeMonth(1)">›</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PickerDays',
  methods: {
    changeMonth (value) {
      const [, month] = getYearMonthDay(this.tempValue);
      const timestamp = cloneDate(this.tempValue).setMonth(month + value);
      // 通过.sync修饰符绑定，使用update:xxx来进行修改值
      this.$emit('update:tempValue', new Date(timestamp));
    }
  }
};
</script>
```
内部会传入设置的月份，如果值为-1或者13的话，会自动切换到前一年或后一年，而不用担心时间混乱。

#### 选择天
当点击面板中的某天后，需要更新用户传入的`value`。而在`value`更新后，由于在组件内我们`watch`了`value`，所以也会同时更新`tempValue`，使页面中的数据和`value`保持一致：
```vue
<template>
  <div class="go-picker-days">
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
</template>

<script>
export default {
  name: 'PickerDays',
  // 引入混合器
  mixins: [emitter],
  // some code ...
  methods: {
    onClickDay (cell) {
      this.dispatch('input', cell.date, 'GoDatePicker');
    },
    // some code...
  }
};
</script>
```
这里用到了跨组件调用`this.$emit('input')`事件，需要从子到父一直通过`@`进行事件监听，并使用`this.$emit('input')`继续向上触发事件。为了简化这个过程，在混合器内封装了`dispatch`方法，方便跨组件之间的方法触发：
```javascript
// src/mixins/emitter.js
const emitter = {
  methods: {
    dispatch (event, params, componentName) {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === componentName) {
          return parent.$emit(event, params);
        }
        parent = parent.$parent;
      }
    }
  }
};

export default emitter;
```
> 如果不理解`dispatch`的实现过程的话，可以参考笔者的[这篇文章]()

### 展示月面板
代码中将年月日分别拆分成了不同的组件，然后通过动态组件来进行展示。

月面板的界面效果如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201029172306.png)

我们在代码内部定义了数组`months`来代表所有月份，并且通过`toMatrix`转换为拥有3个子数组的二维数组，方便进行遍历：
```vue
<template>
  <div class="go-picker-months">
    <!--  some code ...  -->
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
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
export default {
  name: 'PickerMonths',
  data () {
    return {
      months: toMatrix(MONTHS, 4)
    };
  },
  methods: {
    monthClasses (i, j) {
      const month = j + i * 4;
      return {
        active: this.isSameMonth(month),
        current: this.isCurrentMonth(month)
      };
    },
    onClickMonth (i, j) {
      const month = j + i * 4;
      const { year, day } = this.formatDate;
      this.dispatch('input', new Date(year, month, day), 'GoDatePicker');
      this.$emit('mode-change', 'picker-years');
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
```
在遍历过程中可以通过`i,j`来获取到对应项的真实月份，根据月份和`formatDate`得到的`tempValue`所对应的当前面板的年份，可以添加不同的类名，从而设置不同的样式。

在点击月份后，会更新用户传入的`value`，然后跳转到年面板，下面我们来介绍年面板的实现

### 展示年面板

### 输入当前日期

### 结语
日期选择器的难点在于年、月、天列表的展示，需要我们对`Date`的一些`api`有一定的了解，否则会导致很多没有必要的计算逻辑。
