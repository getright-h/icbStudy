import { useForm } from '@fch/fch-shop-web';
import { useRef } from 'react';
import { useModalPlus } from '~/framework/hooks/useModalPlus';
import { useTable } from '~/framework/hooks/useTable';
import { GetSubOrganizationResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ACTION_TYPE, visibleList } from './organization-configuration.interface';

export function useOrganizationConfigStore() {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const form = useForm();
  const paramsRef = useRef<GetSubOrganizationResType>();
  const table = useTable({
    form,
    require: fundsOrganizitonOtherService.organizationPagedList,
    isPreload: false,
    customParamsFn(formValues) {
      return { ...formValues, parentId: paramsRef.current?.id };
    }
  });
  const { getTableData } = table;
  const { modalState, modalClose, visibleChange } = useModalPlus(visibleList);

  function getRightList(row: GetSubOrganizationResType) {
    paramsRef.current = row;
    getTableData();
  }

  function action(type: ACTION_TYPE, data: any) {
    switch (type) {
      case ACTION_TYPE.SETTING:
        visibleChange('settingVisible', true, data);
        break;
    }
  }

  return { form, table, modalState, modalClose, action, getRightList };
}
