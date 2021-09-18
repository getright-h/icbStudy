import { useEffect } from 'react';
import { CommonUtil, useStateStore } from '@fch/fch-tool';
import { useForm, ShowNotification } from '@fch/fch-shop-web';
import moment from 'moment';
import { debounce } from 'lodash';
import { RightsConsumerService } from '~/solution/model/services/rights-consumer.service';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';
import { IRightsConsumerListState } from './rights-consumer-list.interface';

export function useRightsConsumerListStore() {
  const { state, setStateWrap } = useStateStore(new IRightsConsumerListState());
  const formRef = useForm();
  const refForm = useForm();
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
    console.log('===>', formRef.getFieldsValue());
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

  function tableAction(row: any, actionName: string) {
    switch (actionName) {
      case '详情':
        getDetailConsume(row.id);
        toggleModal2();
        break;
      case '待核销':
        toggleModal();
        setStateWrap({ id: row.id });
        break;
      default:
        break;
    }
  }
  function changeTablePageIndex(page: number, size: number) {
    setStateWrap({ searchForm: { index: page, size } });
    handleSearch(page, size);
  }

  function addOrder() {
    toggleModal();
  }
  // 导出
  function exportExcel() {
    console.log('导出');
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
    rightsConsumerService.exportConsumeList(params).subscribe(
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
    setVerification();
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
    rightsConsumerService.queryConsumePagedList(params ? params : state.searchForm).subscribe(
      res => {
        res.dataList.map((item: any) =>
          item.operationType === 2
            ? (item.discountPriceDisplay = '1次')
            : (item.discountPriceDisplay = item.discountPrice)
        );
        console.log(res.dataList);

        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 获取详情数据
  function getDetailConsume(id: string) {
    rightsConsumerService.getDetailConsume({ id }).subscribe(
      res => {
        setStateWrap({ detail: res });
      },
      err => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  // 核销
  function setVerification() {
    rightsConsumerService.setVerification({ id: state.id, verCode: refForm.getFieldsValue().verCode }).subscribe(
      res => {
        console.log(res);
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
    toggleModal2
  };
}
