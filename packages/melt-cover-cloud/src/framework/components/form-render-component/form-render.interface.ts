import { FormProps } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import React from 'react';
import { TypeUseForm } from '.';
import { IFormBaseComponentsUnion } from '../form-base-components/index.type';

/**
 * @export state变量定义和初始化
 * @class IFormRenderState
 */
export class IFormRenderState {
  schema: IFormBaseComponentsUnion[];
}

export type ISchemUnion = IFormBaseComponentsUnion[] | IFormBaseComponentsUnion | IFormBaseComponentsUnion[][];
export interface IFormRenderProps {
  watch?: Store;
  form: TypeUseForm;
  schema: IFormBaseComponentsUnion[];
  props?: FormProps;
  widget?: IWidget;
  className?: string;
  slot?: (props: { renderItem: Function }) => React.ReactNode;
}

export type IWidget = {
  [key: string]: any;
};
