import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IRechargeFundsState
 */
export class IRechargeFundsState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
  isShowAccountRechange: boolean;
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
        key: '',
        formItemProps: {
          label: '输入搜索'
        },
        props: {
          placeholder: '输入账户名称/账户号',
          allowClear: true
        }
      },
      {
        type: 'Select',
        key: '',
        formItemProps: {
          label: '状态'
        },
        props: {
          placeholder: '查看状态',
          options: [],
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];
