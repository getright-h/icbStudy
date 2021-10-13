import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { STATUS } from '~/solution/shared/constant/common.const';

/**
 * @export state变量定义和初始化
 * @class IOrderManagementListState
 */
export class IOrderManagementListState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
}

/**
 * @exports 表单组件配置
 */
export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      // {
      //   type: 'Input',
      //   key: 'vhicleKeyWord',
      //   formItemProps: {
      //     label: '车辆信息'
      //   },
      //   props: {
      //     placeholder: '请输入车牌号/车架号',
      //     allowClear: true
      //   }
      // },
      {
        type: 'Select',
        key: 'equityGroupId',
        formItemProps: {
          label: '购买套餐包'
        },
        props: {
          placeholder: '请选择套餐包',
          options: [],
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      },
      {
        type: 'Input',
        key: 'userKeyWord',
        formItemProps: {
          label: '客户信息'
        },
        props: {
          placeholder: '电话',
          allowClear: true
        }
      },
      {
        type: 'Select',
        key: 'distributorId',
        formItemProps: {
          label: '所属机构'
        },
        props: {
          placeholder: '查看所属机构',
          options: [],
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      },
      {
        type: 'RangePicker',
        key: 'dateRange',
        formItemProps: {
          label: '订单日期'
        },
        props: {
          allowClear: true
        }
      },
      {
        type: 'Select',
        key: 'status',
        formItemProps: {
          label: '状态'
        },
        props: {
          placeholder: '请选择状态',
          options: STATUS,
          allowClear: true,
          showSearch: true,
          optionFilterProp: 'label'
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];

// /// <summary>
// /// 未完善
// /// </summary>
// [Description("未完善")]
// Uncompleted = -99,
// /// <summary>
// /// 批单申请
// /// </summary>
// [Description("批单申请")]
// EndorsementApply = -4,

// /// <summary>
// /// 余额不足 前端展示属性，不写入数据库
// /// </summary>
// [Description("余额不足")]
// BalanceNotEnough = -3,

// /// <summary>
// /// 待完善资料 前端展示属性，不写入数据库
// /// </summary>
// [Description("待完善资料")]
// Incomplete = -2,

// /// <summary>
// /// 待支付 不写入表中  只是用于车辆列表展示 创建订单但是没有支付的车辆显示
// /// </summary>
// [Description("待支付")]
// WaitPay = -1,

// /// <summary>
// /// 等待激活
// /// </summary>
// [Description("等待激活")]
// WaitActivation = 0,

// /// <summary>
// /// 正常
// /// </summary>
// [Description("正常")]
// Normal = 1,

// /// <summary>
// /// 退出
// /// </summary>
// [Description("退出")]
// Quit = 2,

// /// <summary>
// /// 余额不足系统自动退出
// /// </summary>
// [Description("自动退出")]
// AutoQuit = 3,

// /// <summary>
// /// 静默期
// /// </summary>
// [Description("静默期")]
// SilentPeriod = 4,

// /// <summary>
// /// 审核拒绝
// /// </summary>
// [Description("激活审核拒绝")]
// Reject = 5,

// /// <summary>
// /// 激活审核中
// /// </summary>
// [Description("激活审核中")]
// ActivationAudit = 6,

// /// <summary>
// /// 流失用户
// /// </summary>
// [Description("流失用户")]
// RunOff = 7,

// /// <summary>
// /// 等待召回
// /// </summary>
// [Description("等待召回")]
// AwaitRecall = 8,

// /// <summary>
// /// 车辆已删除
// /// </summary>
// [Description("车辆已删除")]
// Delete = 99,

// /// <summary>
// /// 不显示
// /// </summary>
// [Description("不显示")]
// NoShow = 100
