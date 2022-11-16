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
  SetLimitReqType,
  SetOrganizationConfReqType,
  SetReqType
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

const GET_SUB_ORGANIZATION = 'currency/manage/currency/organizationSet/getSubOrganization'; //[机构配置-左侧树形列表]查询子级组织结构

const ORGANIZATION_PAGED_LIST = 'currency/manage/currency/organizationSet/pagedList'; //[机构配置-右侧分页查询]机构设置管理分页列表

const LIMIT_PAGED_LIST = 'currency/manage/currency/organizationOrderLimit/pagedList'; //[出单额度设置-右侧分页查询]机构订单限制管理分页列表

const SET_LIMIT = 'currency/manage/currency/organizationOrderLimit/Set'; //[出单额度设置-设置额度]配置机构订单限制

const LOG_PAGE_LIST = 'currency/manage/currency/organizationOrderLimit/logPageList'; //[出单额度设置-日志]配置机构订单限制日志分页列表

const SET_ORGANIZATION_CONF = 'currency/manage/currency/organizationSet/Set'; //[机构配置-配置]配置机构设置

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
}
