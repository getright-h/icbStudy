import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import moment from 'moment';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ReserveManageService } from '~/solution/model/services/reserve-manage.service';
import { AppointPagedListData } from '~/solution/model/dto/reserve-manage.dto';
import { AppointStateEnum } from '~/solution/shared/enums/reserve.enum';
import { ActionType, ConfirmTextByBookState, IReserveListState } from './reserve-list.interface';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';
import { debounce } from 'lodash';

export function useReserveListStore() {
  const { state, setStateWrap, getState } = useStateStore(new IReserveListState());
  const reserveManageService = new ReserveManageService();
  const formRef = useForm();
  const currentRow = useRef<AppointPagedListData>();
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
    isSearch && setStateWrap({ searchForm: { ...state.searchForm, index: 1 } });
    const v = formRef.getFieldsValue();
    const params = {
      ...v,
      begin:
        v.createTime && v.createTime[0]
          ? moment(v.createTime[0])
              .set({ hours: 0, minutes: 0, seconds: 0 })
              .valueOf()
          : undefined,
      end:
        v.createTime && v.createTime[1]
          ? moment(v.createTime[1])
              .set({ hours: 23, minutes: 59, seconds: 59 })
              .valueOf()
          : undefined,
      beginTime:
        v.reserveTime && v.reserveTime[0]
          ? moment(v.reserveTime[0])
              .set({ hours: 0, minutes: 0, seconds: 0 })
              .valueOf()
          : undefined,
      endTime:
        v.reserveTime && v.reserveTime[1]
          ? moment(v.reserveTime[1])
              .set({ hours: 23, minutes: 59, seconds: 59 })
              .valueOf()
          : undefined,
      type: -1,
      ...getState().searchForm
    };
    setStateWrap({
      isLoading: true
    });
    reserveManageService.appointPagedList(params).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total });
      },
      () => {
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
  function handleExport() {
    console.log('export');
  }
  function tableAction(row: any, actionName: number) {
    currentRow.current = row;
    switch (actionName) {
      case ActionType.DETAIL:
        setStateWrap({ detailVisible: true });
        break;
      case ActionType.CONFIRM:
        showConfirmModal('Confirm', row);
        break;
      case ActionType.REACH:
        showConfirmModal('Finished', row);
        break;
      case ActionType.CANCEL:
        showConfirmModal('Cancel', row);
        break;
      default:
        break;
    }
  }
  function changeTablePageIndex(index: number, size: number) {
    setStateWrap({ searchForm: { index, size } });
    handleSearch();
  }
  function modalClose() {
    setStateWrap({ detailVisible: false });
  }

  function showConfirmModal(type: string, data: any) {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: ConfirmTextByBookState[AppointStateEnum[type]].content,
      onOk: () =>
        new Promise((resolve, reject) => {
          setCurrentAppointmentState(
            data.id,
            AppointStateEnum[type],
            ConfirmTextByBookState[AppointStateEnum[type]].hint,
            resolve,
            reject
          );
        })
    });
  }

  function setCurrentAppointmentState(id: string, state: number, message: string, resolve: any, reject: any) {
    reserveManageService.setAppointmentState({ id, state }).subscribe(
      res => {
        ShowNotification.success(message);
        handleSearch();
        resolve();
      },
      err => {
        reject();
      }
    );
  }

  return { state, formRef, currentRow, handleSearch, handleExport, tableAction, changeTablePageIndex, modalClose };
}
