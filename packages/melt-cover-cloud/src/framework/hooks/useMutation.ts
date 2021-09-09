import { useCallback, useEffect } from 'react';
import { useStateStore } from '@fch/fch-tool';
import { FchMessage } from '@fch/fch-shop-web';
import { RequestService } from '../util/base-http/request.service';

export class IFetchProps {
  url: string;
  method: string;
  params: any;
  message?: string; // 可选，如果传值表示请求完成后页面会提示对应结果，传入对应操作名
  callbacks?: Callbacks; // 可选，可传入请求完成后需要进行的操作
}

interface Callbacks {
  successFn?: (res: any, ...params: any) => any;
  errorFn?: (...params: any) => any;
  finalFn?: (...params: any) => any;
}
class IState {
  data: any;
  isLoading: boolean; // 触发页面的loading效果
  currParams: any; // 保存每次请求接口的请求数据
}

export default function useMutation(props: IFetchProps, isInitFetch = true) {
  const { method, url, params, message } = props;
  const { state, setStateWrap } = useStateStore(new IState());
  const requestService: RequestService = new RequestService();
  const $ajax = useCallback(
    (params?: any, callbacks?: Callbacks) => {
      setStateWrap({ isLoading: true });
      requestService[method]?.(url, params).subscribe(
        (res: any) => {
          setStateWrap({
            data: res,
            currParams: params
          });
          message && FchMessage.success(message + '成功');
          setStateWrap({ isLoading: false });
          callbacks?.successFn && callbacks.successFn(res);
        },
        () => {
          message && FchMessage.warning(message + '失败');
          setStateWrap({ isLoading: false });
          callbacks?.errorFn && callbacks.errorFn();
        },
        () => {
          callbacks?.finalFn && callbacks.finalFn();
        }
      );
    },
    [method, url, params, message]
  );

  useEffect(() => {
    if (!isInitFetch) return;
    $ajax(params);
  }, []);
  return { ...state, refetch: $ajax };
}
