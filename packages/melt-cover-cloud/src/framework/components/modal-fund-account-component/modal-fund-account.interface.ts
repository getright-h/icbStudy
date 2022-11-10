/**
 * @export state变量定义和初始化
 * @class IModalImgShowState
 */
export class IModalFundAccountState { }

export interface IModalFundAccountProps {
  title: string;
  handleClose: (e: any) => void;
  handleOk: (e: any) => void;
  visible: boolean;
}
