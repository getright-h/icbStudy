import { useEffect } from 'react';
import { CascaderProps } from 'antd/lib/cascader';
import { debounce } from 'lodash';
import { ILazyOptionosCascaderState } from './lazy-optionos-cascader.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CommonUtilService } from '~/solution/model/services/common-util.service';

export type ILazyOptionosCascaderProps = {
  onChange?: Function;
} & CascaderProps;

export function useLazyOptionosCascaderStore(props: ILazyOptionosCascaderProps) {
  const { state, setStateWrap } = useStateStore(new ILazyOptionosCascaderState());
  const commonUtilService: CommonUtilService = new CommonUtilService();

  useEffect(() => {
    console.log(11111, 222, 3333);
    loadDefaultData();
  }, []);

  function changeValue(e: any) {
    setStateWrap({
      value: e
    });
  }

  const loadDefaultData = debounce(() => {
    commonUtilService
      .getVehicleTreeList({
        page: 1,
        size: 10000
      })
      .subscribe(res => {
        console.log('res===>', res);
        setStateWrap({
          options: res.data
        });
      });
  }, 2000);

  return { state, changeValue, commonUtilService, setStateWrap };
}
