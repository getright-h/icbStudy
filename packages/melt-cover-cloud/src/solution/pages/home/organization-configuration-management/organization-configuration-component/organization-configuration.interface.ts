import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { DataList, IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
import { IStatusEquity } from '~/solution/shared/constant/select.const';

/**
 * @export state变量定义和初始化
 * @class IEquityPackageManageState
 */
export class IOrganizationConfigState {}

export const visibleList = {
  settingVisible: false
};

export enum ACTION_TYPE {
  SETTING
}

export enum BAG_STATE_ENUM {
  /** 正常 */
  normal = 0,
  /** 冻结 */
  frozen = 1,
  /** 预警 */
  warn = 2
}

export const BagStateOptions = [
  { label: '正常', value: BAG_STATE_ENUM.normal, color: 'green' },
  { label: '冻结', value: BAG_STATE_ENUM.frozen, color: 'blue' },
  { label: '预警', value: BAG_STATE_ENUM.warn, color: 'orange' }
];

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'bagSearch',
        type: 'Input',
        formItemProps: {
          label: '账户'
        },
        props: {
          allowClear: true,
          placeholder: '请输入账户名称/账户号'
        }
      },
      {
        key: 'bagState',
        type: 'Select',
        formItemProps: {
          label: '状态'
        },
        props: {
          allowClear: true,
          placeholder: '请选择状态',
          options: BagStateOptions
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];
