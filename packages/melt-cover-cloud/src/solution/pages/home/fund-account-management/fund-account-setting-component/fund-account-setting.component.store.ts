import { IFundAccountSettingState } from './fund-account-setting.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { QueryPaginOrderParams, QueryPaginOrderReturn } from '~/solution/model/dto/order-manage.dto';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Modal } from 'antd';

export function useFundAccountSettingStore() {
  const { state, setStateWrap } = useStateStore(new IFundAccountSettingState());
  const formRef = useForm();
  const form2 = useForm();
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

  function saveEdit() {
    console.log('保存了编辑信息');
    toggleModalEdit();
  }

  // 导出表格
  function exportExcel() {
    console.log('导出表格');
  }

  // 冻结账户
  function frozenAccount(row) {
    console.log('冻结了账户');

    // todo 网络请求
  }

  // 表单体按钮操作函数
  function tableAction(row: any, actionName: string) {
    console.log(row, '表单体按钮操作函数');
    if (actionName == '编辑') {
      console.log('编辑');
    } else if (actionName == '交易明细') {
      // todo 携参跳转 id乱码
      history.push('fundAccountSetting/fundDetail/' + 2);
      // history.push('fundDetail?id=' + row.id);
      console.log('交易明细');
    } else if (actionName == '冻结') {
      Modal.confirm({
        title: '提示',
        type: 'warning',
        content: '确定要冻结这个账户吗?',
        onOk: () => frozenAccount(row)
      });
    }
  }

  // 控制Modal框
  function toggleModalCreat() {
    setStateWrap({ visibleCreat: !state.visibleCreat });
  }
  function toggleModalEdit() {
    setStateWrap({
      visibleEdit: !state.visibleEdit
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
    watch2,
    saveEdit,
    handleSearch,
    toggleModalCreat,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    toggleModalEdit,
    handleFormChangeEvent
  };
}
