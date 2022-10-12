import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class OrderManageDTO {
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

export interface QueryPaginOrderReturn {
  dataList: Datum[];
  total: number;
  status: boolean;
  code: number;
  message: string;
  timestamp: string;
}
export interface GetShuangBaoServiceLetterByOrderIdResType {
  id: string;
  defaultUri: string;
  resultUri: string;
  createTime: string;
}
export interface QueryPaginOrderReturnList {
  dataList: QueryPaginShuangBaoOrderResType[];
  total: number;
  status: boolean;
  code: number;
  message: string;
  timestamp: string;
}
export interface QueryPaginShuangBaoOrderResType {
  id: string;
  agreedServiceProvider: string;
  agreedServiceProviderId: string;
  businessType: string;
  businessTypeId: string;
  ownerType: number;
  documentType: number;
  identificationNumber: string;
  ownerName: string;
  ownerTelephone: string;
  maximumServicePeriod: number;
  driverName: string;
  driverTelephone: string;
  relationshipBetweenTheOwnerAndHimself: string;
  isTheVehicleOperated: boolean;
  ownerContactAddress: string;
  licensePlateNumber: string;
  engineNumber: string;
  frameNumber: string;
  model: string;
  vehicleConfiguration: string;
  displacement: string;
  variableSpeedType: string;
  pressurizationType: string;
  numberOfSeats: string;
  vehiclePurchaseDate: string;
  purchasePriceOfNewCar: string;
  purchaseServiceFee: string;
  serviceStartTime: string;
  serviceDeadline: string;
  billingClerk: string;
  billingClerkId: string;
  joiningVehicleMileage: string;
  whetherToPurchaseVehicleLossInsurance: string;
  paymentMethod: string;
  paymentVoucherNo: string;
  ownerCertificatePhoto: string;
  purchaseInvoice: string;
  paymentVoucher: string;
  attachPicturePackage: string;
  serviceLetter: string;
}

export interface Datum {
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
  price: number;
}

export interface QueryPaginOrderParams {
  orderIds: string[];
  ownerIds: string[];
  vehicleIds: string[];
  vhicleKeyWord: string;
  userKeyWord: string;
  distributorId: string;
  equityGroupId: string;
  status: number;
  beginTime: string;
  endTime: string;
  page: number;
  size: number;
}
export interface DataDetail {
  id: string;
  orderNumber: string;
  ownerId: string;
  certificateType: number;
  certificateFront: string;
  certificateNumber: string;
  reverseSideOfCertificate: string;
  distributorId: string;
  distributorName: string;
  equityGroupId: string;
  equityGroupName: string;
  equityGroupData: string;
  ownerName: string;
  ownerMobile: string;
  isNewVehicle: boolean;
  purchaseTime: string;
  ownerVinNo: string;
  vehicleId: string;
  ownerPlateNo: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  price: number;
  equityGroupPrice: number;
  isScatteredUser: boolean;
  remark: string;
  additionalImages: string;
  additionalImagesData: string[];
  currentImageTemplt: string;
  images: string;
  imagesDatas: ImagesData[];
  createTime: string;
  lastUpdateTime: string;
  status: number;
  otherTypeIsComplete: boolean;
  orderSource: number;
  salesmenName: string;
  salesmenId: string;
  ownerType: number;
  xiaoXiuActivationCheckRemark: string;
  payMethod: number;
  vehicleLicenseImage?: string;
  warrantyCertificate?: string;
}

interface ImagesData {
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

export interface InputOrderParams {
  certificateType: number;
  certificateFront: string;
  certificateNumber: string;
  reverseSideOfCertificate: string;
  distributorId: string;
  distributorName: string;
  equityGroupId: string;
  ownerName: string;
  ownerMobile: string;
  isNewVehicle: boolean;
  purchaseTime: string;
  ownerVinNo: string;
  ownerPlateNo: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  isScatteredUser: boolean;
  remark: string;
  currentImageTemplt: CurrentImageTemplt[];
  images: Image[];
  additionalImages: string[];
}

export interface Image {
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

export interface CurrentImageTemplt {
  id: string;
  title: string;
  url: string;
  describe: string;
  index: number;
  type: number;
  subType: number;
}

export interface GetShuangBaoOrderByIdResType {
  id: string;
  agreedServiceProvider: string;
  agreedServiceProviderId: string;
  businessType: string;
  businessTypeId: string;
  ownerType: number;
  documentType: number;
  identificationNumber: string;
  ownerName: string;
  ownerTelephone: string;
  maximumServicePeriod: number;
  driverName: string;
  driverTelephone: string;
  allographName: string;
  allographCard: string;
  relationshipBetweenTheOwnerAndHimself: string;
  isTheVehicleOperated: boolean;
  ownerContactAddress: string;
  licensePlateNumber: string;
  engineNumber: string;
  frameNumber: string;
  model: string;
  vehicleConfiguration: string;
  displacement: string;
  variableSpeedType: string;
  pressurizationType: string;
  numberOfSeats: string;
  vehiclePurchaseDate: string;
  purchasePriceOfNewCar: string;
  purchaseServiceFee: string;
  serviceStartTime: string;
  serviceDeadline: string;
  billingClerk: string;
  billingClerkId: string;
  joiningVehicleMileage: string;
  whetherToPurchaseVehicleLossInsurance: string;
  paymentMethod: string;
  paymentVoucherNo: string;
  remark: string;
  ownerCertificatePhoto: string;
  purchaseInvoice: string;
  paymentVoucher: string;
  attachPicturePackage: string;
  serviceLetter: string;
  dashboardImage: any;
  vehicleLicenseImage?: string;
  warrantyCertificate?: string;
}
