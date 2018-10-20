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
    now: {
      type: String
    },
    fields: {
      type: String,
      value: "day"
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  data: {
    years: [],
    endYear: 2119,
    startYear: 2018,
    months: [],
    endMonth: 12,
    startMonth: 1,
    days: [],
    endDay: 31,
    startDay: 1,
    yearsShowPos: [0],
    monthsShowPos: [2],
    daysShowPos: [5],
    yearsVisible: true,
    monthsVisible: true,
    daysVisible: true,
    visible: false
  },

  attached: function() {
    /**
     * 初始化年月日
     */
    var date = new Date();
    var years = [];
    var months = [];
    var days = [];
    var start = this.data.start;

    if (start === null || start === "") {
      let now = this.data.now;
      start = now;
      this.setData({
        start: now
      })
    }
    let startArray = start.split('-');
    let endArray = this.data.end.split('-');
    let nowArray = this.data.now.split('-');
    let startYear, startMonth = 1,
      startDay = 1,
      endYear, endMonth = 12,
      endDay = 31,
      nowYear, nowMonth, nowDay;

    if (this.data.fields === 'day') {
      startYear = startArray[0];
      startMonth = startArray[1];
      startDay = startArray[2];
      nowYear = nowArray[0];
      nowMonth = nowArray[1];
      nowDay = nowArray[2];
    } else if (this.data.fields === 'month') {
      startYear = startArray[0];
      startMonth = startArray[1];
      nowYear = nowArray[0];
      nowMonth = nowArray[1];
      this.setData({
        daysVisible: false
      })
    } else if (this.data.fields === "year") {
      startYear = startArray[0];
      nowYear = nowArray[0];
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
      endMonth = endArray[1];
      endDay = endArray[2];
    } else {
      endYear = parseInt(startYear) + 50;
    }

    for (let i = startYear; i <= endYear; i++) {
      years.push(i)
    }

    months = this._getMonths(startYear, endYear, nowYear, startMonth, endMonth);

    days = this._getDays(startYear, endYear, nowYear, startMonth, endMonth, nowMonth, startDay, endDay);

    this.setData({
      years: years,
      startYear: startYear,
      endYear: endYear,
      months: months,
      startMonth: startMonth,
      endMonth: endMonth,
      days: days,
      endDay: endDay,
      startDay: startDay
    })
  },
  ready: function() {
    let nowArray = this.data.now.split('-');
    let startArray = this.data.start.split('-');

    if (this.data.fields === 'day') {

      this.setData({
        yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])],
        monthsShowPos: [parseInt(nowArray[1]) - 1],
        daysShowPos: [parseInt(nowArray[2] - 1)]
      })
    } else if (this.data.fields === 'month') {

      this.setData({
        yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])],
        monthsShowPos: [parseInt(nowArray[1]) - 1]
      })
    } else if (this.data.fields === 'year') {

      this.setData({
        yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])]
      })
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

    handleSure() {

      let curYear = this.data.years[this.data.yearsShowPos];
      let curMonth = this.data.months[this.data.monthsShowPos];
      let curDay = this.data.days[this.data.daysShowPos];
      this.setData({
        visible: false
      })
    },
    handleCancel() {
      this._initComponent();
      this.setData({
        visible: false
      })
    },
    _getDays: function(startYear, endYear, nowYear, startMonth, endMonth, nowMonth, startDay, endDay) {
      let daysNum;
      let daysStart = 1;
      let days = [];

      if (nowMonth === 2) {
        daysNum = ((nowYear % 4 === 0) && ((nowYear % 100) !== 0)) || (nowYear % 400 === 0) ? 29 : 28
      } else {
        daysNum = daysInMonth[nowMonth - 1]
      }

      if (parseInt(nowYear) === parseInt(endYear) && parseInt(nowMonth) === parseInt(endMonth)) {
        daysNum = daysNum < endDay ? daysNum : endDay;
      }

      if (parseInt(nowYear) === parseInt(startYear) && parseInt(nowMonth) === parseInt(startMonth)) {
        daysStart = startDay;
      }

      for (let i = daysStart; i <= daysNum; i++) {
        let day = 0;
        day = i < 10 ? '0' + i : i;
        days.push(day)
      }

      return days;
    },
    _getMonths: function(startYear, endYear, curYear, startMonth, endMonth) {
      let monthNum = 12;
      let monthStart = 1;
      let months = [];

      if (parseInt(curYear) === parseInt(endYear)) {
        monthNum = endMonth;
      }

      if (parseInt(curYear) === parseInt(startYear)) {
        monthStart = startMonth;
      }

      for (let i = monthStart; i <= monthNum; i++) {
        let month = 0;
        month = i < 10 ? '0' + i : i;
        months.push(month)
      }

      return months;
    },
    yearChange: function(e) {

      let yearIndex = e.detail.value[0];
      let months = [];
      let days = [];
      let curYear = this.data.years[yearIndex];

      months = this._getMonths(this.data.startYear, this.data.endYear, curYear, this.data.startMonth, this.data.endMonth);
      days = this._getDays(this.data.startYear, this.data.endYear, curYear, this.data.startMonth, this.data.endMonth, months[0], this.data.startDay, this.data.endDay);
      this.setData({
        months: months,
        days: days,
        yearsShowPos: [yearIndex],
        monthsShowPos: [0],
        daysShowPos: [0]
      })
    },
    monthChange: function(e) {
      let monthIndex = e.detail.value[0];
      let curMonth = this.data.months[monthIndex];
      let curYear = this.data.years[this.data.yearsShowPos];
      let days = [];

      days = this._getDays(this.data.startYear, this.data.endYear, curYear, this.data.startMonth, this.data.endMonth, curMonth, this.data.startDay, this.data.endDay);

      this.setData({
        days: days,
        monthsShowPos: [monthIndex],
        daysShowPos: [0]
      })
    },
    dayChange: function(e) {
      let dayIndex = e.detail.value[0];

      this.setData({
        daysShowPos: [dayIndex]
      })
    },
    _initComponent: function() {

      var date = new Date();
      var years = [];
      var months = [];
      var days = [];
      var start = this.data.start;

      if (start === null || start === "") {
        let now = this.data.now;
        start = now;
        this.setData({
          start: now
        })
      }
      let startArray = start.split('-');
      let endArray = this.data.end.split('-');
      let nowArray = this.data.now.split('-');

      let startYear, startMonth = 1,
        startDay = 1,
        endYear, endMonth = 12,
        endDay = 31,
        nowYear, nowMonth, nowDay;

      if (this.data.fields === 'day') {
        startYear = startArray[0];
        startMonth = startArray[1];
        startDay = startArray[2];
        nowYear = nowArray[0];
        nowMonth = nowArray[1];
        nowDay = nowArray[2];
      } else if (this.data.fields === 'month') {
        startYear = startArray[0];
        startMonth = startArray[1];
        nowYear = nowArray[0];
        nowMonth = nowArray[1];
        this.setData({
          daysVisible: false
        })
      } else if (this.data.fields === "year") {
        startYear = startArray[0];
        nowYear = nowArray[0];
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
        endMonth = endArray[1];
        endDay = endArray[2];
      } else {
        endYear = parseInt(startYear) + 50;
      }

      for (let i = startYear; i <= endYear; i++) {
        years.push(i)
      }

      months = this._getMonths(startYear, endYear, nowYear, startMonth, endMonth);

      days = this._getDays(startYear, endYear, nowYear, startMonth, endMonth, nowMonth, startDay, endDay);

      this.setData({
        years: years,
        startYear: startYear,
        endYear: endYear,
        months: months,
        startMonth: startMonth,
        endMonth: endMonth,
        days: days,
        endDay: endDay,
        startDay: startDay
      })
      this._initShowPos();
    },
    _initShowPos: function() {
      let nowArray = this.data.now.split('-');
      let startArray = this.data.start.split('-');

      if (this.data.fields === 'day') {

        this.setData({
          yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])],
          monthsShowPos: [parseInt(nowArray[1]) - 1],
          daysShowPos: [parseInt(nowArray[2] - 1)]
        })
      } else if (this.data.fields === 'month') {

        this.setData({
          yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])],
          monthsShowPos: [parseInt(nowArray[1]) - 1]
        })
      } else if (this.data.fields === 'year') {

        this.setData({
          yearsShowPos: [parseInt(nowArray[0]) - parseInt(startArray[0])]
        })
      }
    }
  }
});