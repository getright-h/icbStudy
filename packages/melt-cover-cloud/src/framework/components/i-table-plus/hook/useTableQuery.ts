import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useStateStore } from '@fch/fch-tool';
import { useEffect } from 'react';
import { Observable } from 'rxjs';

export class ITableState<res> {
  tableData?: res;
  isLoading = false;
  pageIndex = 1;
  pageSize?: number;
}

export interface IUseTableParams<res, req> {
  form: any;
  /** require 必须在其Service的构造方法中进行this绑定，或使用箭头函数定义require，不然会找不到this */
  require: (params: req) => Observable<res>;
  /**
   * @params `formValues` Form中的值
   * @return `require` 请求的参数
   * @des 自定义请求参数
   */
  customParamsFn?: (formValues: Record<string, any>) => req;
  /** 是否预载数据，即自动调用 getTableData */
  isPreload?: boolean;
  /** useMutation 的 options 配置项*/
  mutationOptions?: Omit<UseMutationOptions<res, any, req, any>, 'mutationFn'>;
  pageSize?: number;
}

export interface TableActions {
  /** 页码，页数变化事件 */
  changeTablePageIndex: (pageIndex: number, pageSize: number) => void;
  /** 根据form索引数据 */
  searchClick: () => void;
  /** 重置表格 */
  resetClick: () => void;
}

export type IUseTableRes<res, req> = {
  /** 表格相关状态 */
  tableState: ITableState<res>;
  /** useMutation的所有返回值 */
  mutationResult: UseMutationResult<res, any, req, any>;
  /** 获取表格数据 */
  getTableData: () => void;
  /** 表格相关事件 */
  tableActions: TableActions;
};

/** 使用reactQuery 的 useMutation 封装了 table 相关的状态与逻辑 */
export function useTableQuery<res, req>(params: IUseTableParams<res, req>): IUseTableRes<res, req> {
  const { form, require, mutationOptions, customParamsFn, isPreload = true, pageSize = 10 } = params;
  const defaultSate = { ...new ITableState<res>(), pageSize };
  const { state, setStateWrap, getState } = useStateStore(defaultSate);
  const mutationRes = useMutation<res, any, req, any>((params) => require(params).toPromise(), mutationOptions);
  useEffect(() => {
    isPreload && getTableData();
  }, []);

  function getTableData() {
    const { pageIndex, pageSize } = getState();
    form.validateFields().then((values: any) => {
      const formData = customParamsFn ? customParamsFn(values) : values;
      const params = {
        ...formData,
        index: pageIndex,
        size: pageSize,
      };
      mutationRes.mutate(params);
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
    tableState: { ...state, tableData: mutationRes.data, isLoading: mutationRes.isLoading },
    mutationResult: mutationRes,
    getTableData,
    tableActions: { changeTablePageIndex, searchClick, resetClick },
  };
}
