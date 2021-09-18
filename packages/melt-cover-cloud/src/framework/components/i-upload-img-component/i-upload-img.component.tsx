import * as React from 'react';
import style from './i-upload-img.module.less';
import { Modal, Upload } from 'antd';
import { useIUploadImgStore } from './i-upload-img.component.store';
import { UploadListType } from 'antd/lib/upload/interface';
import { IIUploadImgProps } from './i-upload-img.interface';
import { PlusOutlined } from '@ant-design/icons';
import 'viewerjs/dist/viewer.css';

IUploadImgComponent.defaultProps = {
  maxImgNumber: 1,
  remarkText: '',
  fileList: []
};

export default function IUploadImgComponent(props: IIUploadImgProps) {
  const {
    state,
    customReq,
    handleChange,
    handlePreview,
    handleDownload,
    handlePreviewFile,
    handleCancel
  } = useIUploadImgStore(props);
  const uploadsProps: any = {
    action: state.action,
    customRequest: customReq,
    listType: 'picture-card' as UploadListType,
    onChange: handleChange,
    fileList: state.fileList,
    onPreview: handlePreview,
    onDownload: handleDownload,
    disabled: props.disabled,
    defaultFileList: state.defaultFileList,
    templateUrl: props.templateUrl
  };
  const isVideo = props.type == 'video';
  if (props.type == 'video') {
    uploadsProps.previewFile = handlePreviewFile;
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <div>
      <div className={style.flexBox}>
        <div>
          <Upload {...uploadsProps} withCredentials={true}>
            {state.fileList && state.fileList.length < props.maxImgNumber ? uploadButton : null}
          </Upload>
        </div>
        {props.templateUrl && !isVideo && (
          <div className={style.example}>
            <div>图例</div>
            <div>
              <img className={style.imgTemplate} src={props.templateUrl} />
            </div>
          </div>
        )}
        {props.describe && isVideo && (
          <div className={style.example}>
            <div>视例</div>
            <div>
              <video className={style.imgTemplate} controls={true} src={props.describe} />
            </div>
          </div>
        )}
      </div>
      {/* 视频预览 */}
      <Modal visible={state.previewVisible} width={800} footer={null} onCancel={handleCancel}>
        <video controls autoPlay style={{ width: '100%' }} src={state.previewVideo}></video>
      </Modal>
      {/* 图片预览 */}
      <img id="IUplodaImageBoxShowEa" style={{ width: 0, height: 0 }} />
      <div className={style.iIploadImgTipInfo}>{props.remarkText || ''}</div>
    </div>
  );
}
