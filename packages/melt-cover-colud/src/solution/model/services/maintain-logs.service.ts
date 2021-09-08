import {
  MaintainLogsDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  BackgroundResType,
  BackgroundReqType,
  ExportReqType,
  BackGroundReqType,
  BackGroundResType
} from '../dto/maintain-logs.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';
const BACKGROUND = 'maintain/Record/Query/Background'; //平台获取保养记录列表
const EXPORT = 'maintain/Record/Query/Background/Export'; //导出平台获取保养记录列表
const BACK_GROUND = 'maintain/User/VehicleList/BackGround'; //平台获取用户名下车辆
@DepUtil.Injectable()
export class MaintainLogsService extends MaintainLogsDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }
  // 平台获取保养记录列表
  background(params: BackgroundReqType): Observable<{ total: number; dataList: BackgroundResType[] }> {
    return this.requestService.post(BACKGROUND, params);
  }
  // 导出平台获取保养记录列表
  export(params: ExportReqType): Observable<{}> {
    return this.requestService.postDownload(EXPORT, params);
  }
  // 平台获取用户名下车辆
  backGround(params: BackGroundReqType): Observable<{ total: number; dataList: BackGroundResType[] }> {
    return this.requestService.post(BACK_GROUND, params);
  }
}
