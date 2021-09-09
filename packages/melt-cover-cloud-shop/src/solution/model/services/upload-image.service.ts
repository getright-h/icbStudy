import { RequestService } from '~/framework/util/base-http/request.service';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { DepUtil } from '~/framework/aop/inject';

const UPLOAD_IMAGE = 'DistributedFileManagerPlugin/FormUploadFiles';
const UPLOAD_VEDIO = 'http://zxb-ossfile-bucket.oss-cn-chengdu.aliyuncs.com';
const OSS_TOKEN = 'Image/aliyun/GetAlySTSToken';

export class UploadImageService extends UploadImageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  uploadImage(fileParams: any) {
    return this.requestService.post(UPLOAD_IMAGE, fileParams);
  }
  uploadVedio(fileParams: any) {
    return this.requestService.post(UPLOAD_VEDIO, fileParams);
  }
  getOssToken() {
    return this.requestService.get(OSS_TOKEN);
  }
}
