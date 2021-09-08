import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/es/checkbox';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import * as React from 'react';
import { COMPONENT_CHECKBOX_TYPES } from '../index.types';

export class CheckBoxFactory {
  public static getCheckBox(type?: number) {
    switch (type) {
      case COMPONENT_CHECKBOX_TYPES.CheckboxGroup:
        return (props: CheckboxGroupProps) => <Checkbox.Group {...props} />;
      default:
        return (props: CheckboxProps) => <Checkbox {...props}></Checkbox>;
    }
  }
}
