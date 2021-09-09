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
import useFetch from '~/framework/hooks/useFetch';
import useMutation from '~/framework/hooks/useMutation';

/**
 * 真实开发中，请将示例代码移除
 */

// 经销商新增自定义保养项目
export function useInsertCustomItem(params?: { item: string; distributorId: string }) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'post',
      url: INSERT_CUSTOM_ITEM,
      params,
      message: '新增保养项目'
    },
    false
  );
  return { refetch, isLoading };
}

const EXAMPLE_API_PATH = 'your-http-request-path';
const BACKGROUND = 'maintain/Record/Query/Background'; //平台获取保养记录列表
const EXPORT = 'maintain/Record/Query/Background/Export'; //导出平台获取保养记录列表
const BACK_GROUND = 'maintain/User/VehicleList/BackGround'; //平台获取用户名下车辆
const INSERT_CUSTOM_ITEM = 'maintain/Record/Content/Insert/BackGround'; // 平台新增自定义保养项目
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
