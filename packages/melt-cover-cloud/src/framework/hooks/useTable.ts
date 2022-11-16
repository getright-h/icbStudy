import { TypeUseForm } from '@fch/fch-shop-web';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { Observable, Subscription } from 'rxjs';

export type tableDataType<res> = res extends {
  total: number;
  dataList: infer D;
}
  ? D
  : res;

export class ITableState<T> {
  tableData: tableDataType<T>;
  isLoading = false;
  pageIndex = 1;
  pageSize: number;
  total = 0;
}
export interface IUseTableParams<res, req> {
  form: TypeUseForm;
  /** require 必须在其Service的构造方法中进行this绑定，或使用箭头函数定义require，不然会找不到this */
  require: (params: req) => Observable<res>;
  /**
   * @params `formValues` Form中的值
   * @return `require` 请求的参数
   * @des 自定义请求参数
   */
  customParamsFn?: (formValues: any) => Partial<req> & Record<string, any>;
  /** 是否预载数据，即自动调用 getTableData */
  isPreload?: boolean;
  /** table 数据是否在 data.dataList中获取, 默认true */
  resIsDataList?: boolean;
  pageSize?: number;
  /** 清除数据后才拉取 */
  clearDataAfterFetch?: boolean;
}

export interface TableActions {
  /** 页码，页数变化事件 */
  changeTablePageIndex: (pageIndex: number, pageSize: number) => void;
  /** 根据form索引数据 */
  searchClick: () => void;
  /** 重置表格 */
  resetClick: () => void;
}

export interface IUseTableRes<res> {
  /** table相关的 state */
  tableState: ITableState<res>;
  /** 获取表格数据 */
  getTableData: () => void;
  /** 表格相关事件 */
  tableActions: TableActions;
}

/** 抽离了 table 相关的状态与逻辑 */
export function useTable<res, req>(params: IUseTableParams<res, req>): IUseTableRes<res> {
  const {
    form,
    require,
    customParamsFn,
    isPreload = true,
    pageSize = 10,
    resIsDataList = true,
    clearDataAfterFetch = false
  } = params;
  const defaultSate = { ...new ITableState<res>(), pageSize };
  const { state, setStateWrap, getState } = useStateStore(defaultSate);
  const subscription = useRef<Subscription>();

  useEffect(() => {
    isPreload && getTableData();
    return () => {
      subscription.current && subscription.current.unsubscribe();
    };
  }, []);

  function getTableData() {
    const { pageIndex, pageSize } = getState();
    form.validateFields().then(values => {
      setStateWrap({ isLoading: true });
      clearDataAfterFetch && setStateWrap({ tableData: [] as undefined });
      const formData = customParamsFn ? customParamsFn(values) : values;
      subscription.current = require({
        index: pageIndex,
        size: pageSize,
        ...formData
      }).subscribe(
        (res: any) => {
          const tableData = resIsDataList ? res.dataList : res;
          const total = res?.total ?? res?.length;
          setStateWrap({ tableData, total, isLoading: false });
        },
        () => {
          setStateWrap({ isLoading: false });
        }
      );
    });
  }

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  function searchClick() {
    changeTablePageIndex(1, state.pageSize);
  }

  function resetClick() {
    form.resetFields();
    searchClick();
  }

  return {
    tableState: state,
    getTableData,
    tableActions: { changeTablePageIndex, searchClick, resetClick }
  };
}
