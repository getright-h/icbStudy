import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import * as React from 'react';
import style from './i-upload.component.less';
import { useIUploadStore } from './i-upload.component.store';
import { IIUploadProps } from './i-upload.interface';
import 'viewerjs/dist/viewer.css';
IUploadComponent.defaultProps = {
  maxImgNumber: 1,
  remarkText: '',
  fileList: [],
  listType: 'picture'
};

/** 可以回显 且更加稳定的 上传组件 */
export default function IUploadComponent(props: IIUploadProps) {
  const {
    state,
    customReq,
    handleChange,
    handlePreview,
    handleDownload,
    handlePreviewFile,
    handleCancel
  } = useIUploadStore(props);
  const { accept = 'image/*' } = props;
  const uploadsProps: any = {
    action: state.action,
    customRequest: customReq,
    listType: props.listType,
    onChange: handleChange,
    fileList: state.fileList,
    onPreview: handlePreview,
    onDownload: handleDownload,
    disabled: props.disabled,
    defaultFileList: state.defaultFileList,
    templateUrl: props.templateUrl,
    accept: accept
  };
  const isVideo = props.type == 'video';
  if (props.type == 'video') {
    uploadsProps.previewFile = handlePreviewFile;
  }
  const uploadButton =
    props.listType == 'picture-card' ? (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    ) : (
      <Button type="primary" icon={<PlusOutlined />}>
        上传文件
      </Button>
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
