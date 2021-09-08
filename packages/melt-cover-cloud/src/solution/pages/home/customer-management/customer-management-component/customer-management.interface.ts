import { PaginUserInfoData } from '~/solution/model/dto/customer-manage.dto';
import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class ICustomerManagementState
 */
export class ICustomerManagementState {
  searchForm = {
    page: 1,
    size: 10
  };
  total: number;
  tableData: PaginUserInfoData[] = [];
  isLoading = false;
}

export enum ActionType {
  DETAIL,
  EDIT
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        type: 'Input',
        key: 'vhicleKeyWord',
        formItemProps: {
          label: '车辆信息'
        },
        props: {
          placeholder: '请输入车牌号/车架号',
          allowClear: true
        }
      },
      {
        type: 'Input',
        key: 'userKeyWord',
        formItemProps: {
          label: '用户信息'
        },
        props: {
          placeholder: '电话姓名',
          allowClear: true
        }
      },
      {
        type: 'Select',
        key: 'distributorId',
        formItemProps: {
          label: '所属机构'
        },
        props: {
          placeholder: '查看所属机构',
          options: [],
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      },
      {
        type: 'RangePicker',
        key: 'time',
        formItemProps: {
          label: '创建日期'
        },
        props: {
          allowClear: true
        }
      },
      {
        type: 'Select',
        key: 'equityGroupId',
        formItemProps: {
          label: '购买套餐包'
        },
        props: {
          placeholder: '请选择套餐包',
          options: [],
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];
