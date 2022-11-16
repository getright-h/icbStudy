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
