import { GetRoleMenuHttpRes, HomeDTO, MenuAndAuthResult, MenuRequestParam, MyInfo } from '../dto/home.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
const GetRoleMenuHttp = 'prvilege/common/menuTreeLogin';
const GET_MY_INFO = 'prvilege/GetMyInfo';
/**
 * 真实开发中，请将示例代码移除
 */

@DepUtil.Injectable()
export class HomeService extends HomeDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  // 获取登录用户信息
  getMyInfo(): Observable<MyInfo> {
    return this.requestService.get(GET_MY_INFO);
  }

  // 获取菜单权限
  getMenuList(params: MenuRequestParam): Observable<GetRoleMenuHttpRes[]> {
    return this.requestService.post(GetRoleMenuHttp, params);
  }
}
