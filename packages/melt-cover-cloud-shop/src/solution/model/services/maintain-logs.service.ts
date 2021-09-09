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
import { DistributorReqType, DistributorResType } from '../dto/maintain-notify.dto';
import useFetch from '~/framework/hooks/useFetch';
import useMutation from '~/framework/hooks/useMutation';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';
const BACKGROUND = 'maintain/Record/Query/Background'; //平台获取保养记录列表
const EXPORT = 'maintain/Record/Query/Background/Export'; //导出平台导出保养记录列表
const BACK_GROUND = 'maintain/User/VehicleList/BackGround'; //平台获取用户名下车辆
const DISTRIBUTOR = 'maintain/Record/Query/Distributor'; //经销商获取保养记录列表
const EXPORTDISTRIBUTOR = 'maintain/Record/Query/Distributor/Export'; //经销商平台导出保养记录列表
const DISTRIBUTOR_GROUND = 'maintain/User/VehicleList/Distributor'; //经销商获取用户名下车辆
const DISTRIBUTOR_CUSTOM_ITEM = 'maintain/Record/Content/Query/Distributor'; // 经销商获取自定义保养项目
const INSERT_CUSTOM_ITEM = 'maintain/Record/Content/Insert/Distributor'; // 经销商新增自定义保养项目

//经销商获取保养记录列表
export function usePostDistributor(params?: DistributorReqType) {
  const { refetch, data, isLoading, currParams } = useMutation({
    method: 'post',
    url: DISTRIBUTOR,
    params: {
      index: 1,
      size: 10,
      ...params
    }
  });
  const maintainLogData = {
    tableData: data?.dataList,
    index: currParams?.index,
    size: currParams?.size,
    total: data?.total
  };
  return { refetch, maintainLogData, isLoading, currParams };
}
//经销商平台导出保养记录列表
export function useExportLog(params?: DistributorReqType) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'postDownload',
      url: EXPORTDISTRIBUTOR,
      params,
      message: '导出保养记录'
    },
    false
  );
  return { refetch, isLoading };
}
//经销商获取用户名下车辆
export function useGetVehicle(params?: BackGroundReqType) {
  const { refetch, data } = useMutation(
    {
      method: 'post',
      url: DISTRIBUTOR_GROUND,
      params: {
        index: 1,
        size: 10,
        ...params
      }
    },
    false
  );
  const options = data?.dataList.map((org: any) => {
    return {
      label: org.vehiclePlateNumber,
      value: org.vehicleId
    };
  });
  return { refetch, options };
}
// 经销商获取自定义保养项目
export function useDistributorCustomItem(params?: { distributorId: string }) {
  const { refetch, data } = useFetch({
    method: 'post',
    url: DISTRIBUTOR_CUSTOM_ITEM,
    params
  });
  return { data, refetch };
}
// 经销商新增自定义保养项目
export function useInsertCustomItem(params?: { item: string }) {
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
  // 经销商获取保养记录列表
  distributor(params: DistributorReqType): Observable<{ total: number; dataList: DistributorResType[] }> {
    return this.requestService.post(DISTRIBUTOR, params);
  }
  // 经销商平台获取保养记录列表
  exportdistributor(params: ExportReqType): Observable<{}> {
    return this.requestService.postDownload(EXPORTDISTRIBUTOR, params);
  }
  // 经销商获取用户名下车辆
  backGrounddistributor(params: BackGroundReqType): Observable<{ total: number; dataList: BackGroundResType[] }> {
    return this.requestService.post(DISTRIBUTOR_GROUND, params);
  }
}
