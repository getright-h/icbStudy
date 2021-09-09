import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class CommonUtilDTO {
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

export interface GetVehicleParam {
  parentId?: string;
  key?: string;
  bitwise?: string;
  page: number;
  size: number;
}

export interface GetVehicleResult {
  data: GetVehicleResultData[];
  total: number;
}

export interface GetVehicleResultData {
  isLeaf: boolean;
  parentId: string;
  number: string;
  type: number;
  name: string;
  logo: string;
  platformId: number;
  directive: string;
  id: string;
  bitwise: number;
  state: number;
  createTime: string;
}

export interface GetUpLoadImageTemplateReturn {
  data: GetUpLoadImageTemplateReturnDatum[];
  status: boolean;
  code: number;
  message: string;
  timestamp: string;
}

export interface GetUpLoadImageTemplateReturnDatum {
  require: boolean;
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

export interface GetCodeResult {
  message: string;
  requestId: string;
  bizId: string;
  code: string;
}

// 图片ocr识别请求参数

export interface IOcrScanParams {
  path: string;
  type: number;
}
