import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { OrganizationPagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { YesNoOptions } from '~/solution/shared/constant/currency.const';

export interface IConfigProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  initData?: OrganizationPagedListResType;
}

export class IConfigState {
  loading = false;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'bagId',
        type: 'ISelectAccount',
        formItemProps: {
          label: '关联资金账户',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          isPreload: true
        }
      },
      {
        key: 'isLimit',
        type: 'RadioGroup',
        formItemProps: {
          label: '配置是否开启额度限制',
          required: true
        },
        props: {
          placeholder: '请选择下级机构',
          options: YesNoOptions
        }
      },
      {
        key: 'isRelationDeductMoney',
        type: 'RadioGroup',
        formItemProps: {
          label: '是否从关联资金账户扣款',
          required: true
        },
        props: {
          options: YesNoOptions
        }
      },
      {
        key: 'isAllowSubDeductMoney',
        type: 'RadioGroup',
        formItemProps: {
          label: '是否允许下级机构扣款',
          required: true
        },
        props: {
          options: YesNoOptions
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
