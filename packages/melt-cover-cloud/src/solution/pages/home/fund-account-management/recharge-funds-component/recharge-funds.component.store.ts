import { IRechargeFundsState } from './recharge-funds.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { QueryPaginOrderParams, QueryPaginOrderReturn } from '~/solution/model/dto/order-manage.dto';

export function useRechargeFundsStore() {
  const { state, setStateWrap } = useStateStore(new IRechargeFundsState());
  const formRef = useForm();
  const history = useHistory();

  // 初始化请求表单信息
  useEffect(() => {
    handleSearch();
  }, []);

  // todo 根据ezmoke 创建的网络请求
  const orderManageService: OrderManageService = new OrderManageService();

  /** 查询按钮 */
  function handleSearch(page = 1, size = 10) {
    const formValues = formRef.getFieldsValue();
    const req = Object.assign({}, formValues, {
      size,
      page
    });
    handleGetOrderList(req);
  }
  /** get 获取表单信息 */
  // todo 此处 dto 由 ezMOck 生成
  function handleGetOrderList(params: QueryPaginOrderParams) {
    setStateWrap({
      isLoading: true
    });
    orderManageService.getOrderList(params).subscribe(
      (res: QueryPaginOrderReturn) => {
        setStateWrap({
          tableData: res.dataList,
          total: res.total
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
  }

  // 导出表格
  function exportExcel() {
    console.log('导出表格');
  }

  // 控制Modal框
  function isShowAccountRechange(params: boolean) {
    setStateWrap({ isShowAccountRechange: true });
  }

  // 表单体按钮操作函数
  function tableAction(row: any, actionName: string) {
    console.log('表单体按钮操作函数');
    if (actionName == '详情') {
      // history.push('orderDetail?id=' + row.id);
    }
  }

  // 改变分页函数
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchForm: {
        size: pageSize,
        index
      }
    });
    handleSearch(index, pageSize);
  }

  return { state, formRef, handleSearch, isShowAccountRechange, exportExcel, tableAction, changeTablePageIndex };
}
