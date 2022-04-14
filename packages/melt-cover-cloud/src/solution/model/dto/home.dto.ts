import { Observable } from 'rxjs';
import { IMenu } from '~/framework/components/menu-component/menu.interface';

export abstract class HomeDTO {}

// 获取菜单权限
export interface MenuAndAuthResult {
  data: IMenu[];
}

export interface MyInfo {
  id: string;
  systemId: string;
  systemCode: string;
}

export interface GetRoleMenuHttpRes {
  bindUrl: string;
  menuName: string;
}

export interface MenuRequestParam {
  systemId: string;
  roleIdList: Array<string>;
}
