import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IOrderManagementListState
 */
export class IOrderManagementListState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
  charterList: any[] = [];
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
      },
      {
        type: 'RangePicker',
        key: 'dateRange',
        formItemProps: {
          label: '订单日期'
        },
        props: {
          allowClear: true
        }
      }
    ],
    props: {
      cols: 3
    }
  }
  // {
  //   type: 'Select',
  //   key: 'status',
  //   label: '状态',
  //   componentEngine: () => FromComponents.getInstance().getSelectComponents(),
  //   componentOptions: {
  //     placeholder: '请选择状态',
  //     allowClear: true
  //   }
  // }
  // {
  //   type: 'Select',
  //   key: 'package',
  //   label: '状态',
  //   componentEngine: () => FromComponents.getInstance().getSelectComponents(),
  //   componentOptions: {
  //     placeholder: '请选择状态',
  //     allowClear: true
  //   }
  // }
];
