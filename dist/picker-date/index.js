// dist/picker-date/index.js
const date = new Date()
const years = []
const months = []
const days = []

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}

let test=function(){
  console.log(111);
}

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}



Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['i-class'],

  properties: {
    title: {
      type: String
    },
    years: {
      type: String,
      value: years
    },
    year: {
      type: String,
      value: date.getFullYear()
    },
    months: {
      type: String,
      value: months
    },
    month: {
      type: String,
      value: date.getMonth() + 1
    },
    days: {
      type: String,
      value: days
    },
    day: {
      type: String,
      value: date.getDate() + 1
    },
    value: {
      type: Array,
      value: [9999, 999, 2]
    },
    visible: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleInputChange(event) {
      const {
        detail = {}
      } = event;
      const {
        value = ''
      } = detail;
      this.setData({
        value
      });

      this.triggerEvent('change', event);
    },
    handleAction() {
      this.setData({
        visible: true
      })
    },
    handleCancel() {
      test()
      this.setData({
        visible: false
      })
    },

  }
});