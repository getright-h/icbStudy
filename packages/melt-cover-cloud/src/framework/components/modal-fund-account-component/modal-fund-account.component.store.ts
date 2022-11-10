import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IModalFundAccountProps, IModalFundAccountState } from './modal-fund-account.interface';

export function useModalFundAccountStore(props: IModalFundAccountProps) {
  const { state, setStateWrap } = useStateStore(new IModalFundAccountState());
  return { state };
}
