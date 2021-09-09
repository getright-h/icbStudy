import { useEffect } from 'react';
import { Store } from 'antd/lib/form/interface';
import { getQueryString, useStateStore, CommonUtil, useService } from '@fch/fch-tool';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import moment from 'moment';
import { debounce } from 'lodash';
import { IMaintainLogsListState } from './maintain-logs-list.interface';
import { RecordReqType } from '~/solution/model/dto/maintain-notify.dto';
import { MaintainNotifyService } from '@/solution/model/services/maintain-notify.service';
import { useGetDistributor } from '@/solution/model/services/common-hooks.service';
import {
  usePostDistributor,
  useExportLog,
  useGetVehicle,
  useInsertCustomItem
} from '@/solution/model/services/maintain-logs.service';

export function useMaintainLogsListStore() {
  const { state, setStateWrap } = useStateStore(new IMaintainLogsListState());
  const form = useForm();
  const formMaintainRegistration = useForm();
  const formCalibration = useForm();
  const maintainNotifyService: MaintainNotifyService = useService(MaintainNotifyService);
  const { data: distributorList, refetch: getDistributor } = useGetDistributor();
  const { maintainLogData, refetch: getMaintainLog, isLoading, currParams: preParams } = usePostDistributor();
  const { refetch: exportLog, isLoading: exportLoading } = useExportLog();
  const { refetch: getVehicleList, options: VehicleList } = useGetVehicle();
  const { refetch: insertCustomItem, isLoading: insertLoading } = useInsertCustomItem();
  const vehicleId = getQueryString('vehicleId');
  useEffect(() => {
    initBind();
    handleSearch();
  }, []);
  // 动态渲染所属机构列表
  useEffect(() => {
    formMaintainRegistration.setSchema('distributorId', schema => {
      schema.props.options = distributorList;
    });
  }, [distributorList]);
  // 动态渲染车牌号列表
  useEffect(() => {
    formMaintainRegistration.setSchema('vehicleId', schema => {
      schema.props.options = VehicleList;
    });
  }, [VehicleList]);

  const watch = {
    distributorId: (value: Store, values: Store) => {
      handleSearchProjectList(value.distributorId);
      if (values.ownerMobile) {
        getVehicleList({ distributorId: value.distributorId, ownerMobile: values.ownerMobile });
      }
    },
    ownerMobile: (value: Store, values: Store) => {
      if (values.distributorId) {
        getVehicleList({ ownerMobile: value.ownerMobile, distributorId: values.distributorId });
      }
    }
    // vehicleId: (value: Store) => {
    //   handleSearchProjectList();
    // }
  };

  function initBind() {
    formMaintainRegistration.setSchemas({
      distributorId: schema => {
        schema.props.onSearch = debounce((name: string) => {
          getDistributor({ name });
        }, 800);
      },
      addCheckBox: schema => {
        schema.props.onClick = handleCancelCalibration;
      }
    });
  }

  function handleExportExcel() {
    const formValues = form.getFieldsValue();
    const req = Object.assign({}, formValues, {
      size: maintainLogData.size,
      index: maintainLogData.index,
      vehicleId,
      startTime:
        formValues.time && formValues.time[0]
          ? moment(formValues.time[0]).set({ hours: 0, minutes: 0, seconds: 0 }) // yy:mm:dd 59:59:59
          : undefined,
      endTime:
        formValues.time && formValues.time[1]
          ? moment(formValues.time[1]).set({ hours: 23, minutes: 59, seconds: 59 }) // yy:mm:dd 59:59:59
          : undefined
    }) as any;

    exportLog(
      { req },
      {
        successFn: (res: any) => {
          CommonUtil.downFile(res, `保养记录${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
        }
      }
    );
  }

  function handleSearch() {
    const formValues = form.getFieldsValue();
    const req = Object.assign({}, preParams, formValues, {
      index: 1,
      vehicleId,
      startTime:
        formValues.time && formValues.time[0]
          ? moment(formValues.time[0]).set({ hours: 0, minutes: 0, seconds: 0 }) // yy:mm:dd 59:59:59
          : undefined,
      endTime:
        formValues.time && formValues.time[1]
          ? moment(formValues.time[1]).set({ hours: 23, minutes: 59, seconds: 59 }) // yy:mm:dd 59:59:59
          : undefined
    }) as any;
    getMaintainLog({ req });
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    getMaintainLog({ ...preParams, index, size: pageSize });
  }

  function handleOkMaintainRegistration() {
    formMaintainRegistration.validateFields().then(values => {
      const req = Object.assign({}, values, {
        currentMaintenanceTime: moment(values.currentMaintenanceTime).format('YYYY-MM-DD HH:mm:ss'),
        nextMaintenanceTime: moment(values.nextMaintenanceTime).format('YYYY-MM-DD HH:mm:ss')
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

  function handleCancelCalibration() {
    toggleModal('isVisibleModalCalibration');
  }

  function handleAdd() {
    handleSearchProjectList();
    formMaintainRegistration.resetFields();
    handleCancelMaintainRegistration();
  }
  function handleSearchProjectList(distributorId?: string) {
    const formValues = formMaintainRegistration.getFieldsValue();
    maintainNotifyService
      .maintainGetProjectListDistributor(distributorId || formValues.distributorId)
      .subscribe((res: any) => {
        formMaintainRegistration.setSchema('contentRange', schema => {
          schema.props.options = res;
          return schema;
        });
      });
  }

  // 新增自定义保养项目
  function insertItem() {
    if (formCalibration.getFieldValue('item')?.trim() === '') {
      ShowNotification.warning('项目名不可为空');
    } else {
      formCalibration.validateFields().then(() => {
        insertCustomItem(formCalibration.getFieldsValue(), {
          successFn: () => {
            handleSearchProjectList(formMaintainRegistration.getFieldValue('distributorId'));
            handleCancelCalibration();
          }
        });
      });
    }
  }

  // 处理弹框的显示隐藏
  function toggleModal(key: string) {
    setStateWrap({
      [key]: !state[key]
    });
  }
  return {
    state,
    form,
    maintainLogData,
    isLoading,
    exportLoading,
    changeTablePageIndex,
    handleSearch,
    handleExportExcel,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    formMaintainRegistration,
    formCalibration,
    handleAdd,
    watch,
    insertLoading,
    handleCancelCalibration,
    insertItem
  };
}
