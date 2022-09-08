import { isDev } from '~/framework/util/common/tool';

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
        },
        {
          path: 'orderManagementDoubleList',
          title: '双保无忧订单列表'
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
export const STATUS = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '未完善',
    value: -99
  },
  {
    label: '待激活',
    value: 0
  },
  {
    label: '静默期',
    value: 4
  },
  {
    label: '激活拒绝',
    value: 5
  },
  {
    label: '完成',
    value: 1
  }
];

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

/** 不同环境的产品方案ID */
/** 原厂整车双保无忧 */
const allCarDouble = 'f7751d606332c80dbbc108d9fb8f17a7';
/** 原厂总成双保无忧 */
const totalDouble = '4c042dde48d8c7a6b65d08d9fb8f02dd';
/** 爱车保延保无忧（总成）服务包 */
const delay = isDev ? '67d479d98f2fc4a3942808da6f114f9f' : '732635f94502cd73485d08da6f1fa1d5';
/** 爱车保延保无忧服务包（总成） */
const delayCost = isDev ? '29288822703dcc73ac4408da73ddc170' : '0eb5feca80d0cb28391808da7541d3cd';
/** 爱车保延保无忧服务包（整车） */
const delayCar = isDev ? '00c52c91ac9bc3ae6a6508da73dda852' : 'd7cb439622bdcc1f259a08da7541eec6';

/** 双保无忧中包含服务章程的方案 */
export const DOUBLE_SERVICE_CHARTER = {
  /** 爱车保延保无忧（总成）服务章程(7.22).pdf */
  [delay]:'https://file.i-cbao.com/uploads/double/%E7%88%B1%E8%BD%A6%E4%BF%9D%E5%BB%B6%E4%BF%9D%E6%9C%8D%E5%8A%A1%E7%AB%A0%E7%A8%8B.pdf',
  /** 爱车保延保无忧（总成）服务章程(油车).pdf */
  [delayCost]:
    'https://file.i-cbao.com/uploads/double/%E7%88%B1%E8%BD%A6%E4%BF%9D%E5%BB%B6%E4%BF%9D%E6%97%A0%E5%BF%A7%EF%BC%88%E6%80%BB%E6%88%90%EF%BC%89%E6%9C%8D%E5%8A%A1%E7%AB%A0%E7%A8%8B(%E6%B2%B9%E8%BD%A6).pdf',
  /** 爱车保延保无忧（整车）服务章程(油车).pdf */
  [delayCar]:
    'https://file.i-cbao.com/uploads/double/%E7%88%B1%E8%BD%A6%E4%BF%9D%E5%BB%B6%E4%BF%9D%E6%97%A0%E5%BF%A7%EF%BC%88%E6%95%B4%E8%BD%A6%EF%BC%89%E6%9C%8D%E5%8A%A1%E7%AB%A0%E7%A8%8B(%E6%B2%B9%E8%BD%A6).pdf'
};
