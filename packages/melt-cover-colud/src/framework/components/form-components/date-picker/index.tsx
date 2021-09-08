import { DatePicker } from 'antd';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';
import * as React from 'react';
import { COMPONENT_DATE_PICKER_TYPES } from '../index.types';
const { RangePicker } = DatePicker;

export class DatePickerFactory {
  public static getDatePicker(type?: number) {
    switch (type) {
      case COMPONENT_DATE_PICKER_TYPES.DatePickerRange:
        return (props: RangePickerProps) => <RangePicker {...props} />;
      default:
        return (props: DatePickerProps) => <DatePicker {...props} />;
    }
  }
}
