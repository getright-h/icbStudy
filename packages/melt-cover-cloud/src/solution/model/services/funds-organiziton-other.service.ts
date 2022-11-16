import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { RequestService } from '~/framework/util/base-http/request.service';
import {
  AssetsRecordReqType,
  AuditReqType,
  BagReqType,
  EditReqType,
  FiltListReqType,
  FiltListResType,
  FundsOrganizitonOtherDTO,
  PagedListReqType,
  PagedListResType,
  RechargePagedListReqType,
  RechargePagedListResType,
  SetReqType,
  OrderPagedListReqType,
  OrderPagedListResType,
  DetailReqType,
  DetailResType,
  DetailPagedListReqType,
  DetailPagedListResType
} from '../dto/funds-organiziton-other.dto';

//
const PAGED_LIST = 'currency/manage/currency/bag/pagedList'; //账户钱包管理分页列表
const FILT_LIST = 'currency/manage/currency/bag/filtList'; //账户钱包筛选列表

const ASSETS_RECORD = 'currency/manage/currency/assetsRecord'; //充值

const RECHARGE_PAGED_LIST = 'currency/manage/currency/assetsRecord/pagedList'; //充值记录管理分页列表

const AUDIT = 'currency/manage/currency/assetsRecord/audit'; //审核充值记录

const EDIT = 'currency/manage/currency/assetsRecord/edit'; //编辑充值记录

const BAG = 'currency/manage/currency/bag'; //新增账户钱包

const SET = 'currency/manage/currency/bag/set'; //编辑账户钱包

const ORDER_PAGED_LIST = 'currency/manage/currency/order/pagedList'; //[其他订单管理-分页查询]订单管理分页列表

const DETAIL = 'currency/manage/currency/order/detail'; //[其他订单管理-订单明细查询]订单明细查询

const DETAIL_PAGED_LIST = 'currency/manage/currency/assetsRecord/detailPagedList'; //[资金账户设置-交易明细]资产明细记录分页列表
@DepUtil.Injectable()
export class FundsOrganizitonOtherService extends FundsOrganizitonOtherDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }
  // 账户钱包管理分页列表
  pagedList = (params: PagedListReqType): Observable<{ total: number; dataList: PagedListResType[] }> => {
    return this.requestService.post(PAGED_LIST, params);
  };

  // 账户钱包筛选列表
  filtList(params: FiltListReqType): Observable<{ total: number; dataList: FiltListResType[] }> {
    return this.requestService.post(FILT_LIST, params);
  }

  // 充值
  assetsRecord(params: AssetsRecordReqType): Observable<{}> {
    return this.requestService.post(ASSETS_RECORD, params);
  }

  // 充值记录管理分页列表
  rechargePagedList(
    params: RechargePagedListReqType
  ): Observable<{ total: number; dataList: RechargePagedListResType[] }> {
    return this.requestService.post(RECHARGE_PAGED_LIST, params);
  }

  // 审核充值记录
  audit(params: AuditReqType): Observable<{}> {
    return this.requestService.post(AUDIT, params);
  }

  // 编辑充值记录
  edit(params: EditReqType): Observable<{}> {
    return this.requestService.post(EDIT, params);
  }

  // 新增账户钱包
  bag(params: BagReqType): Observable<{}> {
    return this.requestService.post(BAG, params);
  }

  // 编辑账户钱包
  set(params: SetReqType): Observable<{}> {
    return this.requestService.post(SET, params);
  }
  // [其他订单管理-分页查询]订单管理分页列表
  orderPagedList(params: OrderPagedListReqType): Observable<{ total: number; dataList: OrderPagedListResType[] }> {
    return this.requestService.post(ORDER_PAGED_LIST, params);
  }

  // [其他订单管理-订单明细查询]订单明细查询
  detail(params: DetailReqType): Observable<DetailResType> {
    return this.requestService.post(DETAIL, params);
  }

  // [资金账户设置-交易明细]资产明细记录分页列表
  detailPagedList(params: DetailPagedListReqType): Observable<{ total: number; dataList: DetailPagedListResType[] }> {
    return this.requestService.post(DETAIL_PAGED_LIST, params);
  }
}
