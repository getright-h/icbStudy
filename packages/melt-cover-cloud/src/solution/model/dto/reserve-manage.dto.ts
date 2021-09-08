import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class ReserveManageDTO {
  // 你的抽象方法，具体在 Service 中实现
}

export interface AppointPagedListParams {
  ownerId: string;
  userValue: string;
  vehicleValue: string;
  beginTime: number;
  endTime: number;
  begin: number;
  end: number;
  type: number;
  distributorId: string;
  state: number;
  appSource: number;
  appointmentModel: number;
  index: number;
  size: number;
}

export interface AppointConfigListParams {
  autoConfig: string;
  distributorId: string;
  state: number;
  type: number;
  begin: number;
  end: number;
  index: number;
  size: number;
}

export interface PutAppointmentConfigParam {
  id: string;
  state: number;
  distributorId: string;
  distributorName: string;
  count: number;
  bitwise: number;
  space: AppointConfigSpaceContent[];
  autoConfig: boolean;
}

export interface SetAppointmentStateParams {
  id: string;
  state: number;
  // message: string;
  // modifyUserId: string;
  // modifyUserName: string;
  // modifyUserMobile: string;
  // operatorId: string;
  // operatorName: string;
  // operatorMobile: string;
}

export interface GetOrganizationsParam {
  typeId: string;
}

export interface ResponseListData<T> {
  dataList: T[];
  total: number;
}

export interface AppointPagedListData {
  vehicleVersionName: string;
  mileage: number;
  appSource: number;
  appointmentModel: number;
  id: string;
  ownerId: string;
  number: string;
  distributorId: string;
  longitude: number;
  latitude: number;
  distributorName: string;
  userName: string;
  userMobile: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleVin: string;
  beginTime: string;
  endTime: string;
  type: number;
  typeText: string;
  state: number;
  stateText: string;
  remark: string;
  creatorId: string;
  creatorName: string;
  modifyUserId: string;
  modifyUserName: string;
  totalAmount: number;
  repairAmount: number;
  unAmount: number;
  versionName: string;
  versionId: string;
  time: string;
  activityDesc: string;
  createTime: string;
}

export interface AppointConfigListData {
  spaceContent: AppointConfigSpaceContent[];
  bitwiseContent: string;
  stateContent: string;
  id: string;
  distributorId: string;
  count: number;
  bitwise: number;
  space: string;
  state: number;
  createTime: string;
  modifyTime: string;
  autoConfig: boolean;
  distributorName: string;
}

export interface AppointConfigSpaceContent {
  week: number;
  slot: string[];
  slots: AppointConfigSlot[];
}

export interface AppointConfigSlot {
  slot: string;
  totalAmount: number;
  discountAmount: number;
  discount: number;
  discountType: number;
}

export interface OrganizationData {
  isParentSelected: any;
  id: string;
  name: string;
}
