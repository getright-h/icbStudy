export const ROUTERS = {
  login: () => import('~/solution/pages/login/login.module'),
  home: () => import('~/solution/pages/home/home.module'),
  demo: () => import('~/solution/pages/home/demo-component/demo.component'),
  reduxHooks: () => import('~/solution/pages/home/hooks-redux-component/hooks-redux.component'),
  customerManagement: () =>
    import('~/solution/pages/home/customer-management/customer-management-component/customer-management.component'),
  orderManagementList: () =>
    import('~/solution/pages/home/order-management/order-management-list-component/order-management-list.component'),
  orderManagementDoubleList: () =>
    import(
      '~/solution/pages/home/order-management/order-management-double-list-component/order-management-list.component'
    ),
  addOrder: () => import('~/solution/pages/home/order-management/add-order-component/add-order.component'),
  rightsConsumerList: () =>
    import('~/solution/pages/home/rights-consumer/rights-consumer-list-component/rights-consumer-list.component'),
  reserveManageModule: () => import('~/solution/pages/home/reserve-manage/reserve-manage.module'),
  reserveList: () => import('~/solution/pages/home/reserve-manage/reserve-list-component/reserve-list.component'),
  reserveSettings: () =>
    import('~/solution/pages/home/reserve-manage/reserve-settings-component/reserve-settings.component'),
  customerManagementDetail: () =>
    import(
      '~/solution/pages/home/customer-management/customer-management-detail-component/customer-management-detail.component'
    ),
  orderDetail: () => import('~/solution/pages/home/order-management/order-detail-component/order-detail.component'),
  orderDoubleDetail: () =>
    import('~/solution/pages/home/order-management/order-double-detail-component/order-detail.component'),
  orderOtherDetail: () =>
    import('~/solution/pages/home/order-management/order-other-detail-component/order-detail.component'),
  equityPackageManage: () =>
    import('~/solution/pages/home/equity-management/equity-package-manage-component/equity-package-manage.component'),
  maintainModule: () => import('~/solution/pages/home/maintain-manage/maintain.module'),
  maintainNotifyList: () =>
    import('~/solution/pages/home/maintain-manage/maintain-notify-list-component/maintain-notify-list.component'),
  maintainSetting: () =>
    import('~/solution/pages/home/maintain-manage/maintain-setting-component/maintain-setting.component'),
  maintainLogsList: () =>
    import('~/solution/pages/home/maintain-manage/maintain-logs-list-component/maintain-logs-list.component'),
  preOrderList: () =>
    import('~/solution/pages/home/pre-order-management/pre-order-list-component/pre-order-list.component'),
  rightsListOfDouble: () =>
    import('~/solution/pages/home/rights-consumer/rights-list-of-double-component/rights-list-of-double.component'),
  fundAccountSetting: () =>
    import(
      '~/solution/pages/home/fund-account-management/fund-account-setting-component/fund-account-setting.component'
    ),
  fundDetail: () =>
    import(
      '~/solution/pages/home/fund-account-management/fund-account-setting-component/fund-detail-component/fund-detail.component'
    ),
  rechargeFunds: () =>
    import('~/solution/pages/home/fund-account-management/recharge-funds-component/recharge-funds.component'),
  organizationConfiguration: () =>
    import(
      '~/solution/pages/home/organization-configuration-management/organization-configuration-component/organization-configuration.component'
    ),
  orderLimitSetting: () =>
    import(
      '~/solution/pages/home/organization-configuration-management/order-limit-setting-component/order-limit-setting.component'
    ),
  otherOrderManagement: () =>
    import('~/solution/pages/home/order-management/other-order-management-component/other-order-management.component')
};
