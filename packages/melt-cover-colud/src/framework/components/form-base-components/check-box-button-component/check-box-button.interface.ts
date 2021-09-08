import { CheckboxOptionType } from 'antd/lib/checkbox';
/**
 * @export state变量定义和初始化
 * @class ICheckBoxButtonState
 */
export class ICheckBoxButtonState {
  options: (string | CheckboxOptionType)[];
  values = new Map();
}
