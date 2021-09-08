import { CascaderFactory } from './cascader';
import { CheckBoxFactory } from './checkbox';
import { DatePickerFactory } from './date-picker';
import { InputFactory } from './input';
import { RadioFactory } from './radio';
import { SelectFactory } from './select';
import { UploadFactory } from './upload';

export default class FromComponents {
  static instance: any;
  public static getInstance(): FromComponents {
    if (!this.instance) {
      this.instance = new FromComponents();
    }
    return this.instance;
  }
  getInputComponents(type?: number) {
    return InputFactory.getInput(type);
  }
  getSelectComponents(type?: number) {
    return SelectFactory.getSelect(type);
  }
  getDatePickerComponents(type?: number) {
    return DatePickerFactory.getDatePicker(type);
  }
  getRadioComponents(type?: number) {
    return RadioFactory.getRadio(type);
  }
  getUploadComponents(type?: number) {
    return UploadFactory.getUpload(type);
  }
  getCheckboxComponents(type?: number) {
    return CheckBoxFactory.getCheckBox(type);
  }
  getCascaderComponents(type?: number) {
    return CascaderFactory.getCascader(type);
  }
}
