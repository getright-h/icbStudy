import { IRoute } from '~framework/interfaces/IRoute';
import { ROUTERS } from '~/solution/shared/constant/routers.const';
const MODULE_PATH = 'home/';
export const homeRoutes: IRoute[] = [
  {
    path: `${MODULE_PATH}customerManagement/customerManagementList`,
    component: ROUTERS.customerManagement,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/orderManagementList`,
    component: ROUTERS.orderManagementList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/orderManagementDoubleList`,
    component: ROUTERS.orderManagementDoubleList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/addOrder`,
    component: ROUTERS.addOrder,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/otherOrderManagement`,
    component: ROUTERS.otherOrderManagement,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}reserve`,
    component: ROUTERS.reserveManageModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}customerManagement/customerManagementDetail/:id`,
    component: ROUTERS.customerManagementDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/orderDetail`,
    component: ROUTERS.orderDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/orderOtherDetail`,
    component: ROUTERS.orderOtherDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}orderManagement/orderDoubleDetail`,
    component: ROUTERS.orderDoubleDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}equityManagement/equityPackageManage`,
    component: ROUTERS.equityPackageManage,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}equityManagement/rightsConsumerList`,
    component: ROUTERS.rightsConsumerList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}maintain`,
    component: ROUTERS.maintainModule,
    lazyload: true
  },
  {
    path: `${MODULE_PATH}preOrderManagement/preOrderList`,
    component: ROUTERS.preOrderList,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}equityManagement/rightsListOfDouble`,
    component: ROUTERS.rightsListOfDouble,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}fundAccoutManagement/fundAccountSetting`,
    component: ROUTERS.fundAccountSetting,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}fundAccoutManagement/fundAccountSetting/fundDetail/:id`,
    component: ROUTERS.fundDetail,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}fundAccoutManagement/rechargeFunds`,
    component: ROUTERS.rechargeFunds,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}organizationConfigurationManagment/organizationConfiguration`,
    component: ROUTERS.organizationConfiguration,
    lazyload: true,
    exact: true
  },
  {
    path: `${MODULE_PATH}organizationConfigurationManagment/orderLimitSetting`,
    component: ROUTERS.orderLimitSetting,
    lazyload: true,
    exact: true
  }
];
