// dist/picker-date/index.js
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['i-class'],

  properties: {
    title: {
      type: String
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    fields: {
      type: String
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

  data: {
    years: [],
    months: [],
    endMonth: 12,
    days: [],
    endDay: 31,
    yearsShowPos: [0],
    monthsShowPos: [2],
    daysShowPos: [5],
    yearsVisible: true,
    monthsVisible: true,
    daysVisible: true
  },

  attached: function() {
    /**
     * 初始化年月日
     */
    var date = new Date();
    var years = [];
    var months = [];
    var days = [];
    let startArray = this.data.start.split('-');
    let endArray = this.data.end.split('-');
    let startYear, startMonth, startDay, endYear, endMonth = 12,
      endDay = 31;


    if (this.data.fields === 'day') {
      startYear = startArray[0];
      startMonth = startArray[1];
      startDay = startArray[2];
      this.setData({

      })
    } else if (this.data.fields === 'month') {
      startYear = startArray[0];
      startMonth = startArray[1];
      this.setData({
        daysVisible: false
      })
    } else if (this.data.fields === "year") {
      startYear = startArray[0];
      this.setData({
        daysVisible: false,
        monthsVisible: false
      })
    } else {
      this.setData({
        daysVisible: false,
        monthsVisible: false,
        yearsVisible: false
      })
    }
    if (endArray.length === 3) {
      endYear = endArray[0];
      endMonth = endarray[1];
      endday = endArray[2];
    } else {
      endYear = parseInt(startYear) + 50;
    }
    for (let i = startYear; i <= endYear; i++) {
      years.push(i)
    }

    months = this._getMonths(startYear, endYear, endMonth);

    days = this._getDays(startYear, endYear, startMonth, endMonth, endDay);

    this.setData({
      years: years,
      months: months,
      endMonth: endMonth,
      days: days,
      endDay: endDay
    })

  },
  ready: function() {
    let startArray = this.data.start.split('-');
    
    this.setData({
      monthsShowPos: [parseInt(startArray[1]) - 1],
      daysShowPos: [parseInt(startArray[2] - 1)]
    })
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
    _getDays: function(year, endYear, month, endMonth, endDay) {
      let daysNum;
      let days = [];

      if (month === 2) {
        daysNum = ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
      } else {
        daysNum = daysInMonth[month - 1]
      }

      if (year === endYear && month == endMonth) {
        daysNum = endDay;
      }

      for (let i = 1; i <= daysNum; i++) {
        let day = 0;
        day = i < 10 ? '0' + i : i;
        days.push(day)
      }

      return days;
    },
    _getMonths: function(year, endYear, endMonth) {
      let monthNum = 12;
      let months = [];

      if (year === endYear) {
        monthNum = endMonth;
      }

      for (let i = 1; i <= monthNum; i++) {
        let month = 0;
        month = i < 10 ? '0' + i : i;
        months.push(month)
      }

      return months;
    }
  }
});