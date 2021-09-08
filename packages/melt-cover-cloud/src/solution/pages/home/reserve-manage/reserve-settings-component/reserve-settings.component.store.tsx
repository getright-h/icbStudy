import React, { useEffect, useRef } from 'react';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { useStateStore } from '@fch/fch-tool';
import { ActionType, IReserveSettingsState } from './reserve-settings.interface';
import { ReserveManageService } from '~/solution/model/services/reserve-manage.service';
import { AppointConfigListData } from '~/solution/model/dto/reserve-manage.dto';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';

export function useReserveSettingsStore() {
  const { state, setStateWrap, getState } = useStateStore(new IReserveSettingsState());
  const reserveManageService = new ReserveManageService();
  const formRef = useForm();
  const currentRow = useRef<AppointConfigListData>();
  const { data, refetch } = useGetDistributor();

  useEffect(() => {
    handleSearch(true);
  }, []);

  useEffect(() => {
    formRef.setSchema('distributorId', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
    });
  }, [JSON.stringify(data)]);
  function handleSearch(isSearch = false) {
    console.log('getFieldsValue==>', formRef.getFieldsValue());
    isSearch && setStateWrap({ searchForm: { ...state.searchForm, index: 1 } });
    const v = formRef.getFieldsValue();
    const params = {
      ...v,
      state: -1,
      begin: 0,
      end: 0,
      ...getState().searchForm
    };
    setStateWrap({
      isLoading: true
    });
    reserveManageService.getAppointmentConfigList(params).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total });
      },
      () => {},
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }
  function handleExport() {
    console.log('export');
  }
  function addReserveSetting() {
    currentRow.current = null;
    setStateWrap({ isSettingVisible: true });
  }
  function tableAction(row: any, actionName: number) {
    currentRow.current = row;
    switch (actionName) {
      case ActionType.EDIT:
        setStateWrap({ isSettingVisible: true });
        break;
      case ActionType.DELETE:
        deleteAppointment(row);
        break;
      default:
        break;
    }
  }
  function deleteAppointment(data: any) {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该预约设置吗？',
      onOk: () =>
        new Promise((resolve, reject) => {
          reserveManageService.deleteAppointment([data.id]).subscribe(
            res => {
              ShowNotification.success('删除成功');
              handleSearch();
              resolve(true);
            },
            err => {
              reject();
            }
          );
        })
    });
  }
  function changeTablePageIndex(index: number, size: number) {
    setStateWrap({ searchForm: { index, size } });
    handleSearch();
  }
  function modalClose(isSuccess?: boolean) {
    setStateWrap({ isSettingVisible: false });
    isSuccess && handleSearch();
  }
  return {
    state,
    formRef,
    currentRow,
    handleSearch,
    handleExport,
    addReserveSetting,
    tableAction,
    changeTablePageIndex,
    modalClose
  };
}
