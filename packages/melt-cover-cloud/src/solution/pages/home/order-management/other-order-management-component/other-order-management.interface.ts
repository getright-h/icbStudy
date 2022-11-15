import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IOtherOrderManagement IOtherOrderManagement
 */
export class IOtherOrderManagement {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
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
        key: 'vehicleSerach',
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
        key: 'ownerSerach',
        formItemProps: {
          label: '用户信息'
        },
        props: {
          placeholder: '电话或姓名',
          allowClear: true
        }
      },
      {
        type: 'ISelectDistributor',
        key: 'distributorId',
        formItemProps: {
          label: '所属机构'
        }
      },
      {
        type: 'ISelectEquityGroup',
        key: 'equityGroupId',
        formItemProps: {
          label: '购买套餐包'
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
      },
      {
        type: 'Input',
        key: 'bagSearch',
        formItemProps: {
          label: '账户'
        },
        props: {
          placeholder: '搜索账户名, 账号',
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
