import { useEffect } from 'react';
import { debounce } from 'lodash';
import { useService, useStateStore, CommonUtil } from '@fch/fch-tool';
import { useForm, ShowNotification } from '@fch/fch-shop-web';
import { IMaintainNotifyListState } from './maintain-notify-list.interface';
import { useGetDistributor } from '@/solution/model/services/common-hooks.service';
import { MaintainNotifyService } from '@/solution/model/services/maintain-notify.service';
import {
  BackgroundResType,
  BatchRemindReqType,
  FollowReqType,
  RecordReqType,
  RemindReqType
} from '~/solution/model/dto/maintain-notify.dto';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
let currentRow: BackgroundResType = null;
export function useMaintainNotifyListStore() {
  const { state, setStateWrap } = useStateStore(new IMaintainNotifyListState());
  const { data, refetch } = useGetDistributor();
  const form = useForm();
  const formNotify = useForm();
  const formCalibration = useForm();
  const formMaintainFollow = useForm();
  const formMaintainRegistration = useForm();
  const maintainNotifyService: MaintainNotifyService = useService(MaintainNotifyService);
  const history = useHistory();
  let privateSingle = false;
  useEffect(() => {
    handleSearch();
  }, []);
  useEffect(() => {
    form.setSchema('distributorId', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
    });
  });

  function handleSearch(page = 1, size = 10, maintainStatus?: number[]) {
    const formValues = form.getFieldsValue();
    const req: any = Object.assign({}, formValues, {
      size,
      index: page,
      maintainStatus
    });
    setStateWrap({ isLoading: true });
    maintainNotifyService.distributor(req).subscribe(
      res => {
        setStateWrap({
          isLoading: false,
          tableData: res.dataList,
          total: res.total,
          soonAccount: res.soonAccount,
          overTimeAccount: res.overTimeAccount
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }

  function handleResetSearch() {
    form.resetFields();
    handleSearch();
  }

  function tableAction(row: any, actionName: string) {
    currentRow = row;
    if (actionName == '校准') {
      toggleModal('isVisibleModalCalibration');
      setStateWrap({
        title: '校准设置'
      });
      formCalibration.setFieldsValue({
        mileage: row.mileage
      });
    }
    if (actionName == '提醒') {
      privateSingle = true;
      toggleModal('isVisibleModalNotify');
      formNotify.resetFields();
    }
    if (actionName == '跟进') {
      toggleModal('isVisibleModalMaintainFollow');
      formMaintainFollow.resetFields();
    }
    if (actionName == '保养登记') {
      setStateWrap({
        title: '新增保养项目'
      });
      formMaintainRegistration.resetFields();
      formMaintainRegistration.setSchema('addCheckBox', schema => {
        schema.props.onClick = handleCancelCalibration;
        return schema;
      });
      handleSearchProjectList();
      toggleModal('isVisibleModalMaintainRegistration');
    }

    if (actionName == '跟进次数') {
      getFollowListCount();
    }
    if (actionName == '提醒次数') {
      getNotifyListCount();
    }
    if (actionName == '保养次数') {
      history.push('maintainLogsList?vehicleId=' + currentRow.vehicleId);
    }
  }

  function handleSearchProjectList() {
    maintainNotifyService.maintainGetProjectListDistributor(currentRow.distributorId).subscribe(res => {
      formMaintainRegistration.setSchema('contentRange', schema => {
        schema.props.options = res;
        return schema;
      });
    });
  }

  function getNotifyListCount(page = 1, size = 10) {
    const req = {
      vehicleId: currentRow.vehicleId,
      index: page,
      size
    };
    setStateWrap({ isLoadingModalNotify: true });
    maintainNotifyService.maintainRemindList(req).subscribe(res => {
      setStateWrap({
        isLoadingModalNotify: false,
        tablesNotifyListModalData: res.dataList,
        totalsNotifyListModal: res.total
      });
      toggleModal('isVisibleModalNotifyList');
    });
  }

  function changeTablePageNotifyListIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchsNotifyListModalForm: {
        size: pageSize,
        index
      }
    });
    getNotifyListCount(index, pageSize);
  }
  function getFollowListCount(page = 1, size = 10) {
    const req = {
      vehicleId: currentRow.vehicleId,
      index: page,
      size
    };
    setStateWrap({ isLoadingModalNotify: true });
    maintainNotifyService.maintainFollowList(req).subscribe(res => {
      console.log('res===>', res.dataList);
      setStateWrap({
        isLoadingModalNotify: false,
        tablesFollowListModalData: res.dataList,
        totalsFollowListModal: res.total
      });
      toggleModal('isVisibleModalFollowList');
    });
  }
  function changeTablePageFollowListIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchsFollowListModalForm: {
        size: pageSize,
        index
      }
    });
    getFollowListCount(index, pageSize);
  }
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
  // 处理弹框的显示隐藏
  function toggleModal(key: string) {
    setStateWrap({
      [key]: !state[key]
    });
  }
  // 提醒功能
  function handleOk() {
    const formValue = formNotify.getFieldsValue();
    if (privateSingle) {
      const req = Object.assign({ vehicleId: currentRow.vehicleId }, formValue) as RemindReqType;
      setStateWrap({ isLoadingModalNotify: true });
      maintainNotifyService.remind(req).subscribe(
        res => {
          setStateWrap({ isLoadingModalNotify: false });
          handleSearch();
          toggleModal('isVisibleModalNotify');
        },
        () => {
          setStateWrap({ isLoadingModalNotify: false });
        }
      );
    } else {
      const req = Object.assign({ vehicleId: state.selectedRowKeys }, formValue) as BatchRemindReqType;
      setStateWrap({ isLoadingModalNotify: true });
      maintainNotifyService.batchRemind(req).subscribe(
        res => {
          setStateWrap({ isLoadingModalNotify: false });
          handleSearch();
          toggleModal('isVisibleModalNotify');
        },
        () => {
          setStateWrap({ isLoadingModalNotify: false });
        }
      );
    }
  }

  function handleCancel() {
    toggleModal('isVisibleModalNotify');
  }

  function handleOkCalibration() {
    const { mileage, item } = formCalibration.getFieldsValue();
    if (state.title === '新增保养项目') {
      maintainNotifyService.distributorInsert({ item, distributorId: currentRow.distributorId }).subscribe(res => {
        handleSearchProjectList();
        handleCancelCalibration();
      });
      return;
    }

    maintainNotifyService
      .adjust({
        vehicleId: currentRow.vehicleId,
        mileage
      })
      .subscribe(res => {
        ShowNotification.success('设置成功');
        handleSearch();
        handleCancelCalibration();
      });
  }

  function handleCancelCalibration() {
    toggleModal('isVisibleModalCalibration');
  }

  function handleOkMaintainFollow() {
    const formValue = formMaintainFollow.getFieldsValue();
    const req = Object.assign({ vehicleId: currentRow.vehicleId }, formValue) as FollowReqType;
    setStateWrap({ isLoadingModalMaintainFollow: true });
    maintainNotifyService.follow(req).subscribe(
      res => {
        setStateWrap({ isLoadingModalMaintainFollow: false });
        handleSearch();
        handleCancelMaintainFollow();
      },
      () => {
        setStateWrap({ isLoadingModalMaintainFollow: false });
      }
    );
  }

  function handleCancelMaintainFollow() {
    toggleModal('isVisibleModalMaintainFollow');
  }

  function handleOkMaintainRegistration() {
    formMaintainRegistration.validateFields().then(values => {
      const req = Object.assign({}, values, {
        currentMaintenanceTime: moment(values.currentMaintenanceTime).format('YYYY-MM-DD HH:mm:ss'),
        nextMaintenanceTime: moment(values.nextMaintenanceTime).format('YYYY-MM-DD HH:mm:ss'),
        vehicleId: currentRow.vehicleId
      }) as RecordReqType;
      console.log('values===>', req);
      maintainNotifyService.record(req).subscribe(res => {
        ShowNotification.success('操作成功');
        handleSearch();
        handleCancelMaintainRegistration();
      });
    });
  }

  function handleCancelMaintainRegistration() {
    toggleModal('isVisibleModalMaintainRegistration');
  }

  function handleExportExcel() {
    const formValues = form.getFieldsValue();
    const req: any = Object.assign({}, formValues, {
      size: state.searchForm.size,
      index: state.searchForm.index
    });
    setStateWrap({ isExportLoading: true });
    maintainNotifyService.exportDistributor(req).subscribe(
      (res: string) => {
        console.log('res===>', res);
        CommonUtil.downFile(res, `${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
        setStateWrap({
          isExportLoading: false
        });
      },
      () => {
        setStateWrap({
          isExportLoading: false
        });
      },
      () => {}
    );
  }

  function onSelectChange(selectedRowKeys: any) {
    setStateWrap({
      selectedRowKeys
    });
  }

  return {
    state,
    form,
    handleSearch,
    handleResetSearch,
    tableAction,
    changeTablePageIndex,
    handleOk,
    handleCancel,
    formNotify,
    toggleModal,
    handleOkCalibration,
    handleCancelCalibration,
    formCalibration,
    formMaintainFollow,
    handleOkMaintainFollow,
    handleCancelMaintainFollow,
    formMaintainRegistration,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    handleExportExcel,
    onSelectChange,
    changeTablePageNotifyListIndex,
    changeTablePageFollowListIndex
  };
}
