import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { RequestService } from '~/framework/util/base-http/request.service';
import {
  AssetsRecordReqType,
  AuditReqType,
  BagReqType,
  EditReqType,
  FiltListReqType,
  FundsOrganizitonOtherDTO,
  GetSubOrganizationResType,
  LimitPagedListReqType,
  LimitPagedListResType,
  LogPageListReqType,
  LogPageListResType,
  OrganizationPagedListResType,
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
  DetailPagedListResType,
  SetLimitReqType,
  SetOrganizationConfReqType,
  SimpleListReqType,
  SimpleListResType,
  BagDetailResType,
  AssetsDetailResType,
  BagAssetsPagedListResType,
  OrganizationConfigDetailResType,
  LimitDetailResType,
  BagFilterListResType
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

const ASSETS_DETAIL = 'currency/manage/currency/assetsRecord/detail'; //[资金充值-详情]详情

const GET_SUB_ORGANIZATION = 'currency/manage/currency/organizationSet/getSubOrganization'; //[机构配置-左侧树形列表]查询子级组织结构

const ORGANIZATION_PAGED_LIST = 'currency/manage/currency/organizationSet/pagedList'; //[机构配置-右侧分页查询]机构设置管理分页列表

const LIMIT_PAGED_LIST = 'currency/manage/currency/organizationOrderLimit/pagedList'; //[出单额度设置-右侧分页查询]机构订单限制管理分页列表

const SET_LIMIT = 'currency/manage/currency/organizationOrderLimit/Set'; //[出单额度设置-设置额度]配置机构订单限制

const DETAIL_LIMIT = 'currency/manage/currency/organizationOrderLimit/detail'; //[出单额度设置-详情]详情

const LOG_PAGE_LIST = 'currency/manage/currency/organizationOrderLimit/logPageList'; //[出单额度设置-日志]配置机构订单限制日志分页列表

const SET_ORGANIZATION_CONF = 'currency/manage/currency/organizationSet/Set'; //[机构配置-配置]配置机构设置

const SIMPLE_LIST = 'currency/manage/currency/simpleList'; //卡券基本信息分页列表（平台）

const SET_BAG_STATE = 'currency/manage/currency/bag/setBagState'; //[资金账户设置-冻结]冻结解冻钱包

const SET_BAG_RELATION_STATE = 'currency/manage/currency/bag/setBagRelationState'; //[资金账户设置-冻结]冻结解冻钱包关联的卡券

const BAG_DETAIL = 'currency/manage/currency/bag/bagDetail'; //[资金账户设置-账户详情] 账户详情

const BAG_ASSETS_PAGED_LIST = 'currency/manage/currency/bag/bagAssetsPagedList'; //[资金账户设置-交易明细]资产明细记录分页列表

const JG_CONFIG_DETAIL = 'currency/manage/currency/organizationSet/detail'; //[机构配置-配置详情]配置详情

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
  filtList = (params: FiltListReqType): Observable<{ total: number; dataList: BagFilterListResType[] }> => {
    return this.requestService.post(FILT_LIST, params);
  };

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
  // [机构配置-左侧树形列表]查询子级组织结构
  getSubOrganization(params: { parentId: string }): Observable<GetSubOrganizationResType> {
    return this.requestService.get(GET_SUB_ORGANIZATION, params);
  }

  // [机构配置-右侧分页查询]机构设置管理分页列表
  organizationPagedList = (
    params: PagedListReqType
  ): Observable<{ total: number; dataList: OrganizationPagedListResType[] }> => {
    return this.requestService.post(ORGANIZATION_PAGED_LIST, params);
  };

  // [出单额度设置-右侧分页查询]机构订单限制管理分页列表
  orderLimitPagedList = (
    params: LimitPagedListReqType
  ): Observable<{ total: number; dataList: LimitPagedListResType[] }> => {
    return this.requestService.post(LIMIT_PAGED_LIST, params);
  };

  // [出单额度设置-设置额度]配置机构订单限制
  setLimit(params: SetLimitReqType): Observable<{}> {
    return this.requestService.post(SET_LIMIT, params);
  }

  // [出单额度设置-日志]配置机构订单限制日志分页列表
  logPageList = (params: LogPageListReqType): Observable<{ total: number; dataList: LogPageListResType[] }> => {
    return this.requestService.post(LOG_PAGE_LIST, params);
  };

  // [机构配置-配置]配置机构设置
  setOrganizationConf(params: SetOrganizationConfReqType): Observable<{}> {
    return this.requestService.post(SET_ORGANIZATION_CONF, params);
  }

  // 卡券基本信息分页列表（平台）
  cardSimpleList = (params: SimpleListReqType): Observable<{ total: number; dataList: SimpleListResType[] }> => {
    return this.requestService.post(SIMPLE_LIST, params);
  };

  // [资金账户设置-冻结]冻结解冻钱包
  setBagState(params: { bagId: string; state: number }): Observable<{}> {
    return this.requestService.post(SET_BAG_STATE, params);
  }

  // [资金账户设置-冻结]冻结解冻钱包关联的卡券
  setBagRelationState(params: { bagRelationId: string; state: number }): Observable<{}> {
    return this.requestService.post(SET_BAG_RELATION_STATE, params);
  }

  // [资金账户设置-账户详情] 账户详情
  bagDetail(params: { bagId: string }): Observable<BagDetailResType> {
    return this.requestService.post(BAG_DETAIL, params);
  }

  // [资金充值-详情]详情
  assetsDetail(params: { recordId: string }): Observable<AssetsDetailResType> {
    return this.requestService.post(ASSETS_DETAIL, params);
  }

  // [资金账户设置-交易明细]资产明细记录分页列表
  bagAssetsPagedList = (params: {
    index: number;
    size: number;
    bagId: string;
    isInCome: boolean;
  }): Observable<{ total: number; dataList: BagAssetsPagedListResType[] }> => {
    return this.requestService.post(BAG_ASSETS_PAGED_LIST, params);
  };

  // [机构配置-配置详情]配置详情
  organizationConfigDetail(params: { id: string }): Observable<OrganizationConfigDetailResType> {
    return this.requestService.post(JG_CONFIG_DETAIL, params);
  }

  // [出单额度设置-详情]详情
  limitDetail(params: { id: string }): Observable<LimitDetailResType> {
    return this.requestService.post(DETAIL_LIMIT, params);
  }
}
