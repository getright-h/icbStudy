
import { CascaderProps } from "antd/lib/cascader";
import { CheckboxGroupProps, CheckboxProps } from "antd/lib/checkbox";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import { FormItemProps } from "antd/lib/form";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { RadioProps, RadioGroupProps } from "antd/lib/radio";
import { SelectProps } from "antd/lib/select";
import { IISelectLoadingProps } from "../i-select-loading-component/i-select-loading.interface";
import { IIUploadImgProps } from "../i-upload-img-component/i-upload-img.interface";

export interface IItemBase extends FormItemProps {
  options?: {
    update?: boolean,
    maxImgNumber?: number,
  };
  key?: string;
  hideForce?: boolean;
  disableRender?: boolean;
}

export type IStandardFormInputBase = IItemBase & {
  type: 'Input';
  componentEngine?: () => (props: InputProps | TextAreaProps) => JSX.Element;
  componentOptions: (InputProps | TextAreaProps) & {phone?:string;};
}

export type IStandardFormSelectBase = IItemBase & {
  type: 'Select';
  componentEngine?: () => (props: SelectProps<InputProps> | IISelectLoadingProps) => JSX.Element;
  componentOptions: SelectProps<InputProps> | IISelectLoadingProps;
}

export type IStandardFormDatePickerBase = IItemBase & {
  type: 'DatePicker';
  componentEngine?: () => (props: RangePickerProps | DatePickerProps) => JSX.Element;
  componentOptions: RangePickerProps | DatePickerProps;
}

export type IStandardRadioPickerBase = IItemBase & {
  type: 'Radio';
  componentEngine?: () => (props: RadioProps | RadioGroupProps) => JSX.Element;
  componentOptions: RadioProps | RadioGroupProps;
}

export type IStandardUploadBase = IItemBase & {
  type: 'Upload';
  componentEngine?: () => (props: IIUploadImgProps) => JSX.Element;
  componentOptions: IIUploadImgProps;
}

export type IStandardCheckboxBase = IItemBase & {
  type: 'Checkbox';
  componentEngine?: () => (props: CheckboxProps | CheckboxGroupProps) => JSX.Element;
  componentOptions: CheckboxProps | CheckboxGroupProps;
}

export type ICascaderBase = IItemBase & {
  type: 'Cascader';
  componentEngine?: () => (props: CascaderProps) => JSX.Element;
  componentOptions: CascaderProps;
}
export type IBaseFromUnion = IStandardFormInputBase | IStandardFormSelectBase | IStandardFormDatePickerBase | IStandardRadioPickerBase | IStandardUploadBase | IStandardCheckboxBase | ICascaderBase;
export type IBaseFromUnionArray = Array<IBaseFromUnion>;
export type IBaseFromUnionType = IStandardFormInputBase['type'] | IStandardFormSelectBase['type'] | IStandardFormDatePickerBase['type'] | IStandardRadioPickerBase['type'] | IStandardUploadBase['type'] | ICascaderBase['type'];