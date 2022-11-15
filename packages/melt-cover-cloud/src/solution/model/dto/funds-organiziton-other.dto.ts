export abstract class FundsOrganizitonOtherDTO {}

// 账户钱包管理分页列表
// /api/currency/manage/currency/bag/pagedList
export interface PagedListReqType {
  index: number;
  size: number;
  bagSearch: string;
  state: number;
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
