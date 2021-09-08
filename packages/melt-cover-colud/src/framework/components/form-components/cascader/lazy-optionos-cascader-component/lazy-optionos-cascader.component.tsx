import { Cascader } from 'antd';
import * as React from 'react';
import style from './lazy-optionos-cascader.component.less';
import { ILazyOptionosCascaderProps, useLazyOptionosCascaderStore } from './lazy-optionos-cascader.component.store';

const LazyOptionosCascaderComponent = React.memo((props: ILazyOptionosCascaderProps) => {
  const { state, changeValue } = useLazyOptionosCascaderStore(props);
  const { onChange } = props;
  const { options } = state;

  const onChangeInput = (e: any, selectedOptions: any) => {
    changeValue(e);
    onChange?.(selectedOptions);
  };
  return (
    <Cascader
      {...props}
      options={options}
      showSearch={true}
      value={state.value}
      fieldNames={{ label: 'name', value: 'id' }}
      onChange={onChangeInput}
      changeOnSelect
    />
  );
});
export default LazyOptionosCascaderComponent;
