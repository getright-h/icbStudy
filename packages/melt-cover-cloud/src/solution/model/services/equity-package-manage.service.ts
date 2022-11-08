import {
  DataList,
  EquityListParams,
  EquityPackageManageDTO,
  EquityPagedListParams,
  ExampleRequestParam,
  ExampleResponseResult,
  GetSubOrganizationResType,
  IAddEquity,
  IAddEquityResult,
  InsertEquityGroupParams,
  IResponseEquityListResult,
  IResponseEquityListResultLeft,
  IResponseEquityResult
} from '../dto/equity-package-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */

const EXAMPLE_API_PATH = 'your-http-request-path';
const GET_EQUITY_PATH = 'equity/manage/equityList';
const ADD_EQUITY_PATH = 'equity/manage/insertEquity';
const CHANGE_EQUITY_PATH = 'equity/manage/updateEquity';
const DELETE_EQUITY_PATH = 'equity/manage/equity';
const GET_EQUITY_LIST_PATH = 'equity/manage/queryEquityGroupPagedList';
const ADD_EQUITY_PACKAGE_PATH = 'equity/manage/insertEquityGroup';
const UPDATE_EQUITY_PACKAGE_PATH = 'equity/manage/updateEquityGroup';
const DELETE_EQUITY_PACKAGE_PATH = 'equity/manage/equityGroup';
const GET_EQUITY_LIST_NO_PAGE_PATH = 'equity/manage/queryEquityGroupList';
const GET_EQUITY_PAGE_PATH = 'equity/manage/equityPagedList';
const dropDownEquityList = 'equity/manage/dropDownEquityList';
const GET_EQUITY_LIST_NO_PAGE_CHILD_PATH = 'equity/manage/dropDownEquityGroupList';
const GET_SUB_ORGANIZATION = 'equity/manage/GetOrgList'; //查找子级机构 (Web)

@DepUtil.Injectable()
export class EquityPackageManageService extends EquityPackageManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }
  getDropEquity(distributorId: string): Observable<IResponseEquityResult[]> {
    return this.requestService.post(dropDownEquityList, { distributorId });
  }
  getEquity(): Observable<IResponseEquityResult[]> {
    return this.requestService.post(GET_EQUITY_PATH, {});
  }
  getEquityPage(params: EquityListParams): Observable<IResponseEquityListResultLeft> {
    return this.requestService.post(GET_EQUITY_PAGE_PATH, params);
  }
  handleEquity(params: IAddEquity): Observable<IAddEquityResult> {
    return this.requestService.post(params.FEE_TYPE ? ADD_EQUITY_PATH : CHANGE_EQUITY_PATH, params);
  }
  deleteEquity(id: string): Observable<void> {
    return this.requestService.delete(DELETE_EQUITY_PATH, { id });
  }
  getEquityList(params: EquityPagedListParams): Observable<IResponseEquityListResult> {
    return this.requestService.post(GET_EQUITY_LIST_PATH, params);
  }
  handleEquityPackage(params: InsertEquityGroupParams): Observable<void> {
    return this.requestService.post(
      params.FEE_TYPE_PACKAGE ? ADD_EQUITY_PACKAGE_PATH : UPDATE_EQUITY_PACKAGE_PATH,
      params
    );
  }
  deleteEquityPackage(id: string): Observable<void> {
    return this.requestService.delete(DELETE_EQUITY_PACKAGE_PATH, { id });
  }
  getEquityNoPageList(params: EquityPagedListParams): Observable<DataList[]> {
    return this.requestService.post(GET_EQUITY_LIST_NO_PAGE_PATH, params);
  }
  getEquityNoPageChildList(params: EquityPagedListParams): Observable<DataList[]> {
    return this.requestService.post(GET_EQUITY_LIST_NO_PAGE_CHILD_PATH, params);
  }
  // 查找子级机构 (Web)
  getSubOrganization(params: { parentId: string; equityId?: string }): Observable<GetSubOrganizationResType[]> {
    return this.requestService.get(GET_SUB_ORGANIZATION, params);
  }
}
