/**
 * @export state变量定义和初始化
 * @class IModalImgShowState
 */
export class IModalImgShowState {}

export interface IModalImgShowProps {
  imgList: any[];
  title: string;
  handleClose: (e: any) => void;
  handleOk: (e: any) => void;
  visible: boolean;
}
