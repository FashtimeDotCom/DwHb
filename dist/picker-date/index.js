// dist/picker-date/index.js
const date = new Date()
const years = []
const months = []
const days = []

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
      value: [9999, 1, 1]
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
    }
  }
});