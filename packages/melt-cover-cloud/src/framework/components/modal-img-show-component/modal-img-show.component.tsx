import { Modal } from 'antd';
import * as React from 'react';
import { IUploadImgComponent } from '../component.module';
import style from './modal-img-show.module.less';
import { IModalImgShowProps } from './modal-img-show.interface';
import videoImg from '~assets/image/video.png';
export default function ModalImgShowComponent(props: IModalImgShowProps) {
  const { title, handleClose, handleOk, visible, imgList } = props;
  function renderModal() {
    return (
      <Modal title={title} visible={visible} closable={true} onCancel={handleClose} onOk={handleOk}>
        <div className={style.imageContainer}>
          {imgList.map(item => {
            return (
              <div key={item.url} className={style.imageItem}>
                <IUploadImgComponent
                  type={item.subType !== 2 ? 'image' : 'video'}
                  defaultFileList={[
                    {
                      uid: item.url,
                      name: item.name,
                      url: item.url,
                      thumbUrl: item.subType !== 2 ? undefined : videoImg
                    }
                  ]}
                  disabled
                  key={item.key}
                  {...item}
                  templatePriviewVideoUrl={videoImg}
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
  return <div>{renderModal()}</div>;
}
