import { IFundDetailState, TableType } from './fund-detail.interface';
import { useStateStore, getQueryString } from '@fch/fch-tool';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';

export function useOrderDetailStore() {
  const { state, setStateWrap } = useStateStore(new IFundDetailState());
  const id = getQueryString('id');
  console.log('id', id);

  const orderManageService: OrderManageService = new OrderManageService();
  // todo 根据ezmoke 创建的网络请求
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

  const history = useHistory();
  useEffect(() => {
    // todo 替换
    orderManageService.getOrderDetail(id).subscribe(res => setStateWrap({ info: res }));
    getIncomeTableData();
    getSpendingTableData();
  }, []);
  function goback() {
    history.goBack();
  }

  // 交易明细切换 显示
  function changeRaido(e: any) {
    console.log('e===>', e);
    changeTablePageIndex(1, 10, e.target.value == 1 ? 'income' : 'spending');
    setStateWrap({
      radio: e.target.value
    });
  }

  // 交易明细切换 获取表单数据
  function changeTablePageIndex(index: number, size: number, formType: string) {
    setStateWrap({ [`${formType}SearchForm`]: { index, size } });
    switch (formType) {
      case TableType.INCOME:
        getIncomeTableData(index, size);
        break;
      case TableType.SPENDING:
        getSpendingTableData(index, size);
        break;
    }
  }

  // 获取收入数据
  function getIncomeTableData(index = 1, size = 10) {
    // 请求值
    const req = {
      index,
      size,
      bagId: `${id}`,
      isInCome: true
    };

    setStateWrap({
      isLoading: true
    });
    fundsOrganizitonOtherService.detailPagedList(req).subscribe(
      res => {
        setStateWrap({
          followTableData: res.dataList,
          followTotal: res.total
        });
        setStateWrap({
          isLoading: false
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
    console.log('获取收入数据');
    // todo req
  }
  // 获取支出数据
  function getSpendingTableData(index = 1, size = 10) {
    // 请求值
    const req = {
      index,
      size,
      bagId: `${id}`,
      isInCome: false
    };

    setStateWrap({
      isLoading: true
    });
    fundsOrganizitonOtherService.detailPagedList(req).subscribe(
      res => {
        setStateWrap({
          followTableData: res.dataList,
          followTotal: res.total
        });
        setStateWrap({
          isLoading: false
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
    console.log('获取支出数据');
    // todo req
  }
  return { state, id, goback, changeRaido, changeTablePageIndex };
}
