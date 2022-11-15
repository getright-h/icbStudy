import { IISearchSelectProps, IISearchSelectState } from './i-search-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { debounceTime, switchMap } from 'rxjs/operators';
import { SelectValue } from 'antd/lib/select';

export function useISearchSelectStore<req, res>(props: IISearchSelectProps<req, res>) {
  const { state, setStateWrap } = useStateStore(new IISearchSelectState());
  const {
    searchKeyName = 'name',
    pageSize = 50,
    searchKey = '',
    searchForm,
    responseDataStructure = [],
    isPreload = false,
    requestFn
  } = props;
  let getOptionListSubscription: Subscription;
  const searchParams = useRef({
    ...searchForm,
    index: 1,
    size: pageSize,
    [searchKeyName]: searchKey
  } as Record<string, any>);
  const resultTotal = useRef(0);
  const resultList: { current: any } = useRef([]);
  const resultOldList: { current: any } = useRef([]);
  const searchChange$ = useRef(new BehaviorSubject({}));
  const guard = useRef(true);

  useEffect(() => {
    isPreload && getOptionList();
  }, []);

  function getOptionList() {
    if (guard.current) {
      const getList = (params: any) => requestFn(params);
      const optionList$: Observable<any> = searchChange$.current
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(switchMap(getList));
      getOptionListSubscription = optionList$.subscribe(
        (res: any) => {
          if (res) {
            resultList.current = res || [];
            const resList = resultList.current;
            responseDataStructure.forEach((key, index) => {
              resultList.current = [...resultOldList.current, ...resList[key]];
              if (index == responseDataStructure.length - 1) {
                resultTotal.current = resList?.total;
              }
            });
            resultOldList.current = resultList.current;
            setStateWrap({ optionList: resultList.current, fetching: false });
          }
        },
        (error: string) => {
          setStateWrap({ fetching: false });
        }
      );
      customOnSearch(searchKey);
      !searchKey && (searchParams.current[searchKeyName] = '');
      guard.current = false;
    }
  }

  function customOnSearch(value = ''): void {
    resultOldList.current = [];
    searchParams.current = {
      ...searchParams.current,
      [searchKeyName]: value,
      index: 1
    };
    resultTotal.current = 1;
    setStateWrap({ fetching: false });
    getInfoBySearchKey();
  }

  function customOnSearchForm(newSearch: Record<string, any>): void {
    resultOldList.current = [];
    searchParams.current = {
      ...searchParams.current,
      ...newSearch,
      index: 1
    };
    setStateWrap({ optionList: [], fetching: true });
    searchChange$.current.next(searchParams.current);
  }

  function customOnChange(value: SelectValue, option: any) {
    // select框变化时，没有值 或有搜索内容且是多选模式，则重新拉取数据。
    // if (!value || (searchParams.current[searchKeyName] && mode)) {
    //   customOnSearch();
    // }
    if (!value) {
      customOnSearch();
    }
    props.onChange(value, option);
  }

  function getInfoBySearchKey() {
    if (Math.ceil(resultTotal.current / pageSize) >= searchParams.current.index) {
      setStateWrap({ fetching: true });
      searchChange$.current.next(searchParams.current);
    }
  }

  const structureDealWith = (value: any, structure: string[], joinKey = ' ') => {
    let result = '';
    result = structure.map(key => value[key]).join(joinKey);
    return result;
  };

  function loadMore(e: any) {
    e.persist();
    const { target } = e;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      searchParams.current.index++;
      getInfoBySearchKey();
    }
  }

  useEffect(() => {
    if (searchKey) {
      resultOldList.current = [];
      searchParams.current[searchKeyName] = searchKey;
      getOptionList();
    }
  }, [searchKey]);

  useEffect(() => {
    searchParams.current = {
      ...searchParams.current,
      ...searchForm
    };
  }, [searchForm]);

  // searchForm 更新重新拉取数据
  useEffect(() => {
    searchParams.current = {
      ...searchParams.current,
      ...searchForm
    };
    if (searchForm && !guard.current) {
      customOnSearchForm(searchForm);
    }
  }, [JSON.stringify(searchForm)]);

  useEffect(() => {
    return () => {
      getOptionListSubscription && getOptionListSubscription.unsubscribe();
    };
  }, []);
  return { state, customOnSearch, structureDealWith, loadMore, customOnChange, getOptionList };
}
