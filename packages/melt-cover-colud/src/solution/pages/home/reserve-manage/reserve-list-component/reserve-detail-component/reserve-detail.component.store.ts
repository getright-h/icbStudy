import { IReserveDetailProps, IReserveDetailState } from './reserve-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useReserveDetailStore(props: IReserveDetailProps) {
  const { state, setStateWrap } = useStateStore(new IReserveDetailState());
  return { state };
}
