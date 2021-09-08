import { IModalImgShowProps, IModalImgShowState } from './modal-img-show.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export function useModalImgShowStore(props: IModalImgShowProps) {
  const { state, setStateWrap } = useStateStore(new IModalImgShowState());
  return { state };
}
