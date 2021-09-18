import { UploadFile } from 'antd/lib/upload/interface';

/**
 * @export state变量定义和初始化
 * @class IIUploadImgState
 */
export class IIUploadImgState {
  fileList: Array<UploadFile> = [];
  loading = false;
  previewImage = '';
  previewVisible = false;
  viewer: any;
  action: string = process.env.UPLOAD + 'DistributedFileManagerPlugin/FormUploadFiles';
  previewVideo: any;
  defaultFileList: Array<UploadFile> = [];
}

export class IIUploadImgProps {
  disabled?: boolean;
  maxImgNumber?: number = 1;
  remarkText?: string = '';
  fileList?: Array<UploadFile> = [];
  defaultFileList?: Array<UploadFile> = [];
  templateUrl?: string;
  templatePriviewVideoUrl?: string;
  getFileList?: (url: string | Array<string>) => void;
  describe?: string;
  type?: string;
  onChange: any;
}
