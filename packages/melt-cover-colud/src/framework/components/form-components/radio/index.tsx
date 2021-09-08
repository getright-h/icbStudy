import { RadioGroupProps, RadioProps } from 'antd/lib/radio';
import * as React from 'react';
import { COMPONENT_RADIO_TYPES } from '../index.types';
import { Radio } from 'antd';

export class RadioFactory {
  public static getRadio(type?: number) {
    switch (type) {
      case COMPONENT_RADIO_TYPES.RadioPrimaryGroup:
        return (props: RadioGroupProps) => <Radio.Group {...props} />;
      case COMPONENT_RADIO_TYPES.RadioGroup:
        return (props: RadioGroupProps) => <Radio.Group optionType="button" buttonStyle="solid" {...props} />;
      default:
        return (props: RadioProps) => <Radio {...props} />;
    }
  }
}
