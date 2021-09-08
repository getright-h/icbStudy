import { IISelectLoadingState, IISelectLoadingProps } from './i-select-loading.interface';
import { useStateStore, useDebounceFn } from '@fch/fch-tool';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { Subscription } from 'rxjs';
import { RequestService } from './web-http-service';

export function useISelectLoadingStore(props: IISelectLoadingProps) {
  const {
    reqUrl,
    searchKeyName = 'name',
    pageSize = 50,
    searchKey = '',
    searchForm,
    responseDataStructure = [],
    createAuthHeaders = () => {},
    backLoginFunction = () => {},
    methodType = 'post'
  } = props;
  const { state, setStateWrap } = useStateStore(new IISelectLoadingState());
  const drapChooseLoadingService = new RequestService(createAuthHeaders, backLoginFunction);
  let getOptionListSubscription: Subscription;
  const searchParams = useRef({
    ...searchForm,
    index: 1,
    size: pageSize,
    [searchKeyName]: searchKey
  });
  const resultTotal = useRef(0);
  const resultList: { current: any } = useRef([]);

  function getOptionList(isSearch = false) {
    const { optionList } = state;

    setStateWrap({ fetching: true });
    getOptionListSubscription = drapChooseLoadingService[methodType](reqUrl, searchParams.current).subscribe(
      (res: any) => {
        if (res) {
          resultList.current = res || [];
          responseDataStructure.forEach((key, index) => {
            resultList.current = resultList.current[key];
            if (index == responseDataStructure.length - 1) {
              resultTotal.current = resultList.current?.total;
            }
          });

          /** 如果当前返回的数据为 [] */
          if (!resultList.current.length) {
            searchParams.current.index = 1;
            setStateWrap({ fetching: false });
          }

          const newOptionList = [...(isSearch ? [] : optionList), ...resultList.current];
          setStateWrap({ optionList: newOptionList, fetching: false });
        } else if (searchParams.current.index == 1 && (!res || !res.dataList)) {
          setStateWrap({ optionList: [], fetching: false });
        } else {
          searchParams.current.index--;
          setStateWrap({ fetching: false });
        }
      },
      (error: string) => {
        setStateWrap({ fetching: false });
        console.log(error);
      }
    );
  }

  const fetchOptions = useDebounceFn(
    (isSearch?: boolean, value?: string) => {
      if (isSearch) {
        searchParams.current.index = 1;
        searchParams.current[searchKeyName] = value || '';
      }
      getOptionList(true);
    },
    300,
    []
  );

  const structureDealWith = (value: { [x: string]: any }, structure: any[]) => {
    let result = '';
    structure.forEach((key: string | number) => {
      result += (value[key] || '') + ' ';
    });

    return result;
  };

  function optionScroll(e: any) {
    e.persist();
    const { optionList } = state;
    // 如果已经获取了全部数据则不发起请求
    if (optionList.length && optionList.length == resultTotal.current) {
      return;
    }
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      searchParams.current.index++;
      getOptionList();
    }
  }

  useEffect(() => {
    props.searchKey && fetchOptions(true, props.searchKey);
  }, [props.searchKey]);

  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);

  return { state, optionScroll, fetchOptions, structureDealWith };
}
