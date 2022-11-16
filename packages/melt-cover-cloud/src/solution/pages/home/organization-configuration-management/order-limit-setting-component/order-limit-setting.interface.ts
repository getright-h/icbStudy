import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { DataList, IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
import { IStatusEquity } from '~/solution/shared/constant/select.const';

/**
 * @export state变量定义和初始化
 * @class IEquityPackageManageState
 */
export class IOrderLimitSettingState {}

export enum ACTION_TYPE {
  SETTING,
  DETAIL,
  LOG
}

export const visibleList = {
  settingVisible: false,
  detailVisible: false,
  logVisible: false
};

export enum WARN_ENUM {
  normal = 1,
  warn = 0
}

export const WarnOptions = [
  { label: '正常', value: WARN_ENUM.normal, color: 'green' },
  { label: '预警', value: WARN_ENUM.warn, color: 'red' }
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
          label: '创建机构'
        },
        props: {
          allowClear: true,
          placeholder: '输入账户名称/组织代码'
        }
      },
      {
        key: 'orderResidueWarnState',
        type: 'Select',
        formItemProps: {
          label: '预警状态'
        },
        props: {
          allowClear: true,
          placeholder: '请选择预警状态',
          options: WarnOptions
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];
