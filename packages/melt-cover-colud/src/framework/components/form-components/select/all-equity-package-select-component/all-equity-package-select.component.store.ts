import { IAllEquityPackageSelectState } from './all-equity-package-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useEffect } from 'react';

export function useAllEquityPackageSelectStore() {
  const { state, setStateWrap } = useStateStore(new IAllEquityPackageSelectState());
  const customerManageService = new CustomerManageService();
  useEffect(() => {
    getEquityGroupList();
  }, []);
  function getEquityGroupList() {
    customerManageService.getEquityGroupList().subscribe(res => {
      const equityOptions = res?.map(equity => {
        return {
          label: equity.name,
          value: equity.id
        };
      });
      setStateWrap({ equityOptions });
    });
  }
  return { state };
}
