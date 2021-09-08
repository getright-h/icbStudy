import { ILazyOptionosCascaderState } from './lazy-optionos-cascader.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CommonUtilService } from '~/solution/model/services/common-util.service';
import { useEffect } from 'react';
import { CascaderProps } from 'antd/lib/cascader';

export type ILazyOptionosCascaderProps = {
  onChange?: Function;
} & CascaderProps;

export function useLazyOptionosCascaderStore(props: ILazyOptionosCascaderProps) {
  const { state, setStateWrap } = useStateStore(new ILazyOptionosCascaderState());
  const commonUtilService: CommonUtilService = new CommonUtilService();
  useEffect(() => {
    loadDefaultData();
  }, []);
  function changeValue(e: any) {
    setStateWrap({
      value: e
    });
  }

  function loadDefaultData() {
    commonUtilService
      .getVehicleTreeList({
        page: 1,
        size: 10000
      })
      .subscribe(res => {
        setStateWrap({
          options: res.data
        });
      });
  }

  return { state, changeValue, commonUtilService, setStateWrap };
}
