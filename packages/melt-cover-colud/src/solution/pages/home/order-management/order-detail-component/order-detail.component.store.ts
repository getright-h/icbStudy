import { IOrderDetailState } from './order-detail.interface';
import { useStateStore, getQueryString } from '@fch/fch-tool';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export function useOrderDetailStore() {
  const { state, setStateWrap } = useStateStore(new IOrderDetailState());
  const id = getQueryString('id');
  const orderManageService: OrderManageService = new OrderManageService();
  const history = useHistory();
  useEffect(() => {
    orderManageService.getOrderDetail(id).subscribe(res => setStateWrap({ info: res }));
  }, []);
  function goback() {
    history.goBack();
  }
  return { state, id, goback };
}
