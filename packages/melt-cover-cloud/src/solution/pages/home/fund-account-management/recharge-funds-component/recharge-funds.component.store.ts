import { ACTION_TYPE, IRechargeFundsState } from './recharge-funds.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { message } from 'antd';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { RechargePagedListReqType, RechargePagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { uuid } from '~/framework/util/common/tool';

export function useRechargeFundsStore() {
  const { state, setStateWrap, getState } = useStateStore(new IRechargeFundsState());
  const formRef = useForm();
  const rowRef = useRef<RechargePagedListResType>();
  const form2 = useForm();
  const form3 = useForm();
  const form4 = useForm();
  const form5 = useForm();

  const history = useHistory();
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
        console.log('xx=>', res.dataList);

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
      const req = {
        ...value,
        receiptImage: value?.receiptImage?.[0],
        bagId: value.bagId,
        type: value.type,
        number: value.number,
        remark: value.remark
      };
      fundsOrganizitonOtherService.assetsRecord(req).subscribe(() => {
        message.success('充值成功');
        form2.resetFields();
        // 重绘页面
        handleSearch();
        toggleModalRecharge();
      });
    });
  }

  /** req 充值审核信息 */
  function saveAudit() {
    form4.validateFields().then(value => {
      const req = {
        ...value,
        id: state.auditId,
        auditState: value.auditState,
        auditRemark: value.auditRemark
      };
      fundsOrganizitonOtherService.audit(req).subscribe(() => {
        message.success('操作成功');
        form4.resetFields();
        // 重绘页面
        handleSearch();
        toggleModalAudit();
      });
    });
  }

  /** req 审核不通过时 编辑充值信息 */
  function saveEditCharge() {
    form3.validateFields().then(value => {
      // const { id, type, number, remark } = value;
      const req = {
        ...value,
        recordId: rowRef.current?.id,
        receiptImage: value?.receiptImage?.[0],
        bagId: value.bagId,
        type: value.type,
        number: value.number,
        remark: value.remark
      };
      fundsOrganizitonOtherService.edit(req).subscribe(() => {
        message.success('操作成功');
        form3.resetFields();
        // 重绘页面
        handleSearch();
        toggleModalEditCharge();
      });
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

  // 获取资金详情
  function getADetail(row: RechargePagedListResType) {
    toggleModalEditCharge();
    fundsOrganizitonOtherService.assetsDetail({ recordId: row.id }).subscribe(res => {
      setStateWrap({ info: res });
      form3.setFieldsValue({
        ...row,
        receiptImage: res?.buyInfo?.receiptImage ? [res?.buyInfo?.receiptImage] : undefined
      });
      // if (res?.buyInfo?.receiptImage) {
      //   form3.setSchema('receiptImage', (schema: any) => {
      //     schema.props.defaultFileList = [{ uid: uuid(9, 10), name: '附件凭证Img', url: res?.buyInfo?.receiptImage }];
      //   });
      // }
    });
  }

  // 表单体按钮操作函数
  function tableAction(actionName: ACTION_TYPE, row?: RechargePagedListResType) {
    rowRef.current = row;
    // 初始化表格
    form2.resetFields();
    form3.resetFields();
    form4.resetFields();
    form5.resetFields();
    switch (actionName) {
      case ACTION_TYPE.DETAIL:
        history.push(`./rechargeFunds/rechargeDetail?id=${row.id}`);
        // todo 携参跳转 调整为modal框显示
        // 回显
        // form5.setFieldsValue({ ...row });
        // toggleModalDetail();
        break;
      case ACTION_TYPE.EXAMINE:
        history.push(`./rechargeFunds/rechargeDetail?id=${row.id}&examine=true`);
        // 回显 auditState 处理为空 不然columns中对应的回显会展示为 1 0 -1 状态码
        // setStateWrap({ auditId: row.id });
        // form4.setFieldsValue({ ...row, auditState: '' });
        // 同时保存对应列的id
        // toggleModalAudit();
        break;
      case ACTION_TYPE.UPDATE:
        getADetail(row);
        break;
      case ACTION_TYPE.Recharge:
        toggleModalRecharge();
        break;
      case ACTION_TYPE.Export:
        exportExcel();
        break;
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
    console.log('index, pageSize', index, pageSize);
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
