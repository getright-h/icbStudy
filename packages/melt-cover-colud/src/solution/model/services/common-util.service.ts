import {
  CommonUtilDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  GetCodeResult,
  GetUpLoadImageTemplateReturn,
  GetUpLoadImageTemplateReturnDatum,
  GetVehicleParam,
  GetVehicleResult,
  IOcrScanParams
} from '../dto/common-util.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';
const GET_VEHICLE_PATH = 'vehicleComponent/list/tree'; //级联查询车型
const GetUpLoadImageTemplate = 'Image/GetUpLoadImageTemplate'; //图片模板
const GetCodePATH = 'order/user/manager/SendCheckCodeByInputOrder';
const RoleInfoPath = 'prvilege/GetMyInfo'; //获取用户权限
const AddOrderOrgCanSelectPath = 'order/manager/GetInputOrderOrgList'; //新增订单获取机构并且支持可搜索功能
const OcrScanPath = 'OcrScan/OcrScan'; //图片识别接口
const CheckIsUploadVehicleImages = 'order/manager/CheckIsUploadVehicleImages'; //判断是否上传车身图

@DepUtil.Injectable()
export class CommonUtilService extends CommonUtilDTO {
  private readonly requestService: RequestService = new RequestService();
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }

  getVehicleTreeList(params: GetVehicleParam): Observable<GetVehicleResult> {
    return this.requestService.get(GET_VEHICLE_PATH, params);
  }
  GetUpLoadImageTemplate(imageType: number): Observable<GetUpLoadImageTemplateReturnDatum[]> {
    return this.requestService.get(GetUpLoadImageTemplate, { imageType, key: process.env.IMAGE_TEMPLATE_KEY });
  }
  getCode(phone: string): Observable<GetCodeResult> {
    return this.requestService.get(GetCodePATH, { phone });
  }
  getRoleInfo(): Observable<GetCodeResult> {
    return this.requestService.get(RoleInfoPath);
  }
  AddOrderOrgCanSelect(name?: string): Observable<{ id: string; name: string }[]> {
    return this.requestService.get(AddOrderOrgCanSelectPath, { name });
  }
  OcrScan(params: IOcrScanParams): Observable<any> {
    return this.requestService.get(OcrScanPath, params);
  }
  CheckIsUploadVehicleImages(params: { orgId: string; isNewVehicle: boolean }): Observable<boolean> {
    return this.requestService.post(CheckIsUploadVehicleImages, params);
  }
}
