import { Checkbox, DatePicker, Input, Radio, Select, Switch, TimePicker, TreeSelect, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import CheckBoxButtonComponent from './check-box-button-component/check-box-button.component';
import { LayoutComponent } from './layout';
import SelectLoadingComponent from './ISelectLoadingComponent/i-select-loading.component';
const { RangePicker } = DatePicker;

export const IENUMCOMPONENTS = {
  RadioButton: Radio.Button,
  RadioGroup: Radio.Group,
  Radio: Radio,
  Select: Select,
  TextArea: TextArea,
  Checkbox: Checkbox,
  CheckboxGroup: Checkbox.Group,
  CheckboxButton: CheckBoxButtonComponent,
  DatePicker: DatePicker,
  RangePicker: RangePicker,
  Input: Input,
  InputNumber: InputNumber,
  Layout: LayoutComponent,
  SelectLoading: SelectLoadingComponent,
  Switch: Switch,
  TimePicker: TimePicker,
  TreeSelect: TreeSelect
};
