import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import * as React from 'react';
import { useMaxAllOrgSelectStore } from './max-all-org-select.component.store';

const MaxAllOrgSelectComponent = React.memo(function(props: SelectProps<any>) {
  const { state } = useMaxAllOrgSelectStore();
  return <Select options={state.orgOptions} {...props} />;
});
export default MaxAllOrgSelectComponent;
