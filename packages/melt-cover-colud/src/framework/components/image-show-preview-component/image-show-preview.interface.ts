/**
 * @export state变量定义和初始化
 * @class IImageShowPreviewState
 */
export class IImageShowPreviewState {
  imageStatus = 'loading';
}

export interface IImageShowPreviewComponentProps {
  src: string;
  alt: string;
}
