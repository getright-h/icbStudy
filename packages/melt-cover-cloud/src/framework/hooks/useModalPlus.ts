import { useStateStore } from '~/framework/aop/hooks/use-base-store';

export interface ModalDataState {
  /** 弹窗组件的初始值 */
  modalData?: any;
}
/** 抽离了 modal 相关的状态与逻辑, 可自定义多个visible状态*/
export function useModalPlus<T extends Required<Record<string, boolean>>>(initVisibleList: T) {
  type modalKeyof = keyof typeof initVisibleList;
  const { state, setStateWrap } = useStateStore<T & ModalDataState>(initVisibleList);

  function visibleChange(model: modalKeyof, show: boolean, modalData?: unknown) {
    setStateWrap({ [model]: show, modalData } as Partial<T & ModalDataState>);
  }

  function allModalClose() {
    setStateWrap({ ...initVisibleList, modalData: undefined });
  }

  function modalClose(modal: modalKeyof, callBack?: Function) {
    return (isSuccess?: boolean) => {
      visibleChange(modal, false);
      isSuccess && callBack && callBack();
    };
  }

  return {
    modalState: state,
    visibleChange,
    allModalClose,
    modalClose
  };
}
