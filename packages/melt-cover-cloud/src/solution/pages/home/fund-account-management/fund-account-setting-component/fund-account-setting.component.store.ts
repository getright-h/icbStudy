import { IFundAccountSettingState } from './fund-account-setting.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { message, Modal } from 'antd';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { PagedListReqType } from '~/solution/model/dto/funds-organiziton-other.dto';

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
      index,
      state
    });
    getFSettingList(req);
  }

  /** req 编辑框提交 */

  function saveEdit() {
    console.log('保存了编辑信息');
    form2.validateFields().then(values => {
      console.log(values);
      const req = {
        bagId: values.bagId,
        name: values.name,
        type: values.type
      };
      setStateWrap({
        isLoadingModal2: true
      });
      fundsOrganizitonOtherService.set(req).subscribe(
        () => {
          message.info('操作成功');
          form2.resetFields();
          // 重绘页面
          handleSearch();
        },
        () => {
          setStateWrap({
            isLoadingModal2: false
          });
        }
      );
      toggleModalEdit();
    });
  }

  /** req 创建资金账户 */
  function creatFundAccount() {
    form3.validateFields().then(values => {
      console.log('form3', values);
      const req = {
        name: values.name,
        state: values.state,
        remark: values.remark
      };
      setStateWrap({
        isLoadingModal3: true
      });
      fundsOrganizitonOtherService.bag(req).subscribe(
        () => {
          message.info('操作成功');
          form3.resetFields();
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
      // todo 验证后关闭modal
      toggleModalCreat();
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

  // 冻结账户
  function frozenAccount(row: any) {
    console.log('冻结了账户');

    // todo 网络请求
  }
  // 解冻账户
  function thawAccount(row: any) {
    console.log('解冻账户');

    // todo 网络请求
  }

  // 表单体按钮操作函数
  function tableAction(row: any, actionName: string) {
    console.log(row, '表单体按钮操作函数');
    if (actionName == '编辑') {
      // 显示模态框
      toggleModalEdit();
      // 回显数据到框内
      handleEditContext(row);
    } else if (actionName == '交易明细') {
      // todo 携参跳转 id乱码
      history.push('fundAccountSetting/fundDetail?id=' + row.id);
      // history.push('fundDetail?id=' + row.id);
      console.log('交易明细');
    } else if (actionName == '冻结') {
      Modal.confirm({
        title: '提示',
        type: 'warning',
        content: '确定要冻结这个账户吗?',
        onOk: () => frozenAccount(row)
      });
    } else if (actionName == '解冻') {
      Modal.confirm({
        title: '提示',
        type: 'warning',
        content: '确定要解冻这个账户吗?',
        onOk: () => thawAccount(row)
      });
    } else if (actionName == '卡券管理') {
      history.push('');
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

  // 回显函数 edit
  function handleEditContext(row: any) {
    form2.setFieldsValue({ ...row });
  }

  return {
    state,
    formRef,
    form2,
    form3,
    saveEdit,
    handleSearch,
    toggleModalCreat,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    toggleModalEdit
  };
}
