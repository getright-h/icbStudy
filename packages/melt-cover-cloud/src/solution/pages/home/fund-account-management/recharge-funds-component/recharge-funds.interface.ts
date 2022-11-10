import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IFundAccountSettingState
 */

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

export class IRechargeFundsState {
  visibleCreat = false;
  visibleAudit = false;
  visibleEditAudit = false;
  searchForm = {
    index: 1,
    size: 10
  };
  searchFormEquity = {
    index: 1,
    size: 10
  };
  total: number;
  totalEquity: number;
  isLoading = false;
  tableData: any = [];
  tableDataEquityList: IResponseEquityResult[];
  isLoadingEquity = false;
  visible = false;
  visibleAddPackage = false;
  equityList: IResponseEquityResult[];
  equityTitle = '添加权益';
  equityPackageTitle = '添加权益包';
  disableFooter = false;
  isLoadingModal1 = false;
  isLoadingModal2 = false;
  isBelonging = true;
  currentEquity: IResponseEquityResult;
  orgOptions: any = [];
  orgCanOptions: any = [];
  equityDropList: (IResponseEquityResult & { disabled?: boolean })[];
  isParentSelected = false;
  detail: DataList;
  /** 下级机构选择框数据 */
  treeData: OrgData[] = [];
}
