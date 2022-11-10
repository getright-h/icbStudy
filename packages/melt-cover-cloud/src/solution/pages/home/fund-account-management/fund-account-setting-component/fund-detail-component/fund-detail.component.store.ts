import { IFundDetailState, TableType } from './fund-detail.interface';
import { useStateStore, getQueryString } from '@fch/fch-tool';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export function useOrderDetailStore() {
  const { state, setStateWrap } = useStateStore(new IFundDetailState());
  const id = getQueryString('id');
  const orderManageService: OrderManageService = new OrderManageService();
  const history = useHistory();
  useEffect(() => {
    orderManageService.getOrderDetail(id).subscribe(res => setStateWrap({ info: res }));
  }, []);
  function goback() {
    history.goBack();
  }

  // 交易明细切换 显示
  function changeRaido(e: any) {
    console.log('e===>', e);
    setStateWrap({
      radio: e.target.value
    });
  }

  // 交易明细切换 获取表单数据
  function changeTablePageIndex(index: number, size: number, formType: string) {
    setStateWrap({ [`${formType}SearchForm`]: { index, size } });
    switch (formType) {
      case TableType.INCOME:
        getIncomeTableData();
        break;
      case TableType.SPENDING:
        getSpendingTableData();
        break;
    }
  }

  // 获取收入数据
  function getIncomeTableData() {
    console.log('获取收入数据');
    // todo req
  }
  // 获取支出数据
  function getSpendingTableData() {
    console.log('获取支出数据');
    // todo req
  }
  return { state, id, goback, changeRaido, changeTablePageIndex };
}
