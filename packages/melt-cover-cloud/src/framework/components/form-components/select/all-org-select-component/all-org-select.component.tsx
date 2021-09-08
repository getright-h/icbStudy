import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import * as React from 'react';
import { useAllOrgSelectStore } from './all-org-select.component.store';

const AllOrgSelectComponent = React.memo(function(props: SelectProps<any>) {
  const { state } = useAllOrgSelectStore();
  return <Select options={state.orgOptions} {...props} />;
});

export default AllOrgSelectComponent;
