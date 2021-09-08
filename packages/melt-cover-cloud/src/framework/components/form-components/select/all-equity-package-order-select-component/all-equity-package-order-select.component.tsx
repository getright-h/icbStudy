import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import * as React from 'react';
import style from './all-equity-package-order-select.component.less';
import { useAllEquityPackageOrderSelectStore } from './all-equity-package-order-select.component.store';

const AllEquityPackageOrderSelectComponent = React.memo(function(props: SelectProps<any>) {
  const { state } = useAllEquityPackageOrderSelectStore();
  return <Select options={state.equityOptions} {...props} />;
});

export default AllEquityPackageOrderSelectComponent;
