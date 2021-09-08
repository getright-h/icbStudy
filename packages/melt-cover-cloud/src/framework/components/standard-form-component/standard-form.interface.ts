import { FormLayout, FormProps } from 'antd/lib/form/Form';
import React from 'react';
import { IBaseFromUnion, IBaseFromUnionArray } from './standard-from.base.type';

/**
 * @export state变量定义和初始化
 * @class IStandardFormState
 */
export class IStandardFormState {
  formValue: {};
}

export interface IStandardFromProps extends FormProps {
  items: IBaseFromUnionArray;
  columns: number;
  slotFormComponent?: (props: {
    callback: (params: IRenderFormItem) => React.ReactNode;
    layout: FormLayout;
    columns: number;
  }) => React.ReactNode;
  handleFormChangeEvent?: Function;
}

export interface IRenderFormItem {
  item: IItem;
  layout: any;
  columns: any;
}

export const defaultFromItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

export const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 24, md: 24 },
  4: { xs: 24, sm: 12, md: 8 },
  5: { xs: 24, sm: 12, md: 6 },
  6: { xs: 24, sm: 12, md: 12 }
};

/**
 * 所有组件联合类型: 处理目的。。。
 */
export type IItem = IBaseFromUnion;
