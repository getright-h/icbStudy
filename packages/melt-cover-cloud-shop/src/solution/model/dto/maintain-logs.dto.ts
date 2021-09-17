import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class MaintainLogsDTO {
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
export interface BackgroundReqType {
  index: number;
  size: number;
  vehicleKeyWord: string;
  startTime: string;
  endTime: string;
  content: string;
  vehicleId: string;
  id: string;
}
export interface BackgroundResType {
  id: string;
  vehicle: Vehicle;
  currentMaintenanceMileage: number;
  nextMaintenanceMileage: number;
  currentMaintenanceTime: string;
  nextMaintenanceTime: string;
  contentRange: string[];
  remark: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
  fee: number;
}
export interface Vehicle {
  vehicleId: string;
  ownerMobile: string;
  vehiclePlateNumber: string;
  vehicleIdentificationNumber: string;
  ownerName: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  configId: string;
  configName: string;
  registerTime: string;
  mileage: number;
  distributorId: string;
  distributorName: string;
}
export interface ExportReqType {
  index: number;
  size: number;
  vehicleKeyWord: string;
  startTime: string;
  endTime: string;
  content: string;
  vehicleId: string;
  id: string;
}

export interface BackGroundReqType {
  distributorId: string;
  index: number;
  size: number;
  ownerMobile: string;
}

export interface BackGroundResType {
  vehicleId: string;
  ownerMobile: string;
  vehiclePlateNumber: string;
  vehicleIdentificationNumber: string;
  ownerName: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  configId: string;
  configName: string;
  registerTime: string;
  mileage: number;
  distributorId: string;
  distributorName: string;
}

export interface RecordReqType {
  vehicleId: string;
  currentMaintenanceMileage: number;
  nextMaintenanceMileage: number;
  currentMaintenanceTime: string;
  nextMaintenanceTime: string;
  contentRange: string[];
  remark: string;
  fee: number;
}

export interface DistributorReqType {
  index: number;
  size: number;
  distributorId: string;
  vehicleModel: string;
  startMileage: number;
  endMileage: number;
  ownerKeyWord: string;
  vehicleKeyWord: string;
  maintainStatus: number[];
}
