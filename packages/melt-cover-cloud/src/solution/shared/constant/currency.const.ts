/** is 相关枚举 */
export enum IS_ENUM {
  /** 未配置 */
  NULL = -1,
  /** 未开启 */
  CLOSE = 0,
  /** 开启  */
  OPEN = 1
}

export const IsOptions = [
  { label: '未配置', value: IS_ENUM.NULL },
  { label: '未开启', value: IS_ENUM.CLOSE },
  { label: '开启', value: IS_ENUM.OPEN }
];

export const YesNoOptions = [
  { label: '是', value: IS_ENUM.OPEN },
  { label: '否', value: IS_ENUM.CLOSE }
];

/** 钱包 |卡券 枚举 */
export enum BAG_STATE_ENUM {
  normal = 0,
  frozen = 1
}

/** 钱包|卡券 options */
export const BagStateOptions = [
  { label: '正常', value: BAG_STATE_ENUM.normal },
  { label: '冻结', value: BAG_STATE_ENUM.frozen }
];

/** 支付枚举 */
export enum PAY_ENUM {
  /** 其他 */
  other = 1,
  /** 上级分配 */
  distribution = 2
}

export const PayOptions = [
  { label: '其他', value: PAY_ENUM.other }
  // { label: '上级分配', value: PAY_ENUM.distribution }
];

/** 资金审核枚举 */
export enum ASSETS_AUDIT_STATE {
  /** 待审核 */
  wait = -1,
  /** 通过 */
  success = 1,
  /** 未通过 */
  refuse = 0
}

/** 资金审核 options */
export const AssetAuditOptions = [
  { label: '通过', value: ASSETS_AUDIT_STATE.success },
  { label: '未通过', value: ASSETS_AUDIT_STATE.refuse },
  { label: '待审核', value: ASSETS_AUDIT_STATE.wait }
];
