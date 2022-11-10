import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { DataList, IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
import { IStatusEquity } from '~/solution/shared/constant/select.const';

/**
 * @export state变量定义和初始化
 * @class IEquityPackageManageState
 */
export class IOrganizationConfigurationState {
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

/** 机构数据类型 */
export type OrgData = {
  id?: string;
  value?: string;
  name?: string;
  label?: string;
  isLeaf: boolean;
  isSelect?: boolean;
  children?: OrgData[];
};

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'distributorId',
        type: 'Input',
        formItemProps: {
          label: '创建机构'
        },
        props: {
          placeholder: '输入账户名称/组织代码'
        }
      },
      {
        key: 'status',
        type: 'Select',
        formItemProps: {
          label: '预警状态'
        },
        props: {
          options: [{ label: '正常' }, { label: '预警' }]
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];
