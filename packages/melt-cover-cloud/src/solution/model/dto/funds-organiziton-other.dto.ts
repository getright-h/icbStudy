export abstract class FundsOrganizitonOtherDTO {}

// 账户钱包管理分页列表
// /api/currency/manage/currency/bag/pagedList
export interface PagedListReqType {
  index: number;
  size: number;
  bagSearch: string;
  state: number;
}

export interface LimitPagedListReqType {
  index: number;
  size: number;
  bagSearch: string;
  bagState: number;
  parentId: string;
}

export interface SimpleListReqType {
  index: number;
  size: number;
  name: string;
}

export interface SimpleListResType {
  id: string;
  businessId: string;
  name: string;
}
export interface LimitPagedListResType {
  id: string;
  distributorId: string;
  distributorName: string;
  createTime: string;
  unitCode: string;
  unitMobile: string;
  orderResidueWarnMoney: number;
  contactName: string;
  orderLimit: number;
  orderResidueMoney: number;
  orderResidueWarnState: number;
  orderResidueWarnStateTxt: string;
}

export interface PagedListResType {
  id: string;
  name: string;
  number: string;
  bagId: string;
  type: number;
  typeText: string;
  state: number;
  stateText: string;
  businessIds: string[];
  distributorId: string;
  balance: number;
  totalInCome: number;
  createTime: string;
}

export interface OrganizationPagedListResType {
  id: string;
  bagId: string;
  bagName: string;
  bagNumber: string;
  distributorId: string;
  distributorName: string;
  distributorNameChain: string;
  modifyTime: string;
  isLimit: number;
  isLimitTxt: string;
  isRelationDeductMoney: number;
  isRelationDeductMoneyTxt: string;
  isAllowSubDeductMoney: number;
  isAllowSubDeductMoneyTxt: string;
}

export interface LogPageListReqType {
  index: number;
  size: number;
  organizationSetId: string;
}

export interface SetOrganizationConfReqType {
  bagId: string;
  distributorId: string;
  cardSets: {
    businessId: string;
    isLimit: number;
    isAllowSubDeductMoney: number;
    organizationDeductMoneyLevel: number;
  }[];
}

export interface SetLimitReqType {
  cardSetLimits: CardSetLimit[];
  id: string;
}
export interface CardSetLimit {
  businessId: string;
  businessName: string;
  orderLimit: number;
  orderResidueWarnMoney: number;
}

export interface LogPageListResType {
  id: string;
  organizationSetId: string;
  distributorId: string;
  distributorName: string;
  orderLimit: number;
  orderResidueWarnMoney: number;
  createTime: string;
  createUserId: string;
  createUserName: string;
  oldContext: string;
}

export interface GetSubOrganizationResType {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
}

// 账户钱包筛选列表
//  /api/currency/manage/currency/bag/filtList
export interface FiltListReqType {
  index: number;
  size: number;
  bagSearch: string;
}

export interface BagFilterListResType {
  id: string;
  name: string;
  number: string;
  bagRelations: {
    businessId: string;
    businessName: string;
  }[];
}

// 充值
export interface AssetsRecordReqType {
  bagId: string;
  type: number;
  number: number;
  remark: string;
}

//充值记录管理分页列表
export interface RechargePagedListReqType {
  index: number;
  size: number;
  bagSearch: string;
  auditState: number;
}
export interface RechargePagedListResType {
  id: string;
  bagId: string;
  bagNumber: string;
  bagName: string;
  bagType: number;
  bagTypeText: string;
  totalInCome: number;
  balance: number;
  number: number;
  auditState: number;
  auditStateText: string;
  auditRemark: string;
  createTime: string;
  remark: string;
}

//   审核充值记录
export interface AuditReqType {
  recordId: string;
  auditState: number;
  auditRemark: string;
}

// 编辑充值记录
export interface EditReqType {
  id: string;
  type: number;
  number: number;
  remark: string;
}

// 新增账户钱包
export interface BagReqType {
  name: string;
  remark: string;
  state: number;
  businessIds: string[];
}

// 编辑账户钱包
export interface SetReqType {
  bagId: string;
  name: string;
}

// [其他订单管理-分页查询]订单管理分页列表
export interface OrderPagedListReqType {
  index: number;
  size: number;
  bagSearch: string;
  ownerSerach: string;
  vehicleSerach: string;
  ceateTimeBegin: number;
  ceateTimeEnd: number;
  equityGroupId: string;
  distributorId: string;
}

export interface OrderPagedListResType {
  id: string;
  orderNumber: string;
  bagId: string;
  bagNumber: string;
  bagName: string;
  distributorId: string;
  distributorName: string;
  ownerId: string;
  ownerName: string;
  ownerMobile: string;
  ownerVinNo: string;
  ownerPlateNo: string;
  remark: string;
  vehicleType: string;
  vehicleClass: string;
  price: number;
  equityGroupId: string;
  equityGroupName: string;
  equityGroupPrice: number;
  additionalImages: string;
  images: string;
  createTime: string;
  orderState: number;
  orderStateTxt: string;
  orderErrorMsg: string;
  orderWorkFlowLog: string;
  payType: number;
  payTypeText: string;
}

// [其他订单管理-订单明细查询]订单明细查询
export interface DetailReqType {
  id: string;
}

export interface DetailResType {
  id: string;
  orderNumber: string;
  bagId: string;
  bagNumber: string;
  bagName: string;
  distributorId: string;
  distributorName: string;
  ownerId: string;
  ownerName: string;
  ownerMobile: string;
  ownerVinNo: string;
  ownerPlateNo: string;
  remark: string;
  vehicleType: string;
  vehicleClass: string;
  price: number;
  equityGroupId: string;
  equityGroupName: string;
  equityGroupPrice: number;
  additionalImages: string;
  currentImageTemplt: string;
  images: string;
  createTime: string;
  orderState: number;
  orderStateTxt: string;
  orderErrorMsg: string;
  orderWorkFlowLog: string;
  payType: number;
  payTypeText: string;
  serviceTime: string;
}

// [资金账户设置-交易明细]资产明细记录分页列表
export interface DetailPagedListReqType {
  index: number;
  size: number;
  bagId: string;
  isInCome: boolean;
}

export interface DetailPagedListResType {
  isInCome: boolean;
  number: number;
  subjectName: string;
  remark: string;
  createTime: string;
  createUserName: string;
}

export interface BagDetailResType {
  bag: Bag;
  bagRelations: BagRelation[];
}
export interface BagRelation {
  id: string;
  bagRelationId: string;
  businessName: string;
  balance: number;
  businessId: string;
  totalInCome: number;
  state: number;
  stateText: string;
}
export interface Bag {
  id: string;
  name: string;
  number: string;
  channelId: string;
  type: number;
  state: number;
  distributorId: string;
  contactMobile: string;
  isDefault: boolean;
  updateTime: string;
  createTime: string;
  remark: string;
  balance: number;
  totalInCome: number;
  totalUnCome: number;
  distributorCode: string;
  distributorIdChain: string;
  distributorCodeChain: string;
  distributorLevel: number;
  distributorName: string;
  distributorNameChain: string;
}

export interface AssetsDetailResType {
  bagInfo: BagInfo;
  buyInfo: BuyInfo;
  auditInfo: AuditInfo;
}
export interface AuditInfo {
  auditState: number;
  auditStateText: string;
  auditRemark: string;
}
export interface BuyInfo {
  recordId: string;
  businessName: string;
  number: number;
  remark: string;
  createTime: string;
  payType: number;
  payTypeText: string;
  receiptImage: string;
  balance: number;
  totalInCome: number;
}
export interface BagInfo {
  name: string;
  number: string;
  balance: number;
  totalInCome: number;
}

export interface BagAssetsPagedListResType {
  isInCome: string;
  number: number;
  subjectName: string;
  businessName: string;
  remark: string;
  createTime: string;
  createUserName: string;
}

export interface OrganizationConfigDetailResType {
  bagId: string;
  bagName: string;
  distributorName: string;
  modifyTime: string;
  isLimit: number;
  isLimitTxt: string;
  businessIds: string[];
  businessNames: string[];
  cardSets: CardSet[];
}

export interface CardSet {
  businessId: string;
  businessName: string;
  isLimit: number;
  isAllowSubDeductMoney: number;
  organizationDeductMoneyLevel: number;
}

export interface LimitDetailResType {
  id: string;
  distributorName: string;
  createTime: string;
  createUserName: string;
  unitCode: string;
  unitMobile: string;
  contactName: string;
  cardOrderLimits: CardOrderLimit[];
}
export interface CardOrderLimit {
  businessId: string;
  businessName: string;
  balance: number;
  orderLimit: number;
  orderResidueWarnMoney: number;
  orderResidueWarnState: number;
  orderResidueWarnStateText: string;
}
