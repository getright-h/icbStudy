import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import * as React from 'react';
import { useAllOrgSelectStore } from './all-org-select.component.store';

const AddOrderOrgCanSelectComponent = React.memo(function(props: SelectProps<any>) {
  const { state, handleSearch } = useAllOrgSelectStore();
  console.log('renderSelect===>', state.orgOptions);
  return (
    <Select options={state.orgOptions} showSearch={true} onSearch={handleSearch} filterOption={false} {...props} />
  );
});

export default AddOrderOrgCanSelectComponent;
