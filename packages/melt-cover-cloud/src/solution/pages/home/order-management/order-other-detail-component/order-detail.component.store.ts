import { IOrderDetailState } from './order-detail.interface';
import { useStateStore, getQueryString } from '@fch/fch-tool';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';

export function useOrderDetailStore() {
  const { state, setStateWrap } = useStateStore(new IOrderDetailState());
  const id = getQueryString('id');

  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

  const history = useHistory();
  useEffect(() => {
    fundsOrganizitonOtherService.detail({ id }).subscribe(res =>
      //
      {
        const foo: [] = JSON.parse(res?.images);
        setStateWrap({ info: res, images: foo });
      }
    );
  }, []);

  function goback() {
    history.goBack();
  }
  return { state, id, goback };
}
