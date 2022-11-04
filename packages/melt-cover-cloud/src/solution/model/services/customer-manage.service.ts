import {
  ChargeBalancePagedListData,
  ConsumePagedListData,
  CustomerManageDTO,
  PaginUserInfoData,
  QueryChargeBalancePagedListParams,
  QueryConsumePagedListParams,
  QueryDataListReturn,
  QueryPaginUserInfoParams,
  UserDetailsData
} from '../dto/customer-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const QUERY_PAGIN_USER_INFO = 'order/user/manager/QueryPaginUserInfo';
const GET_ORG_LIST = 'order/manager/GetOrgList';
const GET_EQUITY_GROUP_LIST = 'order/manager/GetEquityGroupList';
const QUERY_CONSUME_PAGED_LIST = 'equity/manage/queryConsumePagedList';
const QUERY_CHARGE_BALANCE_PAGED_LIST = 'equity/manage/queryChargeBalancePagedList';
const GET_USER_DETAILS = 'order/user/manager/GetUserDetails';
const GET_CHARGE_BALANCE = 'equity/manage/queryChargeBalance';
/** 导出 */
const EXPORT = 'equity/manage/exportConsumePagedList';

@DepUtil.Injectable()
export class CustomerManageService extends CustomerManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  queryCustomerList(params: QueryPaginUserInfoParams): Observable<QueryDataListReturn<PaginUserInfoData>> {
    return this.requestService.post(QUERY_PAGIN_USER_INFO, params);
  }
  /** 导出客户列表 */
  exportList(param: QueryPaginUserInfoParams): Observable<any> {
    return this.requestService.postDownload(EXPORT, param);
  }

  getOrgList(): Observable<{ id: string; name: string }[]> {
    return this.requestService.get(GET_ORG_LIST);
  }

  getEquityGroupList(): Observable<{ id: string; name: string }[]> {
    return this.requestService.get(GET_EQUITY_GROUP_LIST);
  }

  queryConsumePagedList(
    params: Partial<QueryConsumePagedListParams>
  ): Observable<QueryDataListReturn<ConsumePagedListData>> {
    return this.requestService.post(QUERY_CONSUME_PAGED_LIST, params);
  }

  queryChargeBalancePagedList(
    params: Partial<QueryChargeBalancePagedListParams>
  ): Observable<QueryDataListReturn<ChargeBalancePagedListData>> {
    return this.requestService.post(QUERY_CHARGE_BALANCE_PAGED_LIST, params);
  }

  getUserDetails(orderId: string): Observable<UserDetailsData> {
    return this.requestService.get(GET_USER_DETAILS, { orderId });
  }

  queryChargeBalance(orderId: string): Observable<number> {
    return this.requestService.get(GET_CHARGE_BALANCE, { orderId });
  }
}
