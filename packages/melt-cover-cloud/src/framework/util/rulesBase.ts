interface RegExpRuleDto {
  required?: boolean;
  pattern: RegExp;
  message: string;
  trigger?: string[];
}

type RuleType =
  | 'percentage'
  | 'mobile'
  | 'amount'
  | 'discount'
  | 'integer'
  | 'socialCredit'
  | 'password'
  | 'contact'
  | 'identityCard';

export const IRule: Partial<{ [K in RuleType]: RegExp }> = {
  percentage: /^100$|^(?:\d|[1-9]\d)(?:\.\d{1,2})?$/,
  mobile: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
  amount: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
  discount: /^(([1-9]{1})(\.\d{1})?)$/,
  // discount: /^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/,
  integer: /^\d+$/,
  socialCredit: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
  password: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/,
  contact: /^[0-9:\-]+$/,
  identityCard: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
};

export const BaseRegExpRule: Partial<{ [K in RuleType]: RegExpRuleDto }> = {
  percentage: {
    pattern: IRule.percentage,
    message: '格式不正确'
  },
  mobile: {
    pattern: IRule.mobile,
    message: '手机号格式不正确'
  },
  amount: {
    pattern: IRule.amount,
    message: '金额格式不正确'
  },
  discount: {
    pattern: IRule.discount,
    message: '请输入 1 ~ 9.9，且只可保留一位小数'
  },
  integer: {
    pattern: IRule.integer,
    message: '请输入整数'
  },
  socialCredit: {
    pattern: IRule.socialCredit,
    message: '社会代码格式不正确'
  },
  password: {
    pattern: IRule.password,
    message: '密码需为8到20位字符，必须包含字母和数字！'
  },
  contact: {
    pattern: IRule.contact,
    message: '电话格式不正确'
  },
  identityCard: {
    pattern: IRule.identityCard,
    message: '身份证格式不正确'
  }
};
