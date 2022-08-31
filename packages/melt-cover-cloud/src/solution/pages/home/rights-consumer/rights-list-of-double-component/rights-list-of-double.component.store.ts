import { useEffect } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';
import { CommonUtil, useStateStore } from '@fch/fch-tool';
import { useForm, ShowNotification } from '@fch/fch-shop-web';
import { CommonUtil as BaseFunc } from '~/solution/shared/utils/baseFunction';
import { RightsConsumerService } from '~/solution/model/services/rights-consumer.service';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';
import { ACTION_TYPE, IRightsListOfDoubleState } from './rights-list-of-double.interface';

export function useRightsListOfDoubleStore() {
  const { state, setStateWrap } = useStateStore(new IRightsListOfDoubleState());
  const formRef = useForm();
  const refForm = useForm();
  const imageForm = useForm();
  const auditForm = useForm();
  const rightsConsumerService: RightsConsumerService = new RightsConsumerService();
  const { data, refetch } = useGetDistributor();
  useEffect(() => {
    getOrgList();
    handleSearch();
  }, []);

  useEffect(() => {
    formRef.setSchema('distributorId', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
    });
  }, [JSON.stringify(data)]);

  function handleSearch(page = 1, size = 10) {
    const { searchForm } = state;
    searchForm.index = 1;
    const formData = formRef.getFieldsValue();
    const params = {
      ...formData,
      beginTime:
        formData.dateRange && formData.dateRange[0]
          ? moment(formData.dateRange[0])
              .set({ hours: 0, minutes: 0, seconds: 0 }) // yy:mm:dd 00:00:00
              .valueOf()
          : 0,
      endTime:
        formData.dateRange && formData.dateRange[1]
          ? moment(formData.dateRange[1])
              .set({ hours: 23, minutes: 59, seconds: 59 }) // yy:mm:dd 59:59:59
              .valueOf()
          : 0,

      index: page,
      size
    };

    getTableData(params);
  }

  function tableAction(row: any, actionName: ACTION_TYPE) {
    setStateWrap({ currModalType: actionName, id: row.id });
    switch (actionName) {
      case ACTION_TYPE.Detail:
        getDetailConsume(row.id, () => {
          handleToggleModal('visibleDetail');
        });
        break;
      case ACTION_TYPE.Verify:
        toggleModal();
        break;
      case ACTION_TYPE.Upload:
        imageForm.resetFields();
        setStateWrap({ isEdit: false });
        handleToggleModal('uploadVisible');
        break;
      case ACTION_TYPE.Edit:
        imageForm.resetFields();
        setStateWrap({ isEdit: true });
        getDetailConsume(row.id, () => {
          handleToggleModal('uploadVisible');
        });
        break;
      case ACTION_TYPE.Audit:
        getDetailConsume(row.id, () => {
          handleToggleModal('visibleDetail');
        });
        break;
      default:
        break;
    }
  }
  function handleButton(type: string) {
    switch (type) {
      case 'auditVisible':
        auditForm.resetFields();
        break;
      default:
        break;
    }
    handleToggleModal(type);
  }
  /**
   * @description 集中处理弹窗显隐
   * @param {string} type 弹窗显示字段名
   */
  function handleToggleModal(type: string) {
    const currModalType = state[type];
    setStateWrap({ [type]: !currModalType });
  }

  function changeTablePageIndex(page: number, size: number) {
    setStateWrap({ searchForm: { index: page, size } });
    handleSearch(page, size);
  }

  function addOrder() {
    setStateWrap({ id: undefined });
    toggleModal();
  }
  // 导出
  function exportExcel() {
    const { searchForm } = state;
    searchForm.index = 1;
    const formData = formRef.getFieldsValue();
    const params = {
      ...formData,
      beginTime:
        formData.dateRange && formData.dateRange[0]
          ? moment(formData.dateRange[0])
              .set({ hours: 0, minutes: 0, seconds: 0 }) // yy:mm:dd 00:00:00
              .valueOf()
          : 0,
      endTime:
        formData.dateRange && formData.dateRange[1]
          ? moment(formData.dateRange[1])
              .set({ hours: 23, minutes: 59, seconds: 59 }) // yy:mm:dd 59:59:59
              .valueOf()
          : 0,

      ...searchForm
    };
    // setStateWrap({ isLoading: true });
    rightsConsumerService.exportDoubleList(params).subscribe(
      res => {
        CommonUtil.downFile(res, `权益消费列表${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
        ShowNotification.success('导出成功');
        setStateWrap({ isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
  }
  function handleOk() {
    writeOffDouble();
  }
  function toggleModal() {
    refForm.resetFields();
    setStateWrap({
      visible: !state.visible
    });
  }

  function toggleModal2() {
    setStateWrap({
      visibleDetail: !state.visibleDetail
    });
  }
  // table 列表
  function getTableData(params?: string) {
    setStateWrap({ isLoading: true });
    rightsConsumerService.postDoubleRightsList(params ? params : state.searchForm).subscribe(
      res => {
        res.dataList.map((item: any) =>
          item.operationType === 2
            ? (item.discountPriceDisplay = '1次')
            : (item.discountPriceDisplay = item.discountPrice)
        );
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 获取详情数据
  function getDetailConsume(id: string, fn?: Function) {
    rightsConsumerService.getDetailConsume({ id }).subscribe(
      res => {
        setStateWrap({ detail: res });
        fn?.();
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 核销
  function writeOffDouble() {
    rightsConsumerService.writeOffDouble({ id: state.id, verCode: refForm.getFieldsValue().verCode }).subscribe(
      res => {
        handleSearch();
        toggleModal();
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 机构
  function getOrgList() {
    rightsConsumerService.getOrgList().subscribe(
      res => {
        const orgOptionList = res.map(org => {
          return {
            label: org.name,
            value: org.id
          };
        });
        setStateWrap({ orgOptionList });
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  /** 处理图片格式为后端需求格式 */
  function handleImage(param: Record<string, any>) {
    const picList: any = [];
    Object.entries(param || {})?.forEach((item: any[]) => {
      if (Array.isArray(item[1]) && item[1].length > 0) {
        item[1].forEach((picUrl: string) => {
          picUrl &&
            picList.push({
              fileName: item[0],
              filePath: picUrl,
              fileSuffix: BaseFunc.getFileSuffix(picUrl)
            });
        });
      }
    });
    return picList;
  }

  /** 上传凭证 */
  function handleUpload() {
    imageForm.validateFields().then((formValue: Record<string, any>) => {
      setStateWrap({ uploadLoading: true });
      const { id, isEdit } = state;
      const param = handleImage(formValue);
      isEdit
        ? rightsConsumerService.editVoucher({ equityConsumeRecordId: id, voucherFileDtos: param }).subscribe(
            (res: any) => {
              setStateWrap({ uploadLoading: false });
              ShowNotification.success('修改完成');
              handleSearch();
              handleToggleModal('uploadVisible');
              imageForm.resetFields();
            },
            () => {
              setStateWrap({ uploadLoading: false });
            }
          )
        : rightsConsumerService.uploadVoucher({ equityConsumeRecordId: id, voucherFileDtos: param }).subscribe(
            (res: any) => {
              setStateWrap({ uploadLoading: false });
              ShowNotification.success('上传完成');
              handleSearch();
              handleToggleModal('uploadVisible');
              imageForm.resetFields();
            },
            () => {
              setStateWrap({ uploadLoading: false });
            }
          );
    });
  }
  /** 审核 */
  function handleAudit(type: string) {
    const { id } = state;
    switch (type) {
      case 'pass':
        setStateWrap({ auditLoading: true });
        rightsConsumerService.auditVoucher({ equityConsumeRecordId: id, isPass: true }).subscribe(
          () => {
            handleSearch();
            setStateWrap({ auditLoading: false });
            ShowNotification.success('审核通过');
            handleToggleModal('visibleDetail');
          },
          () => {
            setStateWrap({ auditLoading: false });
          }
        );
        break;
      case 'refuse':
        auditForm.validateFields().then((formValue: Record<string, any>) => {
          setStateWrap({ auditLoading: true });
          rightsConsumerService
            .auditVoucher({ equityConsumeRecordId: id, isPass: false, remark: formValue.remark })
            .subscribe(
              () => {
                handleSearch();
                setStateWrap({ auditLoading: false });
                ShowNotification.success('审核拒绝');
                handleToggleModal('auditVisible');
                handleToggleModal('visibleDetail');
              },
              () => {
                setStateWrap({ auditLoading: false });
              }
            );
        });
        break;
      default:
        break;
    }
  }

  return {
    state,
    addOrder,
    handleSearch,
    formRef,
    tableAction,
    changeTablePageIndex,
    handleOk,
    exportExcel,
    refForm,
    toggleModal,
    toggleModal2,
    imageForm,
    handleUpload,
    auditForm,
    handleButton,
    handleToggleModal,
    handleAudit
  };
}
