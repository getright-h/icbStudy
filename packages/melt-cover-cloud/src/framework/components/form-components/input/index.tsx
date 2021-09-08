import { Input } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import * as React from 'react';
import { COMPONENT_INPUT_TYPES } from '../index.types';
import CodeInputComponent from './code-input-component/code-input.component';
const { TextArea } = Input;
export class InputFactory {
  public static getInput(type?: number) {
    switch (type) {
      case COMPONENT_INPUT_TYPES.TextCode:
        return (props: InputProps) => <CodeInputComponent {...props} />;
      case COMPONENT_INPUT_TYPES.TextArea:
        return (props: TextAreaProps) => <TextArea rows={1} {...props} />;
      default:
        return (props: InputProps) => <Input {...props} />;
    }
  }
}
