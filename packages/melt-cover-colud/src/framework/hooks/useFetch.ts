import { useCallback, useEffect } from 'react';
import { useStateStore } from '@fch/fch-tool';
import { RequestService } from '../util/base-http/request.service';

export class IFetchProps {
  url: string;
  method: string;
  params: any;
}
class IState {
  data: any;
  loading: any;
}

export default function useFetch(props: IFetchProps, isInitFetch = true) {
  const { method, url, params } = props;
  const { state, setStateWrap } = useStateStore(new IState());
  const requestService: RequestService = new RequestService();
  const $ajax = useCallback(
    (params?: any) => {
      requestService[method]?.(url, params).subscribe((res: any) => {
        setStateWrap({
          data: res
        });
      });
    },
    [method, url, params]
  );

  useEffect(() => {
    if (!isInitFetch) return;
    $ajax(params);
  }, []);
  return { ...state, refetch: $ajax };
}
