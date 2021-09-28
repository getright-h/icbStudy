export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home/customerManagement',
      title: '客户管理',
      icon: 'user',
      children: [
        {
          path: 'customerManagementList',
          title: '客户列表'
        }
      ]
    },
    {
      path: 'home/orderManagement',
      title: '订单管理',
      icon: 'table',
      children: [
        {
          path: 'orderManagementList',
          title: '订单列表'
        }
      ]
    },
    {
      path: 'home/equityManagement',
      title: '权益管理',
      icon: 'key',
      children: [
        {
          path: 'equityPackageManage',
          title: '权益套餐管理'
        },
        {
          path: 'rightsConsumerList',
          title: '权益消费'
        }
      ]
    },
    {
      path: 'home/reserve',
      title: '预约管理',
      icon: 'alert',
      children: [
        {
          path: 'reserveList',
          title: '预约列表'
        },
        {
          path: 'reserveSettings',
          title: '预约设置'
        }
      ]
    },
    // {
    //   path: 'home/maintain',
    //   title: '保养管理',
    //   icon: 'tool',
    //   children: [
    //     {
    //       path: 'maintainNotifyList',
    //       title: '保养提醒'
    //     },
    //     {
    //       path: 'maintainLogsList',
    //       title: '保养记录'
    //     },
    //     {
    //       path: 'maintainSetting',
    //       title: '保养设置'
    //     }
    //   ]
    // }
    {
      path: 'home/preOrderManagement',
      title: '预创单管理',
      icon: 'tool',
      children: [
        {
          path: 'preOrderList',
          title: '预创单列表'
        }
      ]
    }
  ]
};
