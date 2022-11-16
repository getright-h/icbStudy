import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { DataDetail } from '~/solution/model/dto/order-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IOrderDetailState
 */
export class IRechargeDetailState {
  info: DataDetail;
  radio: 2;
  chargeSearchForm = {
    index: 1,
    size: 5
  };
  chargeTotal: number;
  chargeBalance: number;

  followSearchForm = {
    index: 1,
    size: 5
  };
  followTableData: any = [];
  followTotal: number;

  consumeSearchForm = {
    index: 1,
    size: 5
  };
  consumeTotal: number;

  isLoading = false;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '审核结果 '
        },
        props: {
          placeholder: '请选择',
          options: [
            { label: '通过', value: 1 },
            { label: '不通过', value: 0 }
          ]
        }
      },
      {
        key: 'name',
        type: 'Input',
        formItemProps: {
          label: '备注'
        },
        props: {
          placeholder: '请输入备注',
          allowClear: true
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];

export enum TableType {
  INCOME = 'income', // 收入
  SPENDING = 'spending' // 支出
}
