import * as React from 'react';
import { Select } from 'antd';
import { IISelectLoadingProps } from './i-select-loading.interface';
import { useISelectLoadingStore } from './i-select-loading.component.store';

export default React.memo((props: IISelectLoadingProps) => {
  const {
    placeholder,
    disabled,
    onChange,
    width = '100%',
    allowClear = true,
    mode,
    showSearch = true,
    labelInValue,
    value,
    dropdownMatchSelectWidth,
    labelDataStructure = ['name1'],
    keyDataStructure = ['id1'],
    valueDataStructure = ['id1']
  } = props;
  const { state, optionScroll, fetchOptions, structureDealWith } = useISelectLoadingStore(props);
  const { optionList, fetching } = state;
  return (
    <Select
      style={{ width }}
      labelInValue={labelInValue}
      loading={fetching}
      mode={mode}
      disabled={disabled || false}
      placeholder={placeholder}
      filterOption={false}
      value={value}
      defaultValue={value}
      onChange={onChange}
      onPopupScroll={optionScroll}
      onFocus={() => fetchOptions(false)}
      showSearch={showSearch}
      onSearch={$event => fetchOptions(true, $event)}
      allowClear={allowClear}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth ?? true}
    >
      {optionList &&
        optionList.map((item: any) => {
          return (
            <Select.Option
              value={structureDealWith(item, valueDataStructure)}
              key={structureDealWith(item, keyDataStructure)}
              info={item}
            >
              {structureDealWith(item, labelDataStructure)}
            </Select.Option>
          );
        })}
    </Select>
  );
});
