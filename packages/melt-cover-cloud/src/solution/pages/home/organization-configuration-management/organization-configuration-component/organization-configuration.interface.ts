/**
 * @export state变量定义和初始化
 * @class IOrganizationConfigurationState
 */

import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { IStatusEquity } from '~/solution/shared/constant/select.const';

export class IOrganizationConfigurationState {}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '创建机构'
        },
        props: {
          placeholder: '请选择创建机构',
          allowClear: true,
          filterOption: false,
          options: [],
          showSearch: true
        }
      },
      {
        key: 'status',
        type: 'Select',
        formItemProps: {
          label: '启用状态'
        },
        props: {
          placeholder: '请选择启用状态',
          allowClear: true,
          options: IStatusEquity
        }
      },
      {
        key: 'dateRange',
        type: 'RangePicker',
        formItemProps: {
          label: '创建时间'
        },
        props: {
          allowClear: true
        }
      },
      {
        key: 'name',
        type: 'Input',
        formItemProps: {
          label: '套餐包名'
        },
        props: {
          placeholder: '请输入套餐包名',
          allowClear: true
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];
