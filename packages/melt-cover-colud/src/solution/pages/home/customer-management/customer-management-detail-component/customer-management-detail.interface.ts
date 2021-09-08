import {
  ChargeBalancePagedListData,
  ConsumePagedListData,
  UserDetailsData
} from '~/solution/model/dto/customer-manage.dto';

/**
 * @export state变量定义和初始化
 * @class ICustomerManagementDetailState
 */
export class ICustomerManagementDetailState {
  chargeSearchForm = {
    index: 1,
    size: 5
  };
  chargeTableData: ChargeBalancePagedListData[] = [];
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
  consumeTableData: ConsumePagedListData[] = [];
  consumeTotal: number;

  detail: UserDetailsData;
  isLoading = false;
  radio = 2;
  visible = false;
  modalTitle = '用户证件照';
  idCardImages: any[] = [];
  vehicleImages: any[] = [];
}

export enum TableType {
  CHARGE = 'charge', // 剩余权益
  FOLLOW = 'follow', // 跟进记录
  CONSUME = 'consume' // 回店记录
}
