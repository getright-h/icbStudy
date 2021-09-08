import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class CustomerManageDTO {}

export interface QueryPaginUserInfoParams {
  vhicleKeyWord: string;
  userKeyWord: string;
  distributorId: string;
  equityGroupId: string;
  beginTime: string;
  endTime: string;
  page: number;
  size: number;
}

export interface QueryConsumePagedListParams {
  orderId: string;
  owner: string;
  vehicle: string;
  status: number;
  distributorId: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryChargeBalancePagedListParams {
  orderId: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryDataListReturn<T> {
  dataList: T[];
  total: number;
}

export interface PaginUserInfoData {
  backToTheShopCount: number;
  id: string;
  equityGroupId: string;
  ownerName: string;
  ownerMobile: string;
  ownerVinNo: string;
  ownerPlateNo: string;
  equityGroupPrice: number;
  equityGroupName: string;
  equityGroupData: string;
  distributorId: string;
  distributorName: string;
  createTime: string;
  status: number;
  xiaoXiuStatus: number;
  xiaoXiuStatusStr: string;
  salesmenName: string;
  salesmenId: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  orderSource: number;
  orderSourceStr: string;
}

export interface ConsumePagedListData {
  id: string;
  verCode: string;
  orderRecordId: string;
  orderId: string;
  ownerId: string;
  ownerName: string;
  ownerMobile: string;
  ownerPlateNo: string;
  ownerVinNo: string;
  orderPrice: number;
  equityGroupId: string;
  equityGroupName: string;
  equityId: string;
  equityName: string;
  distributorId: string;
  distributorName: string;
  consumePrice: number;
  discountPrice: number;
  status: number;
  statusText: string;
  createTime: string;
  createTimeStamp: number;
  expirationTime: string;
  modifyId: string;
  modifyName: string;
  isNumber: boolean;
}

export interface ChargeBalancePagedListData {
  orderId: string;
  equityName: string;
  balanceNumber: number;
  expirationTime: string;
  usedNumber: number;
  totalNumber: number;
}

export interface UserDetailsData {
  certificateType: number;
  certificateFront: string;
  certificateNumber: string;
  reverseSideOfCertificate: string;
  additionalImages: string;
  images: string;
  vehicleImages: VehicleImage[];
  backToTheShopCount: number;
  id: string;
  equityGroupId: string;
  orderNumber: string;
  ownerName: string;
  ownerMobile: string;
  ownerVinNo: string;
  ownerPlateNo: string;
  equityGroupPrice: number;
  equityGroupName: string;
  equityGroupData: string;
  distributorId: string;
  distributorName: string;
  createTime: string;
  status: number;
  xiaoXiuStatus: number;
  xiaoXiuStatusStr: string;
  salesmenName: string;
  salesmenId: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  orderSource: number;
  orderSourceStr: string;
  price: number;
  purchaseTime: string;
}

interface VehicleImage {
  id: string;
  imageUrl: string;
  remark: string;
  index: number;
  correlationID: string;
  status: number;
  type: number;
  subType: number;
  title: string;
  describe: string;
  isDelete: boolean;
  createTime: string;
}
