// 预约渠道
export enum AppSourceEnum {
  '凡车汇' = 1,
  '爱车保' = 2,
  '互助宝' = 3
}
export const AppSourceConst = [
  { label: '爱车保', value: 2 },
  { label: '凡车汇', value: 1 },
  { label: '互助宝', value: 3 }
];

// 预约状态
export enum AppointStateEnum {
  All = -1,
  Default = 0,
  Confirm = 1,
  Refuse = 2,
  Cancel = 3,
  Finished = 10
}
export const AppointStateConst = [
  { label: '待确认', value: 0 },
  { label: '已确认', value: 1 },
  { label: '已关闭', value: 2 },
  { label: '已取消', value: 3 },
  { label: '已完成', value: 10 }
];

// 预约自动确认
export const AppointAutoConst = [
  { label: '是', value: 'true' },
  { label: '否', value: 'false' }
];

// 预约类型
export const AppointmentTypeConst = [
  { label: '保养', value: 2 },
  { label: '维修', value: 4 },
  { label: '美容', value: 8 },
  { label: '加装', value: 16 },
  { label: '评估', value: 32 },
  { label: '其他', value: 64 },
  { label: '小事故', value: 128 }
];
