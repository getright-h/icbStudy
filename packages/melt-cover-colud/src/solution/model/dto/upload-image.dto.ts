export abstract class UploadImageDTO {
  // 获取工单列表数据
  abstract uploadImage(params: any): any;
}

export interface OssToken {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  region: string;
  bucket: string;
}
