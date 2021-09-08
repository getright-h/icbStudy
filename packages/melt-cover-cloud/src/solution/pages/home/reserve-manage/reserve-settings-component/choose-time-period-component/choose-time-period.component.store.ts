import { useEffect } from 'react';
import { useStateStore } from '@fch/fch-tool';
import _ from 'lodash';
import {
  DetailTimeDTO,
  IChooseTimePeriodProps,
  IChooseTimePeriodState,
  timeList,
  TimePeriodDTO,
  TimePeriodSlotDTO,
  WeekDayDTO
} from './choose-time-period.interface';
import { DATE_TIME_DEFAULT, DATE_TIME_WEEK } from '~/solution/shared/constant/time';

export function useChooseTimePeriodStore(props: IChooseTimePeriodProps) {
  const { state, setStateWrap } = useStateStore(new IChooseTimePeriodState());

  useEffect(() => {
    console.log('props.initData===>', props.initData);
    !!props.initData ? initWeekListByInitData() : setStateWrap({ weekList: initWeekList() });
  }, [props.initData]);

  useEffect(() => {
    submitCurrentTimePeriod();
  }, [state.weekList]);

  function initWeekList(): WeekDayDTO[] {
    return DATE_TIME_WEEK.map(element => {
      return {
        ...element,
        children: DATE_TIME_DEFAULT.map(o => ({ ...o }))
      };
    });
  }
  function initWeekListByInitData() {
    const weekList = initWeekList().map(element => {
      props.initData.forEach(dataElement => {
        if (element.keyInfo == dataElement.week) {
          element.children = dataElement.slots.map((item, index) => {
            const returnItem: DetailTimeDTO = {
              ...item,
              checked: true,
              keyInfo: index + 1,
              startTime: 0,
              endTime: 0
            };
            if (item.slot) {
              const timeArr = item.slot.split('-');
              returnItem.startTime = _.find(timeList, { value: timeArr[0] }).key;
              returnItem.endTime = _.find(timeList, { value: timeArr[1] }).key;
            }
            return returnItem;
          });
          element.checked = element.children.every(element => {
            return element.checked;
          });
        }
      });
      return element;
    });
    console.log('initWeekListByInitData===>', weekList);
    setStateWrap({ weekList });
  }
  function onWeekClick(weekDay: WeekDayDTO) {
    const weekList: WeekDayDTO[] = state.weekList.map(week => {
      if (week.day == weekDay.day) {
        week.checked = !week.checked;
        week.children.forEach(element => {
          element.checked = !!week.checked;
        });
      }
      return week;
    });
    setStateWrap({ weekList });
  }
  function onTimeClick(detailTime: DetailTimeDTO, weekDay: WeekDayDTO) {
    const weekList: WeekDayDTO[] = state.weekList.map(week => {
      if (week.day == weekDay.day) {
        week.children.forEach(time => {
          if (time.keyInfo == detailTime.keyInfo) time.checked = !time.checked;
        });
        week.checked = week.children.every(element => {
          return element.checked;
        });
      }
      return week;
    });
    setStateWrap({ weekList });
  }
  function startTimeChange(
    $event: number,
    endTime: number,
    detail: DetailTimeDTO,
    timeKeyInfo: number,
    weekDayKeyInfo: number
  ) {
    const weekList = [...state.weekList];
    weekList[weekDayKeyInfo - 1].children.forEach(time => {
      if (time.keyInfo == timeKeyInfo) {
        time.startTime = $event;
      }
    });
    if (endTime && $event >= endTime) {
      detail.endTime = $event + 1;
      endTimeChange($event + 1, timeKeyInfo, weekDayKeyInfo, weekList);
      return;
    }
    setStateWrap({ weekList });
  }
  function endTimeChange($event: number, timeKeyInfo: number, weekDayKeyInfo: number, curWeekList?: WeekDayDTO[]) {
    const weekList = curWeekList ? curWeekList : [...state.weekList];
    if (timeKeyInfo < weekList[weekDayKeyInfo - 1].children.length) {
      weekList[weekDayKeyInfo - 1].children.splice(timeKeyInfo);
    }
    if ($event < 10) {
      weekList[weekDayKeyInfo - 1].children.push({
        keyInfo: timeKeyInfo + 1,
        startTime: timeList[$event - 1].key,
        endTime: 10,
        checked: false,
        discountType: 0,
        totalAmount: null,
        discountAmount: null,
        discount: null
      });
      weekList[weekDayKeyInfo - 1].checked = false;
    }
    weekList[weekDayKeyInfo - 1].children.forEach(time => {
      if (time.keyInfo == timeKeyInfo) {
        time.endTime = $event;
      }
    });
    setStateWrap({ weekList });
  }
  function discountChange($event: number | string, timeKeyInfo: number, weekDayKeyInfo: number, keyword: string) {
    const weekList = [...state.weekList];
    weekList[weekDayKeyInfo - 1].children.forEach(time => {
      if (time.keyInfo == timeKeyInfo) {
        time[keyword] = $event;
      }
    });
    setStateWrap({ weekList });
  }
  function submitCurrentTimePeriod() {
    const currentSelectItems: TimePeriodDTO[] = [];
    state.weekList.forEach(element => {
      const currentSelectChildItem: Partial<TimePeriodSlotDTO>[] = [];
      element.children.forEach(o => {
        !!o.checked &&
          currentSelectChildItem.push({
            slot: `${timeList[o.startTime - 1].value}-${timeList[o.endTime - 1].value}`,
            discountType: o.discountType,
            totalAmount: Number(o.totalAmount),
            discountAmount: Number(o.discountAmount),
            discount: Number(o.discount)
          });
      });
      currentSelectChildItem.length &&
        currentSelectItems.push({
          week: element.keyInfo,
          slots: currentSelectChildItem
        });
    });
    props.getTimePeriod(currentSelectItems);
  }
  return { state, onWeekClick, onTimeClick, startTimeChange, endTimeChange, discountChange };
}
