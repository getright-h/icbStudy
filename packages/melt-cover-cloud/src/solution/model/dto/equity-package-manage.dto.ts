import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class EquityPackageManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract example(params: ExampleRequestParam): Observable<ExampleResponseResult>;
}

// 示例 Dto
export interface ExampleRequestParam {
  // 示例参数
  exampleParam1: string;
  exampleParam2: string;
  exampleParam3: string;
  exampleParam4: string;
}

// 响应 Dto
export interface ExampleResponseResult {
  data: any;
  status: boolean;
}

export interface IResponseEquityListResult {
  dataList: DataList[];
  index: number;
  size: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
export interface DataList {
  value?: string;
  label?: string;
  id: string;
  distributorId: string;
  distributorName: string;
  price: number;
  name: string;
  status: number;
  statusText: string;
  belonging: number;
  belongingText: string;
  createTime: string;
  createTimeStamp: number;
  customPrice: boolean;
  equityList: EquityList[];
  payMethods: number[];
}

export interface EquityList {
  id: string;
  equityId: string;
  equityGroupId: string;
  name: string;
  proportion: number;
  number: number;
  month: number;
  path: string;
  isProportion: boolean;
  isNumber: boolean;
  isH5Path: boolean;
  isSmallPath: boolean;
  type: number;
  createTime: string;
  createTimeStamp: number;
}
export interface EquityPagedListParams {
  name?: string;
  distributorId?: string;
  status?: number;
  index?: number;
  size?: number;
  beginTime?: number;
  endTime?: number;
  isTest?: boolean;
}
export interface IResponseEquityResult {
  price: string;
  disabled: boolean;
  disable: boolean;
  belonging: number;
  id: string;
  name: string;
  typeConfig: number;
  typeConfigText: string;
  type: number;
  equityTypeText: string;
  profile: string;
  description: string;
  distributorId: string;
  distributorName: string;
  icon: string;
  remark: string;
  createTime: string;
  createTimeStamp: number;
  status: number;
  statusText: string;
  isProportion: boolean;
  isNumber: boolean;
  isH5Path: boolean;
  isSmallPath: boolean;
  isParentSelected?: boolean;
  key?: string;
  label?: string;
  value?: string;
  oilSubsidy?: string;
}

export interface IAddEquity {
  name: string;
  typeConfig: number;
  type?: number;
  profile: string;
  description: string;
  icon: string;
  remark: string;
  status?: number;
  isProportion?: boolean;
  isNumber?: boolean;
  isH5Path?: boolean;
  isSmallPath?: boolean;
  FEE_TYPE?: boolean;
}

export interface IAddEquityResult {
  status: boolean;
  code: number;
  message: string;
  timestamp: string;
}

export interface InsertEquityGroupParams {
  isCheckAccount: boolean;
  id?: string;
  distributorId: string;
  distributorName: string;
  price: number;
  name: string;
  status: number;
  equityList: EquityListPackage[];
  FEE_TYPE_PACKAGE?: boolean;
  equityId: string;
}

export interface EquityListPackage {
  oilSubsidy: string;
  id: string;
  equityId: string;
  name: string;
  proportion: number;
  number: number;
  month: number;
  isProportion: boolean;
  isNumber: boolean;
  isH5Path: boolean;
  isSmallPath: boolean;
  path: string;
}

export interface EquityListParams {
  equityId?: string;
  name?: string;
  distributorId?: string;
  distributorName?: string;
  isAllEquity?: true;
  index: number;
  size: number;
  beginTime?: number;
  endTime?: number;
}
export interface IResponseEquityListResultLeft {
  dataList: IResponseEquityResult[];
  index: number;
  size: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
export interface GetSubOrganizationResType {
  id: string;
  name: string;
  isHasChildOrganization?: boolean;
  isSelect: boolean;
  isLeaf?: boolean;
  pos?: string;
  children?: GetSubOrganizationResType[];
}

// 改动 权益包详情 接口
export interface DetailGroupReqType {
  id: string;
}
export interface DetailGroupResType {
  id: string;
  distributorId: string;
  distributorName: string;
  price: number;
  customPrice: boolean;
  name: string;
  desc: string;
  status: number;
  statusText: string;
  belonging: number;
  belongingText: string;
  createTime: string;
  createTimeStamp: number;
  isEdit: boolean;
  isTest: boolean;
  isCheckAccount: boolean;
  equityList: EquityList[];
  zhiMaGoEquityGroupRelationship: ZhiMaGoEquityGroupRelationship;
  payMethods: number[];
  payMethodsStr: string;
  associatedCardAndCoupon: string;
}
export interface ZhiMaGoEquityGroupRelationship {
  id: string;
  zhiMaGoTempleteId: string;
  equityGroupId: string;
  isNecessaryZhiMaGo: boolean;
  zhiMaGoDiscount: number;
  createTime: string;
  lastUpdateTime: string;
}
export interface EquityList {
  id: string;
  equityId: string;
  equityGroupId: string;
  name: string;
  proportion: number;
  number: number;
  oilSubsidy: number;
  month: number;
  path: string;
  isProportion: boolean;
  isNumber: boolean;
  isH5Path: boolean;
  isSmallPath: boolean;
  type: number;
  createTime: string;
  createTimeStamp: number;
}
