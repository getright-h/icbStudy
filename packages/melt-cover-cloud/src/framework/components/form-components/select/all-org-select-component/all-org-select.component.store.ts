import { IAllOrgSelectState } from './all-org-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useEffect } from 'react';

export function useAllOrgSelectStore() {
  const { state, setStateWrap } = useStateStore(new IAllOrgSelectState());
  const customerManageService = new CustomerManageService();
  useEffect(() => {
    getOrgList();
  }, []);
  function getOrgList() {
    customerManageService.getOrgList().subscribe(res => {
      const orgOptions = res?.map(org => {
        return {
          label: org.name,
          value: org.id
        };
      });
      setStateWrap({ orgOptions });
    });
  }
  return { state };
}
