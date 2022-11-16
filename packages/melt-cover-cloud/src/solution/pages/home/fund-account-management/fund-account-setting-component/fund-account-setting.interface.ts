import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IFundAccountSettingState
 */
export enum ACTION_TYPE {
  /** 编辑 */
  DETAIL,
  /** 交易明细 */
  INFO,
  /** 冻结 */
  frozen,
  /** 解冻 */
  thaw,
  /** 卡卷管理 */
  card
}

export class IFundAccountSettingState {
  searchForm = {
    index: 1,
    size: 10
  };
  disableFooter = false;
  total: number;
  tableData: any = [];
  isLoading = false;
  visibleCreat = false;
  visibleEdit = false;
  isLoadingModal2: boolean;
  isLoadingModal3: boolean;
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
        key: 'bagSearch',
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
        key: 'bagState',
        formItemProps: {
          label: '状态'
        },
        props: {
          placeholder: '查看状态',
          options: [
            { label: '正常', value: 0 },
            { label: '冻结', value: 1 }
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
