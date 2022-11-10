import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IFundAccountSettingState
 */
export class IFundAccountSettingState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
  visibleCreat = false;
  visibleEdit = false;
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
        key: 'foo',
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
        key: 'foo',
        formItemProps: {
          label: '状态'
        },
        props: {
          placeholder: '查看状态',
          options: [
            { label: '正常', value: 1 },
            { label: '冻结', value: 2 }
          ],
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
