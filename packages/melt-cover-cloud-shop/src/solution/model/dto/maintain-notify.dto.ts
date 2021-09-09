import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class MaintainNotifyDTO {
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
  index?: number;
  size?: number;
  distributorId?: string;
  vehicleModel?: string;
  startMileage?: number;
  endMileage?: number;
  ownerKeyWord?: string;
  maintainStatus?: number[];
}

export interface BackgroundResType {
  vehicleId: string;
  vehicleIdentificationNumber: string;
  vehiclePlateNumber: string;
  ownerName: string;
  ownerMobile: string;
  vehicleMake: string;
  location: string;
  mileage: number;
  lastMaintainMileage: string;
  lastMaintainTime: string;
  nextMaintainMileage: string;
  nextMaintainTime: string;
  remindCount: number;
  followCount: number;
  maintainCount: number;
  maintainStatus: number;
  distributorId: string;
  distributorName: string;
}

export interface AdjustReqType {
  vehicleId: string;
  mileage: number;
}

export interface ExportReqType {
  index: number;
  size: number;
  distributorId: string;
  vehicleModel: string;
  startMileage: number;
  endMileage: number;
  ownerKeyWord: string;
  maintainStatus: number[];
}

export interface RemindReqType {
  vehicleId: string;
  remark: string;
  message: string;
  remindType: number;
}

export interface BatchRemindReqType {
  vehicleId: string[];
  remark: string;
  message: string;
  remindType: number;
}
export interface FollowReqType {
  vehicleId: string;
  remark: string;
  type: number;
}
export interface MaintainRemindListReqType {
  vehicleId: string;
  index: number;
  size: number;
}
export interface MaintainRemindListResType {
  id: string;
  vehicleId: string;
  message: string;
  remindType: number;
  remindTypeDesc: string;
  remark: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
}
export interface MaintainFollowListReqType {
  vehicleId: string;
  index: number;
  size: number;
}
export interface MaintainFollowListResType {
  id: string;
  vehicleId: string;
  type: number;
  typeDesc: string;
  remark: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
}

export interface MaintainProjectReq {
  distributorId: string;
}

export interface BackGroundReqType {
  distributorId: string;
  item: string;
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

export interface DistributorResType {
  vehicleId: string;
  vehicleIdentificationNumber: string;
  vehiclePlateNumber: string;
  ownerName: string;
  ownerMobile: string;
  vehicleMake: string;
  location: string;
  mileage: number;
  lastMaintainMileage: string;
  lastMaintainTime: string;
  nextMaintainMileage: string;
  nextMaintainTime: string;
  remindCount: number;
  followCount: number;
  maintainCount: number;
  maintainStatus: number;
  distributorId: string;
  distributorName: string;
}

export interface ExportDistributorReqType {
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
