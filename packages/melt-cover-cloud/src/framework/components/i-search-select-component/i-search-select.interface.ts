import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';
import { Observable } from 'rxjs';

/**
 * @export state变量定义和初始化
 * @class IISearchSelectState
 */
export class IISearchSelectState {
  fetching = false;
  optionList: Array<any> = [];
}

export type dataType<res> = res extends {
  total: number;
  dataList: infer D;
}
  ? D extends Array<infer elem>
    ? elem
    : D
  : res;

export type dataListType<res> = res extends { total: number; dataList: infer D } ? D : res;

/**
 * @export props变量定义和初始化
 * @type IISearchSelectProps
 */
export type IISearchSelectProps<req, res> = {
  requestFn: (params: req) => Observable<res>;
  /** 自定义请求参数 */
  searchForm?: Partial<req>;
  searchKey?: string;
  pageSize?: number;
  searchKeyName?: string;
  responseDataStructure?: Array<string>;
  labelDataStructure?: Array<string>;
  keyDataStructure?: Array<string>;
  valueDataStructure?: Array<string>;
  /** 用于拼接 <labelDataStructure>的字符串 */
  labelJoinKey?: string;
  /** 用于拼接 <valueDataStructure>的字符串 */
  valueJoinKey?: string;
  /** 是否预加载下拉框数据 */
  isPreload?: boolean;
  /** 自由渲染 select框的 label */
  renderLabel?: (row: dataType<res>) => React.ReactNode;
  /** 自由渲染 select框的 value */
  renderValue?: (row: dataType<res>) => string | number | boolean;
  /** 自由渲染 select框的 options */
  renderOptions?: (
    row: dataListType<res>
  ) => Array<{ label: React.ReactNode; value: string | number | boolean; info?: any }> | undefined;
  ref?: React.MutableRefObject<any>;
} & SelectProps<SelectValue>;
