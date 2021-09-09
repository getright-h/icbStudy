import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '@/solution/shared/constant/routers.const';

const MODULE_PATH = 'home/maintain';
export const maintainRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}/maintainNotifyList`,
    component: ROUTERS.maintainNotifyList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/maintainLogsList`,
    component: ROUTERS.maintainLogsList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}/maintainSetting`,
    component: ROUTERS.maintainSetting,
    lazyload: true,
    exact: true
  }
];
