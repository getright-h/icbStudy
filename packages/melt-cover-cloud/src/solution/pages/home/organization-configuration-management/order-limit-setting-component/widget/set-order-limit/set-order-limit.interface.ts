import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { LimitPagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';

export interface ISetOrderLimitProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  initData?: LimitPagedListResType;
}

export class ISetOrderLimitState {
  loading = false;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'orderLimit',
        type: 'Input',
        formItemProps: {
          label: '录单最高限额',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '请输入限额值',
          addonAfter: '元'
        }
      },
      {
        key: 'orderResidueWarnMoney',
        type: 'Input',
        formItemProps: {
          label: '录单剩余额度告警值',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '请输入告警值',
          addonAfter: '元'
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
