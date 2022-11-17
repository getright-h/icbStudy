import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { DataList, IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
import { AssetsDetailResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { AssetAuditOptions } from '~/solution/shared/constant/currency.const';
import { OrgData } from '../../equity-management/equity-package-manage-component/equity-package-manage.interface';

/**
 * @export state变量定义和初始化
 * @class IFundAccountSettingState
 */

export enum ACTION_TYPE {
  /** 详情 */
  DETAIL,
  /** 充值审核 */
  EXAMINE,
  /** 修改充值 */
  UPDATE,
  /** 卡券充值 */
  Recharge,
  /** 导出 */
  Export
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
      },
      {
        type: 'Select',
        key: 'auditState',
        formItemProps: {
          label: '审核'
        },
        props: {
          placeholder: '查看审核',
          options: AssetAuditOptions,
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

export class IRechargeFundsState {
  info: AssetsDetailResType;
  auditId: string;
  visibleCreat = false;
  visibleAudit = false;
  visibleEditAudit = false;
  visibleDetail = false;
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
