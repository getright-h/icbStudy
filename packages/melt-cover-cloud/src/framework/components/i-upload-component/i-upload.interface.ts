import { UploadFile, UploadListType } from 'antd/lib/upload/interface';

/**
 * @export state变量定义和初始化
 * @class IIUploadState
 */

export class IIUploadState {
  fileList: Array<Partial<UploadFile>> = [];
  loading = false;
  previewImage = '';
  previewVisible = false;
  viewer: any;
  action: string = process.env.UPLOAD + 'DistributedFileManagerPlugin/FormUploadFiles';
  previewVideo: any;
  defaultFileList: Array<UploadFile> = [];
}

/**
 * @export props变量定义和初始化
 * @class IIUploadProps
 */
export class IIUploadProps {
  disabled?: boolean;
  maxImgNumber?: number = 1;
  remarkText?: string = '';
  fileList?: string[] = [];
  defaultFileList?: Array<UploadFile> = [];
  templateUrl?: string;
  templatePriviewVideoUrl?: string;
  getFileList?: (url: string | Array<string>) => void;
  describe?: string;
  type?: string;
  onChange?: any;
  listType?: UploadListType;
  accept?: string;
}
