import { useStateStore, getQueryString, CommonUtil } from '@fch/fch-tool';
import { useForm, ISelectType, ShowNotification } from '@fch/fch-shop-web';
import { useEffect } from 'react';
import moment from 'moment';
import { IMaintainLogsListState } from './maintain-logs-list.interface';
import { RecordReqType } from '~/solution/model/dto/maintain-notify.dto';
import { MaintainLogsService } from '~/solution/model/services/maintain-logs.service';
import { MaintainNotifyService } from '~/solution/model/services/maintain-notify.service';
import { CommonUtilService } from '~/solution/model/services/common-util.service';
import { useInsertCustomItem } from '~/solution/model/services/maintain-logs.service';
import { Store } from 'antd/lib/form/interface';

export function useMaintainLogsListStore() {
  const { state, setStateWrap } = useStateStore(new IMaintainLogsListState());
  const form = useForm();
  const formMaintainRegistration = useForm();
  const formCalibration = useForm();
  const maintainLogsService: MaintainLogsService = new MaintainLogsService();
  const maintainNotifyService: MaintainNotifyService = new MaintainNotifyService();
  const commonUtilService: CommonUtilService = new CommonUtilService();
  const { refetch: insertCustomItem, isLoading: insertLoading } = useInsertCustomItem();
  const vehicleId = getQueryString('vehicleId');
  let ST: any = null;
  useEffect(() => {
    initBind();
    handleSearchOrg();
    handleSearch();
  }, []);

  const watch = {
    distributorId: (value: Store, values: Store) => {
      console.log('value===>', value, values);
      handleSearchProjectList(value.distributorId);
      if (values.ownerMobile) {
        handleGet({ distributorId: value.distributorId, ownerMobile: values.ownerMobile });
      }
    },
    ownerMobile: (value: Store, values: Store) => {
      console.log('value===>', value, values);
      if (values.distributorId) {
        handleGet({ distributorId: values.distributorId, ownerMobile: value.ownerMobile });
      }
    }
    // vehicleId: (value: Store) => {
    //   handleSearchProjectList();
    // }
  };

  function initBind() {
    formMaintainRegistration.setSchemas({
      addCheckBox: schema => {
        schema.props.onClick = handleCancelCalibration;
      }
    });
  }

  function handleGet(params: { distributorId: string; ownerMobile: string }) {
    maintainLogsService.backGround({ ...params, index: 1, size: 1000 }).subscribe(res => {
      formMaintainRegistration.setSchemas({
        vehicleId: schema => {
          const orgOptions = res?.dataList?.map(org => {
            return {
              label: org.vehiclePlateNumber,
              value: org.vehicleId
            };
          });
          schema.props.options = orgOptions;
        }
      });
    });
  }

  function handleSearchOrg(value?: string) {
    clearTimeout(ST);
    ST = setTimeout(() => {
      getOrgList(value);
    }, 800);
  }

  // 获取机构列表
  function getOrgList(name?: string) {
    commonUtilService.AddOrderOrgCanSelect(name).subscribe(res => {
      const orgOptions = res?.map(org => {
        return {
          label: org.name,
          value: org.id
        };
      });
      formMaintainRegistration.setSchema('distributorId', (schema: ISelectType) => {
        schema.props.options = orgOptions;
        return schema;
      });
    });
  }

  function handleExportExcel() {
    const formValues = form.getFieldsValue();
    const req = Object.assign({}, formValues, {
      size: state.searchForm.size,
      index: state.searchForm.index,
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

    setStateWrap({ isExportLoading: true });
    maintainLogsService.export(req).subscribe(
      (res: string) => {
        console.log('res===>', res);
        CommonUtil.downFile(res, `保养记录${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
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

  function handleSearch(page = 1, size = 10) {
    const formValues = form.getFieldsValue();
    const req = Object.assign({}, formValues, {
      size,
      index: page,
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

    setStateWrap({ isLoading: true });
    maintainLogsService.background(req).subscribe(
      res => {
        setStateWrap({
          isLoading: false,
          tableData: res.dataList,
          total: res.total
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }
  function tableAction(row: any, actionName: string) {
    // if (actionName == '详情') {
    //   history.push('orderDetail?id=' + row.id);
    // }
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
    maintainNotifyService.maintainGetProjectList(distributorId || formValues.distributorId).subscribe(res => {
      formMaintainRegistration.setSchema('contentRange', schema => {
        schema.props.options = res;
        return schema;
      });
    });
  }
  // 新增自定义保养项目
  function insertItem() {
    if (!formMaintainRegistration.getFieldValue('distributorId')) {
      ShowNotification.error('请先选择机构');
    } else if (formCalibration.getFieldValue('item')?.trim() === '') {
      ShowNotification.warning('项目名不可为空');
    } else {
      formCalibration.validateFields().then(() => {
        insertCustomItem(
          {
            item: formCalibration.getFieldValue('item'),
            distributorId: formMaintainRegistration.getFieldValue('distributorId')
          },
          {
            successFn: () => {
              handleSearchProjectList(formMaintainRegistration.getFieldValue('distributorId'));
              handleCancelCalibration();
            }
          }
        );
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
    formCalibration,
    tableAction,
    changeTablePageIndex,
    handleSearch,
    handleExportExcel,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    formMaintainRegistration,
    handleAdd,
    watch,
    insertLoading,
    handleCancelCalibration,
    insertItem
  };
}
