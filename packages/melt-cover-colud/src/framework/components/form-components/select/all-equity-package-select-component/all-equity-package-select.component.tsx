import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import * as React from 'react';
import style from './all-equity-package-select.component.less';
import { useAllEquityPackageSelectStore } from './all-equity-package-select.component.store';

const AllEquityPackageSelectComponent = React.memo(function(props: SelectProps<any>) {
  const { state } = useAllEquityPackageSelectStore();
  return <Select options={state.equityOptions} {...props} />;
});

export default AllEquityPackageSelectComponent;
