import { IMaxAllOrgSelectState } from './max-all-org-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ReserveManageService } from '~/solution/model/services/reserve-manage.service';

export function useMaxAllOrgSelectStore() {
  const { state, setStateWrap } = useStateStore(new IMaxAllOrgSelectState());
  const reserveManageService = new ReserveManageService();
  useEffect(() => {
    getOrgList();
  }, []);
  function getOrgList() {
    reserveManageService
      .getOrganizations({
        typeId: process.env.TYPE_ID
      })
      .subscribe(res => {
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
