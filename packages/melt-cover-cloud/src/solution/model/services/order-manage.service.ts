import {
  OrderManageDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  QueryPaginOrderParams,
  QueryPaginOrderReturn,
  DataDetail,
  InputOrderParams,
  QueryPaginOrderReturnList,
  GetShuangBaoServiceLetterByOrderIdResType,
  GetShuangBaoOrderByIdResType,
  CharterListRes
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
// 双保订单
const GET_ORDER_DOUBLE_LIST_PATH = 'order/manager/QueryPaginShuangBaoOrder'; //查询订单列表
const GET_ORDER_DOUBLE_IMAGE = 'order/manager/GetShuangBaoServiceLetterByOrderId'; //下载服务函图片
const GET_ORDER_DOUBLE_DETAIL = 'order/manager/GetShuangBaoOrderById'; //查询详情
/** 获取包含服务章程的集合 */
const GET_DOUBLE_CONSTITUTION = 'double/constitution';

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
  getOrderList(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturnList> {
    return this.requestService.post(GET_ORDER_LIST_PATH, params);
  }
  // 双保订单
  getNewOrderList(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturn> {
    return this.requestService.post(GET_ORDER_DOUBLE_LIST_PATH, params);
  }
  // 下载服务函
  downImage(orderId: string): Observable<GetShuangBaoServiceLetterByOrderIdResType[]> {
    return this.requestService.get(GET_ORDER_DOUBLE_IMAGE, { orderId });
  }

  getNewOrderImage(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturn> {
    return this.requestService.get(GET_ORDER_DOUBLE_LIST_PATH, params);
  }
  getOrderDetail(orderId: string): Observable<DataDetail> {
    return this.requestService.get(GET_ORDER_DETAIL_PATH, { orderId });
  }
  getOrderDoubleDetail(id: string): Observable<GetShuangBaoOrderByIdResType> {
    return this.requestService.get(GET_ORDER_DOUBLE_DETAIL, { id });
  }
  getQuickOrderList(params: QueryPaginOrderParams): Observable<QueryPaginOrderReturn> {
    return this.requestService.post(GET_QUICK_ORDER_LIST_PATH, params);
  }
  getDoubleConstitution(productId?: string): Observable<CharterListRes> {
    return this.requestService.get(GET_DOUBLE_CONSTITUTION, { productId });
  }
}
