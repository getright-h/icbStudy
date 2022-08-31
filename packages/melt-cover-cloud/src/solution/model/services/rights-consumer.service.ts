import { AuditVoucherReq, RightsConsumerDTO, UploadVoucherReq, WriteOffReq } from '../dto/rights-consumer.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

const uery_Consume_Paged_List = 'equity/manage/queryConsumePagedList'; //用户权益消费分页列表
const detail_Consume = 'equity/manage/detailConsume'; //用户权益消费详情
const set_Verification = 'equity/manage/setVerification'; // 核销操作
const GET_ORG_LIST = 'order/manager/GetOrgList';
const Export_ConsumeList = 'equity/manage/exportConsumeList'; // 导出

/** 双保模块接口 */
/** 双保权益消费列表 */
const DOUBLE_RIGHTS_LIST = 'equity/manage/queryShuangBaoConsumePagedList';
/** 双保核销 */
const WRITE_OFF_DOUBLE = 'equity/manage/shuangBaoSetVerification';
/** 双保上传凭证 */
const UPLOAD_VOUCHER = 'equity/manage/addConsumeVoucher';
/** 双保审核 */
const AUDIT_VOUCHER = 'equity/manage/VoucherCheck';
/** 双保编辑凭证 */
const EDIT_VOUCHER = 'equity/manage/editConsumeVoucher';
/** 导出双保权益消费列表 */
const EXPORT_DOUBLE_RIGHTS = 'equity/manage/exportShuangBaoConsumeList';

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
  /** 权益消费详情 */
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

  /** 双保模块 */
  /** 双保权益消费列表 */
  postDoubleRightsList(params: any): Observable<any> {
    return this.requestService.post(DOUBLE_RIGHTS_LIST, params);
  }
  /** 双保核销操作 */
  writeOffDouble(params: WriteOffReq): Observable<any> {
    return this.requestService.get(WRITE_OFF_DOUBLE, params);
  }
  /** 双保权益消费上传凭证 */
  uploadVoucher(params: UploadVoucherReq): Observable<any> {
    return this.requestService.post(UPLOAD_VOUCHER, params);
  }
  /** 双保权益消费审核凭证 */
  auditVoucher(params: AuditVoucherReq): Observable<any> {
    return this.requestService.post(AUDIT_VOUCHER, params);
  }
  /** 双保权益消费编辑凭证 */
  editVoucher(params: UploadVoucherReq): Observable<any> {
    return this.requestService.post(EDIT_VOUCHER, params);
  }
  /** 导出双保权益消费列表 */
  exportDoubleList(params: any): Observable<any> {
    return this.requestService.postDownload(EXPORT_DOUBLE_RIGHTS, params);
  }
}
