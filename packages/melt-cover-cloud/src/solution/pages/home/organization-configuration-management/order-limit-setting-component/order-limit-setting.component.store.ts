import { useForm } from '@fch/fch-shop-web';
import { useRef } from 'react';
import { useModalPlus } from '~/framework/hooks/useModalPlus';
import { useTable } from '~/framework/hooks/useTable';
import { GetSubOrganizationResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ACTION_TYPE, visibleList } from './order-limit-setting.interface';

export function useOrderLimitSettingStore() {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const form = useForm();
  const paramsRef = useRef<GetSubOrganizationResType>();
  const table = useTable({
    form,
    require: fundsOrganizitonOtherService.orderLimitPagedList,
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
      case ACTION_TYPE.LOG:
        visibleChange('logVisible', true, data);
        break;
      case ACTION_TYPE.DETAIL:
        visibleChange('detailVisible', true, data);
    }
  }

  return { form, table, modalState, modalClose, action, getRightList };
}
