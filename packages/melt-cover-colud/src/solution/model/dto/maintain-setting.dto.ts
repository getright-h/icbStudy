import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class MaintainSettingDTO {}

// 品牌模糊res
export interface QueryVehicleBrandResType {
  key: string;
  title: string;
  items: Item[];
}
export interface Item {
  key: string;
  value: string;
  text: string;
  code: string;
  type: number;
  name: string;
  title: string;
}

// 搜索厂商res
export interface QueryVehicleFactoryResType {
  key: string;
  value: string;
  text: string;
  code: string;
  type: number;
  name: string;
  title: string;
}
// 搜索车系res
export interface QueryVehicleVersionResType {
  key: string;
  value: string;
  text: string;
  code: string;
  type: number;
  name: string;
  title: string;
}
// 搜索车型配置res
export interface QueryVehicleConfigResType {
  key: string;
  value: string;
  text: string;
  code: string;
  type: number;
  name: string;
  title: string;
}

// 获取保养配置模板
export interface QueryReqType {
  id?: string;
  index: number;
  size: number;
  distributorId?: string;
  brandId?: string;
  factoryId?: string;
  versionId?: string;
  configId?: string;
}
export interface QueryResType {
  id: string;
  mileageInterval: number;
  timeInterval: number;
  firstMaintainMileage: number;
  firstMaintainTime: number;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  configId: string;
  configName: string;
  lastUpdateTime: string;
  createTime: string;
  assurancePeriod: number;
  remindMonth: number;
  remindMileage: number;
}
// 新增配置模板
export interface InsertReqType {
  mileageInterval: number;
  timeInterval: number;
  firstMaintainMileage: number;
  firstMaintainTime: number;
  brandId: string;
  brandName: string;
  factoryId?: string;
  factoryName?: string;
  versionId?: string;
  versionName?: string;
  configId?: string;
  configName?: string;
  assurancePeriod?: number;
  remindMonth?: number;
  remindMileage?: number;
}
// 编辑配置模板
export interface EditReqType {
  id: string;
  mileageInterval: number;
  timeInterval: number;
  firstMaintainMileage: number;
  firstMaintainTime: number;
  brandId: string;
  brandName: string;
  factoryId?: string;
  factoryName?: string;
  versionId?: string;
  versionName?: string;
  configId?: string;
  configName?: string;
  assurancePeriod?: number;
  remindMonth?: number;
  remindMileage?: number;
}
