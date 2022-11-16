import { Select } from 'antd';
import * as React from 'react';
import { useISearchSelectStore } from './i-search-select.component.store';
import { IISearchSelectProps } from './i-search-select.interface';

const ISearchSelectComponent: <req, res>(props: IISearchSelectProps<req, res>) => JSX.Element = React.forwardRef(
  (props, ref) => {
    const { state, customOnSearch, structureDealWith, loadMore, customOnChange, getOptionList } = useISearchSelectStore(
      props
    );

    const { optionList, fetching } = state;
    const {
      value,
      onChange,
      onSearch,
      onFocus,
      style = { width: '100%' },
      placeholder = '请选择',
      allowClear = true,
      showSearch = true,
      labelDataStructure = ['name'],
      keyDataStructure = ['id'],
      valueDataStructure = ['id'],
      dropdownMatchSelectWidth = true,
      searchKeyName,
      pageSize,
      searchKey,
      renderLabel,
      renderValue,
      searchForm,
      renderOptions,
      responseDataStructure,
      requestFn,
      labelJoinKey = ' ',
      valueJoinKey = ' ',
      isPreload,
      ...rest
    } = props;
    const selectArgs = { style, placeholder, allowClear, showSearch, dropdownMatchSelectWidth };
    const options = renderOptions?.(optionList as any);
    React.useImperativeHandle(ref, () => ({
      getOptionList: () => {
        getOptionList();
      }
    }));

    return (
      <Select
        labelInValue={false}
        value={value}
        loading={fetching}
        filterOption={false}
        onFocus={() => getOptionList()}
        onSearch={customOnSearch}
        onChange={customOnChange}
        options={options}
        onPopupScroll={loadMore}
        {...selectArgs}
        {...rest}
      >
        {!options &&
          optionList &&
          optionList?.map((item: any) => {
            return (
              <Select.Option
                value={renderValue ? renderValue(item) : structureDealWith(item, valueDataStructure, valueJoinKey)}
                key={structureDealWith(item, keyDataStructure)}
                info={item}
              >
                {renderLabel ? renderLabel(item) : structureDealWith(item, labelDataStructure, labelJoinKey)}
              </Select.Option>
            );
          })}
      </Select>
    );
  }
);

export default ISearchSelectComponent;
