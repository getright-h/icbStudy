import {
  MaintainNotifyDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  BackgroundReqType,
  BackgroundResType,
  AdjustReqType,
  RemindReqType,
  BatchRemindReqType,
  FollowReqType,
  MaintainRemindListReqType,
  MaintainRemindListResType,
  MaintainFollowListReqType,
  MaintainFollowListResType,
  BackGroundReqType,
  RecordReqType,
  DistributorReqType,
  DistributorResType,
  ExportDistributorReqType
} from '../dto/maintain-notify.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import useFetch from '~/framework/hooks/useFetch';
import useMutation from '~/framework/hooks/useMutation';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';
const BACKGROUND = 'maintain/Maintain/Query/Background'; //平台获取保养列表
const ADJUST = 'maintain/Maintain/Adjust'; //校正
const EXPORT = 'maintain/Maintain/Query/Background/Export'; //导出平台获取保养列表
const REMIND = 'maintain/Maintain/Remind'; //保养提醒
const BATCH_REMIND = 'maintain/Maintain/BatchRemind'; //批量提醒
const FOLLOW = 'maintain/Maintain/Follow'; //保养跟进
const MAINTAIN_REMIND_LIST = 'maintain/Maintain/MaintainRemindList'; //获取提醒记录
const MAINTAIN_FOLLOW_LIST = 'maintain/Maintain/MaintainFollowList'; //获取跟进记录
const MAINTAIN_PROJECT_LIST = 'maintain/Record/Content/Query/BackGround'; //获取保养项目列表
const BACK_GROUND = 'maintain/Record/Content/Insert/BackGround'; //平台新增自定义记录项目
const RECORD = 'maintain/Maintain/Record'; //保养登记
const DISTRIBUTOR = 'maintain/Maintain/Query/Distributor'; //经销商获取保养列表
const EXPORTDISTRIBUTOR = 'maintain/Maintain/Query/Distributor/Export'; //导出经销商获取保养列表
const MAINTAIN_PROJECT_LIST_DISTRIBUTOR = 'maintain/Record/Content/Query/Distributor'; //经销商获取自定义保养项目
const DISTRIBUTORINSERT = 'maintain/Record/Content/Insert/Distributor'; //经销商新增自定义记录项

@DepUtil.Injectable()
export class MaintainNotifyService extends MaintainNotifyDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }
  // 平台获取保养列表
  background(
    params: BackgroundReqType
  ): Observable<{ total: number; dataList: BackgroundResType[]; soonAccount: number; overTimeAccount: number }> {
    return this.requestService.post(BACKGROUND, params);
  }
  // 校正
  adjust(params: AdjustReqType): Observable<{}> {
    return this.requestService.post(ADJUST, params);
  }

  // 导出平台获取保养列表
  export(params: BackgroundReqType): Observable<{}> {
    return this.requestService.postDownload(EXPORT, params);
  }

  // 保养提醒
  remind(params: RemindReqType): Observable<{}> {
    return this.requestService.post(REMIND, params);
  }

  // 批量提醒
  batchRemind(params: BatchRemindReqType): Observable<{}> {
    return this.requestService.post(BATCH_REMIND, params);
  }

  // 保养跟进
  follow(params: FollowReqType): Observable<{}> {
    return this.requestService.post(FOLLOW, params);
  }
  // 获取提醒记录
  maintainRemindList(
    params: MaintainRemindListReqType
  ): Observable<{ total: number; dataList: MaintainRemindListResType[] }> {
    return this.requestService.post(MAINTAIN_REMIND_LIST, params);
  }
  // 获取跟进记录
  maintainFollowList(
    params: MaintainFollowListReqType
  ): Observable<{ total: number; dataList: MaintainFollowListResType[] }> {
    return this.requestService.post(MAINTAIN_FOLLOW_LIST, params);
  }
  // 平台获取保养项目列表
  maintainGetProjectList(distributorId?: string): Observable<string[]> {
    return this.requestService.post(MAINTAIN_PROJECT_LIST, { distributorId });
  }
  // 平台新增自定义记录项
  backGround(params: BackGroundReqType): Observable<{}> {
    return this.requestService.post(BACK_GROUND, params);
  }
  // 保养登记
  record(params: RecordReqType): Observable<{}> {
    return this.requestService.post(RECORD, params);
  }
  // 经销商获取保养列表
  distributor(
    params: DistributorReqType
  ): Observable<{ total: number; dataList: DistributorResType[]; soonAccount: number; overTimeAccount: number }> {
    return this.requestService.post(DISTRIBUTOR, params);
  }
  // 导出经销商获取保养列表
  exportDistributor(params: ExportDistributorReqType): Observable<{}> {
    return this.requestService.postDownload(EXPORTDISTRIBUTOR, params);
  }
  // 经销商获取保养项目
  maintainGetProjectListDistributor(distributorId?: string): Observable<string[]> {
    return this.requestService.post(MAINTAIN_PROJECT_LIST_DISTRIBUTOR, { distributorId });
  }
  // 经销商新增自定义记录项
  distributorInsert(params: BackGroundReqType): Observable<{}> {
    return this.requestService.post(DISTRIBUTORINSERT, params);
  }
}
