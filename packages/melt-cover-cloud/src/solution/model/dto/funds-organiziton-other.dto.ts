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
  isLimit: number;
  isRelationDeductMoney: number;
  isAllowSubDeductMoney: number;
}

export interface SetLimitReqType {
  id: string;
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

export interface FiltListResType {
  id: string;
  name: string;
  number: string;
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
  id: string;
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
}

// 编辑账户钱包
export interface SetReqType {
  bagId: string;
  name: string;
}
