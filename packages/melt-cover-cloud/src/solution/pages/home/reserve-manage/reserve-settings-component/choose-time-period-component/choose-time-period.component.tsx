import { Button, Checkbox, Input, Select } from 'antd';
import * as React from 'react';
import style from './choose-time-period.module.less';
import { useChooseTimePeriodStore } from './choose-time-period.component.store';
import { IChooseTimePeriodProps, timeList } from './choose-time-period.interface';
const { Option } = Select;

export default function ChooseTimePeriodComponent(props: IChooseTimePeriodProps) {
  const { state, onWeekClick, onTimeClick, startTimeChange, endTimeChange, discountChange } = useChooseTimePeriodStore(
    props
  );
  const { weekList } = state;
  return (
    <div className={style.timePeriod}>
      {weekList.map(weekDay => (
        <div className={style.timePeriodDay} key={'weekday-' + weekDay.day}>
          <Button type={weekDay.checked ? 'primary' : 'default'} onClick={() => onWeekClick(weekDay)}>
            {weekDay.day}
          </Button>
          {weekDay.children.map((detailTime, i) => (
            <div className={style.timePeriodDayButton} key={`dt-${weekDay.day}${i}`}>
              <Checkbox
                checked={detailTime.checked || weekDay.checked}
                onChange={() => onTimeClick(detailTime, weekDay)}
              ></Checkbox>
              <Select
                className={style.item}
                value={detailTime.startTime}
                onChange={$event =>
                  startTimeChange($event, detailTime.endTime, detailTime, detailTime.keyInfo, weekDay.keyInfo)
                }
              >
                {timeList.map(item => (
                  <Option
                    key={'time-' + item.key}
                    value={item.key}
                    disabled={item.key == 10 || (i != 0 && item.key < weekDay.children[i - 1].endTime)}
                  >
                    {item.value}
                  </Option>
                ))}
              </Select>
              <span>至</span>
              <Select
                className={style.item}
                value={detailTime.endTime}
                onChange={$event => endTimeChange($event, detailTime.keyInfo, weekDay.keyInfo)}
              >
                {timeList.map(item => (
                  <Option key={'time-' + item.key} value={item.key} disabled={item.key <= detailTime.startTime}>
                    {item.value}
                  </Option>
                ))}
              </Select>
              <Select
                className={style.type}
                value={detailTime.discountType}
                placeholder="请选择类型"
                onChange={$event => discountChange($event, detailTime.keyInfo, weekDay.keyInfo, 'discountType')}
              >
                <Option value={0}>无折扣</Option>
                <Option value={1}>打折</Option>
                <Option value={2}>满减</Option>
              </Select>
              {detailTime.discountType == 2 && (
                <div style={{ display: 'inline-block' }}>
                  <span style={{ display: 'inline-block', margin: '0 5px 0 10px' }}>满</span>
                  <Input
                    style={{ width: '60px' }}
                    placeholder="数字"
                    value={detailTime.totalAmount}
                    onChange={e => discountChange(e.target.value, detailTime.keyInfo, weekDay.keyInfo, 'totalAmount')}
                  />
                  <span style={{ display: 'inline-block', margin: '0 5px' }}>元减</span>
                  <Input
                    style={{ width: '60px' }}
                    placeholder="数字"
                    value={detailTime.discountAmount}
                    onChange={e =>
                      discountChange(e.target.value, detailTime.keyInfo, weekDay.keyInfo, 'discountAmount')
                    }
                  />
                  <span style={{ display: 'inline-block', margin: '0 5px' }}>元</span>
                </div>
              )}
              {detailTime.discountType == 1 && (
                <div style={{ display: 'inline-block' }}>
                  <Input
                    style={{ width: '160px', marginLeft: '25px' }}
                    placeholder="输入0-0.99之间的数字"
                    value={detailTime.discount}
                    onChange={e => discountChange(e.target.value, detailTime.keyInfo, weekDay.keyInfo, 'discount')}
                  />
                  <span style={{ display: 'inline-block', margin: '0 5px' }}>折</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
