export enum HOME_ENUM {}

export enum EQUITY_ENUM {
  ALL = -1,
  Disable = 0,
  Enable = 1,
  Delete = 2
}

export enum CERTIFICATE_TYPE_ENUM {
  'null' = 0,
  '身份证' = 1
}

export enum EQYITY_USE_TYPE {
  NO,
  XIAOXIUBAO,
  OILGET
}

export enum EQYITY_TYPE {
  BASE = 1,
  MINIPROGRAME,
  H5
}
export enum ADD_ORDER_CERTIFICATE_TYPE_ENUM {
  'null' = 0,
  '身份证正面' = 1,
  '身份证反面' = 2,
  '行驶证正面' = 3,
  '行驶证反面' = 4,
  '营业执照' = 5,
  '购车发票' = 6
}

export enum ADD_ORDER_CERTIFICATE_TYPE_ENUM_KEY {
  'null' = 'null',
  'certificateFront' = '身份证正面',
  'reverseSideOfCertificate' = '身份证反面',
  'template1' = '行驶证正面',
  'template2' = '行驶证反面',
  'certificateFrontCompany' = '营业执照',
  'template3' = '购车发票'
}

export enum TEMPLATESUBTYPE {
  IMAGE = 1,
  VIDEO = 2
}

export enum PAY_METHOD {
  '微信' = 1,
  '支付宝',
  '预授权分期',
  '其他系统支付'
}

export const PAY_METHOD_TYPES = [
  { label: '微信', value: 1 },
  { label: '支付宝', value: 2 },
  { label: '预授权分期', value: 3 },
  { label: '其他系统支付', value: 4 }
];

export enum DISCOUNT_METHOD {
  // Null = 0,
  '无' = 0,
  // ZhiMaGo = 1
  '芝麻Go' = 1
}
