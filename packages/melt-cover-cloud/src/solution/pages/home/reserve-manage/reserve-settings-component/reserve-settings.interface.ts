import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { AppointAutoConst, AppointmentTypeConst } from '~/solution/shared/enums/reserve.enum';

/**
 * @export state变量定义和初始化
 * @class IReserveSettingsState
 */
export class IReserveSettingsState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
  isSettingVisible = false;
}

export enum ActionType {
  EDIT,
  DELETE
}

/**
 * @exports 表单组件配置
 */
export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '经销商'
        },
        props: {
          placeholder: '请选择机构',
          allowClear: true,
          filterOption: false,
          options: [],
          showSearch: true
        }
      },
      {
        key: 'type',
        type: 'Select',
        formItemProps: {
          label: '预约类别'
        },
        props: {
          placeholder: '请选择预约类别',
          allowClear: true,
          filterOption: false,
          options: AppointmentTypeConst,
          showSearch: true
        }
      },
      {
        key: 'autoConfig',
        type: 'Select',
        formItemProps: {
          label: '自动确认'
        },
        props: {
          placeholder: '请选择自动确认类型',
          allowClear: true,
          filterOption: false,
          options: AppointAutoConst,
          showSearch: true
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];
