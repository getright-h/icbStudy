import { SelectProps, SelectValue } from 'antd/lib/select';
/**
 * @export state变量定义和初始化
 * @class IISelectLoadingState
 */
export class IISelectLoadingState {
  fetching = false;
  optionList: Array<any> = [];
  value: string;
}
/**
 * @export
 * @interface IISelectLoadingProps
 * @extends {SelectProps<SelectValue>}
 * @param width 设置宽度
 * @param searchKey 默认搜索的key值
 * @param reqUrl 请求的url全路径
 * @param searchForm 除了searchKeyName 之外其他的搜索条件
 * @param pageSize 
 * @param responseDataStructure 比如 ["data", "dataList"] 表示要取 res.data.dataList的值 现阶段一般只有一层
 * @param labelDataStructure  默认 ["name"] 比如 ["name", "organizationName"] 显示的拼凑字段 {`${item.name}（${item.organizationName}）`}
 * @param keyDataStructure 同上 默认 ["id"]
 * @param valueDataStructure 同上 默认 ["id"]
 * @param createAuthHeaders 返回 自定义的header
 * @param 当返回401 做的自主处理 
 * 
 * ``` typescript
 * function createAuthHeaders() {
      const headers = { token: '' };
      const token = StorageUtil.getLocalStorage('TOKENINFO');
      if (token) {
        headers.token = token;
      }
      return headers;
    }

    function backLoginFunction() {
      StorageUtil.removeLocalStorage('TOKENINFO');
      history.push('/login');
    }
 * ```
 * 
 */
export interface IISelectLoadingProps extends SelectProps<SelectValue> {
  width?: number | string;
  reqUrl?: string;
  searchForm?: Record<string, any>;
  searchKey?: string;
  pageSize?: number;
  searchKeyName?: string;
  responseDataStructure?: Array<string>;
  labelDataStructure?: Array<string>;
  keyDataStructure?: Array<string>;
  valueDataStructure?: Array<string>;
  createAuthHeaders?: () => void;
  backLoginFunction?: () => void;
  methodType?: 'get' | 'post' | 'put' | 'delete';
}
