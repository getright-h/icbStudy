import { Select, SelectProps } from 'antd';
import * as React from 'react';
import { ISelectLoadingComponent } from '../../component.module';
import { IISelectLoadingProps } from '../../i-select-loading-component/i-select-loading.interface';
import { COMPONENT_SELECT_TYPES } from '../index.types';
import AllEquityPackageOrderSelectComponent from './all-equity-package-order-select-component/all-equity-package-order-select.component';
import AllEquityPackageSelectComponent from './all-equity-package-select-component/all-equity-package-select.component';
import AllOrgSelectComponent from './all-org-select-component/all-org-select.component';
import AddOrderOrgCanSelectComponent from './all-org-select-search-component/all-org-select.component';
import MaxAllOrgParentSelectComponent from './max-all-org-parent-select-component/max-all-org-select.component';
import MaxAllOrgSelectComponent from './max-all-org-select-component/max-all-org-select.component';

export class SelectFactory {
  public static getSelect(type?: number) {
    switch (type) {
      case COMPONENT_SELECT_TYPES.SelectEquityPackageOrderAll:
        return (props: SelectProps<any>) => <AllEquityPackageOrderSelectComponent {...props} />;
      case COMPONENT_SELECT_TYPES.SelectEquityPackageAll:
        return (props: SelectProps<any>) => <AllEquityPackageSelectComponent {...props} />;
      case COMPONENT_SELECT_TYPES.SelectAllOrg:
        return (props: SelectProps<any>) => <AllOrgSelectComponent {...props} />;
      case COMPONENT_SELECT_TYPES.SelectMaxAllOrg:
        return (props: SelectProps<any>) => <MaxAllOrgSelectComponent {...props} />;
      case COMPONENT_SELECT_TYPES.AddOrderSelctOrgCanSearch:
        return (props: SelectProps<any>) => <AddOrderOrgCanSelectComponent {...props} />;
      case COMPONENT_SELECT_TYPES.SelectMaxParentAllOrg:
        return (props: SelectProps<any>) => <MaxAllOrgParentSelectComponent {...props} />;
      default:
        return (props: SelectProps<any>) => <Select {...props} />;
    }
  }
}
