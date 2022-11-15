import { DataDetail } from '~/solution/model/dto/order-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IOrderDetailState
 */
export class IFundDetailState {
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

export enum TableType {
  INCOME = 'income', // 收入
  SPENDING = 'spending' // 支出
}
