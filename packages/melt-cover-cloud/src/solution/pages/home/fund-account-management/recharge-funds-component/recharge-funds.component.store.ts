import { IRechargeFundsState } from './recharge-funds.interface';
import { CommonUtil, useStateStore } from '@fch/fch-tool';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import { QueryPaginOrderParams, QueryPaginOrderReturn } from '~/solution/model/dto/order-manage.dto';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Modal } from 'antd';
import moment from 'moment';

export function useRechargeFundsStore() {
  const { state, setStateWrap } = useStateStore(new IRechargeFundsState());
  const formRef = useForm();
  const form2 = useForm();
  const form3 = useForm();
  const history = useHistory();

  // 初始化请求表单信息
  useEffect(() => {
    handleSearch();
  }, []);

  // widget watch2
  const watch2 = {
    /* distributor: (changedValues: any, values: any) => {
      if (changedValues?.key) {
        const isParentDistributor =
          state.orgCanOptions.filter((item: any) => item.id == changedValues.key && item.isPlatform)?.length > 0;
        handleGetDropEquity(changedValues.key, () => {
          const defaultEquityList: string[] = res.filter(item => item.disable).map(item => item.id);
          form2.setFieldsValue({
            equityList: defaultEquityList
          });
          form2.setSchema('isTest', schema => {
            schema.hidden = !isParentDistributor;
            return schema;
          });
        });
      }
    } */
  };

  function handleFormChangeEvent(changedValues: any, values: any) {
    /* if (changedValues['distributor']?.key) {
      handleGetDropEquity(changedValues['distributor'].key, (res: IResponseEquityResult[]) => {
        const defaultEquityList: string[] = res.filter(item => item.disable).map(item => item.id);
        form2.setFieldsValue({
          equityList: defaultEquityList
        });
      });
    } */
  }
  function handleFormChangeEvent2(changedValues: any, values: any) {
    /* if (changedValues['distributor']?.key) {
      handleGetDropEquity(changedValues['distributor'].key, (res: IResponseEquityResult[]) => {
        const defaultEquityList: string[] = res.filter(item => item.disable).map(item => item.id);
        form2.setFieldsValue({
          equityList: defaultEquityList
        });
      });
    } */
  }

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

  /** get 创建资金账户 */
  function creatFundAccount() {
    console.log('发送了请求');
    // todo 验证后关闭modal
    toggleModalCreat();
  }

  function saveAudit() {
    console.log('保存了审核信息');
    toggleModalAudit();
  }

  function saveEditCharge() {
    console.log('保存了审核信息');
    toggleModalEditCharge();
  }
  // 导出表格
  function exportExcel() {
    console.log('导出');
    const { searchForm } = state;
    searchForm.index = 1;
    const formData = formRef.getFieldsValue();
    const params = {
      ...formData,
      ...searchForm
    };
    // todo req
    /* rightsConsumerService.exportConsumeList(params).subscribe(
      res => {
        CommonUtil.downFile(res, `权益消费列表${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
        ShowNotification.success('导出成功');
        setStateWrap({ isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    ); */
  }

  // 冻结账户
  function frozenAccount(row) {
    console.log('冻结了账户');

    // todo 网络请求
  }

  // 表单体按钮操作函数
  function tableAction(row: any, actionName: string) {
    if (actionName == '充值审核') {
      console.log('充值审核，弹出modal');
      // todo 开启对应modal Top-up audit
    } else if (actionName == '修改充值') {
      toggleModalEditCharge();
      console.log('修改充值，弹出modal');
      // todo 开启对应modal Top-up audit
    } else if (actionName == '详情') {
      // todo 携参跳转 id乱码
      history.push('rechargeFunds/rechargeDetail/' + 2);
      // history.push('fundDetail?id=' + row.id);
      console.log('详情');
    }
  }

  // 控制Modal框
  function toggleModalCreat() {
    setStateWrap({ visibleCreat: !state.visibleCreat });
  }
  function toggleModalAudit() {
    setStateWrap({
      visibleAudit: !state.visibleAudit
    });
  }
  function toggleModalEditCharge() {
    setStateWrap({
      visibleEditAudit: !state.visibleEditAudit
    });
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

  return {
    state,
    formRef,
    form2,
    form3,
    watch2,
    saveAudit,
    saveEditCharge,
    handleSearch,
    toggleModalCreat,
    toggleModalEditCharge,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    toggleModalAudit,
    handleFormChangeEvent,
    handleFormChangeEvent2
  };
}
