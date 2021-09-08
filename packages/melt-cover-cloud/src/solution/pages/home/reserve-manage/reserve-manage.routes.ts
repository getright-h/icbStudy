import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/reserve';
export const reserveManageRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/reserveList`,
    component: ROUTERS.reserveList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/reserveSettings`,
    component: ROUTERS.reserveSettings,
    lazyload: true,
    exact: true
  }
];
