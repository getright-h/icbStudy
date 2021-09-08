// 证件类型
/// <summary> 证件类型 </summary>
export enum CARD_TYPE {
  /// <summary> 身份证 </summary>
  // [Description("身份证")]
  IdNumber = 1,
  /// <summary> 行驶证 </summary>
  // [Description("行驶证")]
  DrivingLicense = 2,
  /// <summary> 军官证 </summary>
  // [Description("军官证")]
  CertificateOfOfficers = 3,
  /// <summary> 护照 </summary>
  // [Description("护照")]
  Passport = 4,
  /// <summary> 社会统一信用代码 </summary>
  // [Description("社会统一信用代码")]
  UnitCode = 5,
  /// <summary> 港澳通行证 </summary>
  // [Description("港澳通行证")]
  HAPassCode = 6
}
export class RegExpRule {
  BusinessIdentNo = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/; //统一社会信用代码
  IDNo = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/; //身份证号
  Come = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,20})(号?)$/; //军官证
  DriversLicense = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //驾驶证
  PassPort = /^([a-zA-z]|[0-9]){5,17}$/; //护照
  HongKongMacauPass = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/; //港澳身份证
  Phone = /(1[0-9])\d{9}$/; //手机
  Mobile = /\d/; //电话
  ChassisNumber = /^[A-HJ-NPR-Z\d]{17}$/; //车架号
  LicensePlateNumber = /(\*\_\*)|(\*)|(\*\*)|(\*\*\*)|(\*\-\*)|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$)/; //车牌号
  ownerInvoiceMoney = 300; //开票金额 单位万元  小于等于300万元
  carMortgageMoney = 100; //按揭金额 单位万元  小于等于100万元
  carMortgageTime = 60; //按揭期限 单位月  小于等于60月
  carLetterShowMoney = 20000; //保函显示费用 单位元 小于等于20000元
  receivableAmount = 20000; //应收费用 单位元 小于等于20000元
  carLetterRealChargeMoney = 20000; //实收费用 单位元 小于等于20000元
}

const regExpRule = new RegExpRule();
export const DocumentTypeReg = [
  {
    type: '身份证',
    reg: regExpRule.IDNo,
    enum: CARD_TYPE.IdNumber
  },
  {
    type: '行驶证',
    reg: regExpRule.DriversLicense,
    enum: CARD_TYPE.DrivingLicense
  },
  {
    type: '军官证',
    reg: regExpRule.Come,
    enum: CARD_TYPE.CertificateOfOfficers
  },
  {
    type: '护照',
    reg: regExpRule.PassPort,
    enum: CARD_TYPE.Passport
  },
  {
    type: '社会统一信用代码',
    reg: regExpRule.BusinessIdentNo,
    enum: CARD_TYPE.UnitCode
  },
  {
    type: '港澳通行证',
    reg: regExpRule.HongKongMacauPass,
    enum: CARD_TYPE.HAPassCode
  }
];

export const RegExpRuleArray: { required?: boolean; pattern: RegExp; message: string; trigger?: string[] }[] = [
  {
    // required: true,
    pattern: regExpRule.IDNo,
    message: '身份证格式不正确'
  },
  {
    // required: true,
    pattern: regExpRule.BusinessIdentNo,
    message: '营业执照格式不正确'
  },
  {
    // required: true,
    pattern: regExpRule.Phone,
    message: '手机号格式不正确'
  },
  {
    // required: true,
    pattern: regExpRule.ChassisNumber,
    message: '车架号格式不正确'
  },
  {
    pattern: regExpRule.LicensePlateNumber,
    message: '车牌号格式不正确'
  },
  {
    // required: true,
    pattern: regExpRule.Mobile,
    message: '电话格式不正确'
  }
];
