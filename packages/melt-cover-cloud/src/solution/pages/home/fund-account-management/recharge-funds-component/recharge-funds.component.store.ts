import { IRechargeFundsState } from './recharge-funds.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { message } from 'antd';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { RechargePagedListReqType } from '~/solution/model/dto/funds-organiziton-other.dto';

export function useRechargeFundsStore() {
  const { state, setStateWrap } = useStateStore(new IRechargeFundsState());
  const formRef = useForm();
  const form2 = useForm();
  const form3 = useForm();
  const form4 = useForm();
  const form5 = useForm();

  // 初始化请求表单信息
  useEffect(() => {
    // 初始化获取表单信息
    handleSearch();
  }, []);

  // todo 根据ezmoke 创建的网络请求
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

  /** 查询按钮 */
  function handleSearch(index = 1, size = 10) {
    const formValues = formRef.getFieldsValue();
    const req = Object.assign({}, formValues, {
      index,
      size
    });
    getRFundsList(req);
  }
  /** get 获取表单信息 */
  // todo 此处 dto 由 ezMOck 生成
  function getRFundsList(params: RechargePagedListReqType) {
    setStateWrap({
      isLoading: true
    });

    fundsOrganizitonOtherService.rechargePagedList(params).subscribe(
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

  /** req 创建资金账户 */
  function recharge() {
    form2.validateFields().then(value => {
      console.log('value', value);
      const req = {
        bagId: value.bagId,
        type: value.type,
        number: value.number,
        remark: value.remark
      };
      fundsOrganizitonOtherService.assetsRecord(req).subscribe(() => {
        message.info('操作成功');
        form2.resetFields();
        // 重绘页面
        handleSearch();
      });
      toggleModalRecharge();
    });
  }

  /** req 充值审核信息 */
  function saveAudit() {
    form4.validateFields().then(value => {
      const req = {
        id: state.auditId,
        auditState: value.auditState,
        auditRemark: value.auditRemark
      };
      fundsOrganizitonOtherService.audit(req).subscribe(() => {
        message.info('操作成功');
        form4.resetFields();
        // 重绘页面
        handleSearch();
      });
      console.log('保存了审核信息');
      toggleModalAudit();
    });
  }

  /** req 审核不通过时 编辑充值信息 */
  function saveEditCharge() {
    form3.validateFields().then(value => {
      const { id, type, number, remark } = value;
      const req = {
        id,
        type,
        number,
        remark
      };
      fundsOrganizitonOtherService.edit(req).subscribe(() => {
        message.info('操作成功');
        form3.resetFields();
        // 重绘页面
        handleSearch();
      });
      console.log('保存了审核信息');
      toggleModalEditCharge();
    });
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
  }

  // 冻结账户
  function frozenAccount(row) {
    console.log('冻结了账户');

    // todo 网络请求
  }

  // 表单体按钮操作函数
  function tableAction(row: any, actionName: string) {
    console.log('row', row);

    if (actionName == '充值审核') {
      // 回显 auditState 处理为空 不然columns中对应的回显会展示为 1 0 -1 状态码
      form4.setFieldsValue({ ...row, auditState: '' });
      // 同时保存对应列的id
      setStateWrap({ auditId: row.id });
      toggleModalAudit();
    } else if (actionName == '修改充值') {
      // 回显数据 主要是id
      form3.setFieldsValue({ id: row.id });
      toggleModalEditCharge();
    } else if (actionName == '详情') {
      // todo 携参跳转 调整为modal框显示
      // history.push('rechargeFunds/rechargeDetail/' + row.id);
      // 回显
      form5.setFieldsValue({ ...row });
      toggleModalDetail();
    }
  }

  // 控制Modal框
  function toggleModalRecharge() {
    setStateWrap({ visibleCreat: !state.visibleCreat });
  }
  function toggleModalDetail() {
    setStateWrap({ visibleDetail: !state.visibleDetail });
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
    form4,
    form5,
    saveAudit,
    saveEditCharge,
    handleSearch,
    toggleModalRecharge,
    toggleModalEditCharge,
    toggleModalDetail,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    recharge,
    toggleModalAudit
  };
}
