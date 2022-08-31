export abstract class RightsConsumerDTO {
  // 你的抽象方法，具体在 Service 中实现
  // abstract example(params: any): Observable<any>;
}

export interface WriteOffReq {
  verCode: string;
  id?: string;
}

export interface UploadVoucherReq {
  equityConsumeRecordId: string;
  voucherFileDtos: PicList[];
}

export interface PicList {
  fileName: string;
  filePath: string;
  fileSuffix: string;
  id?: string;
}

export interface AuditVoucherReq {
  equityConsumeRecordId: string;
  isPass: boolean;
  remark?: string;
}
