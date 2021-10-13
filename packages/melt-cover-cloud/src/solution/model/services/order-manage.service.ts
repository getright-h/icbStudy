import {
  OrderManageDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  QueryPaginOrderParams,
  QueryPaginOrderReturn,
  DataDetail,
  InputOrderParams
} from '../dto/order-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';

const GET_ORDER_LIST_PATH = 'order/manager/queryPaginOrder'; //查询订单列表
const ADD_ORDER_PATH = 'order/manager/inputOrder'; //新增订单
const GET_ORDER_DETAIL_PATH = 'order/manager/GetOrderById'; //订单详情
const GET_QUICK_ORDER_LIST_PATH = 'order/QueryQuickOrder'; //预创单订单列表
@DepUtil.Injectable()
export class OrderManageService extends OrderManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    throw new Error('Method not implemented.');
  }
  addOrder(params: ExampleRequestParam): Observable<void> {
    return this.requestService.post(ADD_ORDER_PATH, params);
  }
  getOrderList(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturn> {
    return this.requestService.post(GET_ORDER_LIST_PATH, params);
  }
  getOrderDetail(orderId: string): Observable<DataDetail> {
    return this.requestService.get(GET_ORDER_DETAIL_PATH, { orderId });
  }
  getQuickOrderList(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturn> {
    return this.requestService.post(GET_QUICK_ORDER_LIST_PATH, params);
  }
}
