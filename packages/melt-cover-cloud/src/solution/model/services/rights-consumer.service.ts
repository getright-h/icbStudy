import { RightsConsumerDTO, ExampleRequestParam, ExampleResponseResult } from '../dto/rights-consumer.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const uery_Consume_Paged_List = 'equity/manage/queryConsumePagedList'; //用户权益消费分页列表
const detail_Consume = 'equity/manage/detailConsume'; //用户权益消费详情
const set_Verification = 'equity/manage/setVerification'; // 核销操作
const GET_ORG_LIST = 'order/manager/GetOrgList';
const Export_ConsumeList = 'equity/manage/exportConsumeList'; // 导出
@DepUtil.Injectable()
export class RightsConsumerService extends RightsConsumerDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryConsumePagedList(params: any): Observable<any> {
    return this.requestService.post(uery_Consume_Paged_List, params);
  }

  getDetailConsume(params: any): Observable<any> {
    return this.requestService.get(detail_Consume, params);
  }

  setVerification(params: any): Observable<any> {
    return this.requestService.get(set_Verification, params);
  }
  getOrgList(): Observable<{ id: string; name: string }[]> {
    return this.requestService.get(GET_ORG_LIST);
  }

  exportConsumeList(params: any): Observable<any> {
    return this.requestService.postDownload(Export_ConsumeList, params);
  }
}
