import { ACTION_TYPE, IFundAccountSettingState } from './fund-account-setting.interface';
import { useStateStore } from '@fch/fch-tool';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { message, Modal } from 'antd';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { PagedListReqType, PagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { BAG_STATE_ENUM } from '~/solution/shared/constant/currency.const';
import { schema } from './widget/addPackageModal';

export function useFundAccountSettingStore() {
  const { state, setStateWrap } = useStateStore(new IFundAccountSettingState());
  // 查询框
  const formRef = useForm();
  // 编辑
  const form2 = useForm();
  // 新建
  const form3 = useForm();
  const history = useHistory();

  // 初始化请求表单信息
  useEffect(() => {
    // 初始化获取表单信息
    handleSearch();
  }, []);

  // 对表单字段做处理
  function handleString() {
    const foo = form2.getFieldValue('totalInCome');
    const bar = form2.getFieldValue('balance');
    // 保存原来的值 用于之后发送查询列表时携带
    setStateWrap({ totalInCome: foo, balance: bar });
    form2.setFieldsValue({ totalInCome: foo + '虚拟货币', balance: bar + '虚拟货币' });
  }

  // todo 根据ezmoke 创建的网络请求
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

  // req 获取列表
  function getFSettingList(params: PagedListReqType) {
    setStateWrap({
      isLoading: true
    });
    fundsOrganizitonOtherService.pagedList(params).subscribe(
      res => {
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

  /** req 查询列表 查询按钮 */
  function handleSearch(index = 1, size = 10, state = 0) {
    const formValues = formRef.getFieldsValue();

    const req = Object.assign({}, formValues, {
      size,
      index
      // state
    });
    getFSettingList(req);
  }

  /** req 编辑框提交 */

  function saveEdit() {
    console.log('保存了编辑信息');
    form2.validateFields().then(values => {
      const req = {
        ...values,
        bagId: values.bagId,
        name: values.name,
        type: values.type,
        totalInCome: state.totalInCome,
        balance: state.balance
        // totalInCome:values
      };
      setStateWrap({
        isLoadingModal2: true
      });
      fundsOrganizitonOtherService.set(req).subscribe(
        () => {
          message.success('操作成功');
          form2.resetFields();
          // 重绘页面
          handleSearch();
          toggleModalEdit();
        },
        () => {
          setStateWrap({
            isLoadingModal2: false
          });
        }
      );
    });
  }

  /** req 创建资金账户 */
  function creatFundAccount() {
    form3.validateFields().then(values => {
      console.log('form3', values);
      const req = {
        type: values?.type,
        name: values?.name,
        state: values?.state,
        remark: values?.remark,
        businessIds: values?.businessIds
      };
      setStateWrap({
        isLoadingModal3: true
      });
      fundsOrganizitonOtherService.bag(req).subscribe(
        () => {
          message.success('操作成功');
          form3.resetFields();
          toggleModalCreat();
          // 重绘页面
          handleSearch();
        },
        () => {
          setStateWrap({
            isLoadingModal3: false
          });
        }
      );

      console.log('创建资金账户');
    });
  }

  // 导出表格
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

  function setBagState(row: PagedListResType) {
    const state = row.state === BAG_STATE_ENUM.normal ? BAG_STATE_ENUM.frozen : BAG_STATE_ENUM.normal;
    fundsOrganizitonOtherService.setBagState({ bagId: row.bagId, state }).subscribe(_ => {
      ShowNotification.success('设置成功');
      handleSearch();
    });
  }

  // 表单体按钮操作函数
  function tableAction(actionName: ACTION_TYPE, row?: PagedListResType) {
    // 表单初始化
    setStateWrap({ isLoadingModal2: false, isLoadingModal3: false });
    form2.resetFields();
    form3.resetFields();
    switch (actionName) {
      case ACTION_TYPE.ADD:
        toggleModalCreat();
        break;
      case ACTION_TYPE.DETAIL:
        // 显示模态框
        toggleModalEdit();
        // 回显数据到框内
        handleEditContext(row);
        break;
      case ACTION_TYPE.INFO:
        // todo 携参跳转 id乱码
        history.push('fundAccountSetting/fundDetail?id=' + row.id);
        // history.push('fundDetail?id=' + row.id);
        // console.log('交易明细');
        break;
      case ACTION_TYPE.frozen:
        Modal.confirm({
          title: '提示',
          type: 'warning',
          content: '确定要冻结这个账户吗?',
          onOk: () => setBagState(row)
        });
        break;
      case ACTION_TYPE.thaw:
        Modal.confirm({
          title: '提示',
          type: 'warning',
          content: '确定要解冻这个账户吗?',
          onOk: () => setBagState(row)
        });
        break;
      case ACTION_TYPE.card:
        setStateWrap({ rowData: row });
        closeCard();
        break;
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
  function closeCard() {
    setStateWrap({ visibaleCard: !state.visibaleCard });
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

  // 回显函数 edit
  function handleEditContext(row: any) {
    // 获取卡券相关详情
    fundsOrganizitonOtherService.bagDetail({ bagId: row?.bagId }).subscribe(res => {
      form2.setFieldsValue({ ...row, businessIds: res?.bagRelations?.map?.(m => m.businessId) });
      handleString();
    });
  }

  return {
    state,
    formRef,
    form2,
    form3,
    saveEdit,
    closeCard,
    handleSearch,
    toggleModalCreat,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    toggleModalEdit
  };
}
