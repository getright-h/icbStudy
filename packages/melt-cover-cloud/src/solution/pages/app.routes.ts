import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
import home from '~/solution/pages/home/home.module';
export const appRoutes: IRoute[] = [
  {
    path: 'home',
    component: home
  },
  {
    path: '',
    component: ROUTERS.login,
    lazyload: true
  }
];
