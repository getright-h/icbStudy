import { IAllEquityPackageOrderSelectState } from './all-equity-package-order-select.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { EquityPackageManageService } from '~/solution/model/services/equity-package-manage.service';

export function useAllEquityPackageOrderSelectStore() {
  const { state, setStateWrap } = useStateStore(new IAllEquityPackageOrderSelectState());
  const equityPackageManageService: EquityPackageManageService = new EquityPackageManageService();
  useEffect(() => {
    getEquityGroupList();
  }, []);
  function getEquityGroupList() {
    const req: any = {};
    equityPackageManageService.getEquityNoPageList(req).subscribe(res => {
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
