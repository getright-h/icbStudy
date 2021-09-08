import { CheckboxGroupProps, CheckboxProps } from "antd/lib/checkbox";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import { FormItemProps } from "antd/lib/form";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { InputNumberProps } from 'antd/lib/input-number';
import { RadioGroupProps, RadioProps } from "antd/lib/radio";
import { RadioButtonProps } from "antd/lib/radio/radioButton";
import { SelectProps, SelectValue } from "antd/lib/select";
import React, { ClassAttributes, InputHTMLAttributes } from "react";
import { FormItemBase } from "../form-render-component/form-render.type";
import { IISelectLoadingProps } from "./ISelectLoadingComponent/i-select-loading.interface";
export type IChildren = IFormBaseComponentsUnion[] | (IFormBaseComponentsUnion[])[] | string | React.ReactNode;

export type ICheckBoxType = {
  type: 'Checkbox';
  props?: CheckboxProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type ICheckboxGroupType = {
  type: 'CheckboxGroup';
  props?: CheckboxGroupProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type ICheckboxButtonType = {
  type: 'CheckboxButton';
  props?: CheckboxGroupProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IDatePickerType = {
  type: 'DatePicker';
  props?: DatePickerProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IDateRangePickerType = {
  type: 'RangePicker';
  props?: RangePickerProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IHTMLType = {
  type: string;
  props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null;
  children?: IChildren
}

export type IInputType = {
  type: 'Input';
  props?: InputProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IInputNumberType = {
  type: 'InputNumber';
  props?: InputNumberProps;
  formItemProps?: FormItemProps;
  children?: IChildren;
}

export type ILayoutType = {
  type: 'Layout';
  props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  children?: IFormBaseComponentsUnion[] | (IFormBaseComponentsUnion[])[] | string
}

export type IRadioType = {
  type: 'Radio';
  props?: RadioProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IRadioButtonType = {
  type: 'RadioButton';
  props?: RadioButtonProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}
export type IRadioGroupType = {
  type: 'RadioGroup';
  props?: RadioGroupProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}


export type ISelectType = {
  type: 'Select';
  props?: SelectProps<SelectValue>;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type ISelectLoadingType = {
  type: 'SelectLoading';
  props?: IISelectLoadingProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type ITextAreaType = {
  type: 'TextArea';
  props?: TextAreaProps;
  formItemProps?: FormItemProps;
  children?: IChildren
}

export type IFormBaseComponentsUnion = (FormItemBase & (ICheckBoxType |
  ICheckboxGroupType |
  ICheckboxButtonType |
  IDatePickerType |
  IDateRangePickerType |
  IInputType |
  IInputNumberType |
  ILayoutType |
  IRadioType |
  IRadioButtonType |
  IRadioGroupType |
  ISelectType |
  ITextAreaType | 
  IHTMLType | 
  ISelectLoadingType
  ));

export type IFormBaseComponentsTypeUnion = ICheckBoxType["type"] |
  ICheckboxGroupType["type"] |
  ICheckboxButtonType["type"] |
  IDatePickerType["type"] |
  IDateRangePickerType["type"] |
  IHTMLType["type"] |
  IInputType["type"] |
  IInputNumberType["type"] |
  ILayoutType["type"] |
  IRadioType["type"] |
  IRadioButtonType["type"] |
  IRadioGroupType["type"] |
  ISelectType["type"] |
  ITextAreaType["type"] | 
  ISelectLoadingType["type"];