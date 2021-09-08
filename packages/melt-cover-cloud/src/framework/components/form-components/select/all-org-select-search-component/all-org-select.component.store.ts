import { IAllOrgSelectState } from './all-org-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useEffect } from 'react';
import { CommonUtilService } from '~/solution/model/services/common-util.service';

export function useAllOrgSelectStore() {
  const { state, setStateWrap } = useStateStore(new IAllOrgSelectState());
  const customerManageService = new CustomerManageService();
  const commonUtilService = new CommonUtilService();
  useEffect(() => {
    getOrgList();
    () => {};
  }, []);
  let ST: any = null;
  function getOrgList(name?: string) {
    commonUtilService.AddOrderOrgCanSelect(name).subscribe(res => {
      const orgOptions = res?.map(org => {
        return {
          label: org.name,
          value: org.id
        };
      });
      console.log('orgOptions===>', orgOptions);
      setStateWrap({ orgOptions });
    });
  }

  function handleSearch(value: string) {
    console.log(value);
    clearTimeout(ST);
    ST = setTimeout(() => {
      getOrgList(value);
    }, 800);
  }
  return { state, handleSearch };
}
