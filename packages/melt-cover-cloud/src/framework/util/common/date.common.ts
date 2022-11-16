import moment from 'moment';
export const DATE_DEAL = {
  // 获取当前天对应的那周的所有天数从周天开始
  getCurrentDayWeek(date: moment.Moment): moment.Moment[] {
    const selectedDay = date.weekday();
    date.subtract(selectedDay, 'days');
    const curStartDate = date;
    const dates = [curStartDate];
    for (let i = 0; i < 6; i++) {
      date = moment(date).add(1, 'days');
      dates.push(date);
    }
    return dates;
  },

  /** 格式化日期区间或单个日期的时间为 00:00:00 - 23:59:59 的字符串格式, 用于后端请求 */
  formatDatePicker(time: moment.Moment | [moment.Moment, moment.Moment], startKey?: string, endKey?: string) {
    const start = startKey || 'startTime';
    const end = endKey || 'endTime';
    if (Array.isArray(time)) {
      const startTime = time?.[0]
        ? moment(time[0])
            .startOf('day')
            .format()
        : undefined;
      const endTime = time?.[1]
        ? moment(time[1])
            .endOf('day')
            .format()
        : undefined;
      return { [start]: startTime, [end]: endTime };
    } else {
      const startTime = time
        ? moment(time)
            .startOf('day')
            .format()
        : undefined;
      const endTime = time
        ? moment(time)
            .endOf('day')
            .format()
        : undefined;
      return { [start]: startTime, [end]: endTime };
    }
  },

  /** 将 formatDatePicker 返回的字符串转为时间戳 */
  formatDateTimeStamp(time: moment.Moment | [moment.Moment, moment.Moment], startKey?: string, endKey?: string) {
    const timeString = this.formatDatePicker(time, startKey, endKey);
    const start = startKey || 'startTime';
    const end = endKey || 'endTime';
    return {
      [start]: timeString[start] && moment(timeString[start]).valueOf(),
      [end]: timeString[end] && moment(timeString[end]).valueOf()
    };
  },

  /** 将 formatDatePicker 返回的字符串转为 YYYY-MM-DD 00:00:00~23:59:59 格式 */
  formatDateYmdHms(time: moment.Moment | [moment.Moment, moment.Moment], startKey?: string, endKey?: string) {
    const timeString = this.formatDatePicker(time, startKey, endKey);
    const start = startKey || 'startTime';
    const end = endKey || 'endTime';
    return {
      [start]: timeString[start] && moment(timeString[start]).format('YYYY-MM-DD 00:00:00'),
      [end]: timeString[end] && moment(timeString[end]).format('YYYY-MM-DD 23:59:59')
    };
  },

  // 格式化月份选择器为月初 00:00:00 - 月末23:59:59 的字符串格式, 用于后端请求
  formatMonthPicker(time: moment.Moment) {
    const startTime = time
      ? moment(time)
          .startOf('month')
          .format()
      : undefined;
    const endTime = time
      ? moment(time)
          .endOf('month')
          .format()
      : undefined;
    return { startTime, endTime };
  },

  enumerateDaysBetweenDates(startDate: moment.Moment, endDate: moment.Moment) {
    // 假定你已经保证了startDate 小于endDate，且二者不相等
    const daysList = [];
    const SDate = moment(startDate);
    const EDate = moment(endDate);
    daysList.push(SDate.format('YYYY-MM-DD'));
    while (SDate.add(1, 'days').isBefore(EDate)) {
      // 注意这里add方法处理后SDate对象已经改变。
      daysList.push(SDate.format('YYYY-MM-DD'));
    }
    daysList.push(EDate.format('YYYY-MM-DD'));
    return daysList;
  },
  otherDay(startDate: moment.Moment, endDate: moment.Moment) {
    // 假定你已经保证了startDate 小于endDate，且二者不相等
    const daysList = [];
    const SDate = moment(startDate);
    const EDate = moment(endDate);
    daysList.push(SDate.format('YYYY-MM-DD'));
    while (SDate.add(2, 'days').isBefore(EDate)) {
      // 注意这里add方法处理后SDate对象已经改变。
      daysList.push(SDate.format('YYYY-MM-DD'));
    }
    daysList.push(EDate.format('YYYY-MM-DD'));
    return daysList;
  },
  // 获取隔周
  otherWeek(startDate: moment.Moment, endDate: moment.Moment) {
    const daysList: string[] = [];
    let SDate = moment(startDate);
    const EDate = moment(endDate);
    // 获取当前周的剩余时间
    back();

    while (SDate.isBefore(EDate)) {
      SDate = SDate.add(1, 'week').startOf('week');
      back();
    }

    function back() {
      const currentWeekLast = moment(SDate).endOf('week');
      while (SDate.isBefore(currentWeekLast) && SDate.isBefore(EDate)) {
        daysList.push(SDate.format('YYYY-MM-DD'));
        SDate.add(1, 'days');
      }
    }
    return daysList;
  },
  getWeek(date: string) {
    // 参数时间戳
    const week = moment(date).day();
    switch (week) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 0:
        return '日';
    }
  },
  // 获取当前数组的指定星期
  getWeekDay(daysList: string[], weekList: number[]) {
    console.log(weekList, daysList);

    return daysList.filter(item => {
      return weekList.includes(moment(item).day());
    });
  }
};
