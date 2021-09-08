import { Modal } from 'antd';
import * as React from 'react';
import { uuid } from '~/framework/util/common/tool';
import IUploadImgComponent from '../i-upload-img-component/i-upload-img.component';
import style from './modal-img-show.component.less';
import { useModalImgShowStore } from './modal-img-show.component.store';
import { IModalImgShowProps } from './modal-img-show.interface';

export default function ModalImgShowComponent(props: IModalImgShowProps) {
  const { state } = useModalImgShowStore(props);
  const { title, handleClose, handleOk, visible, imgList } = props;
  function renderModal() {
    return (
      <Modal title={title} visible={visible} closable={true} onCancel={handleClose} onOk={handleOk}>
        <div className={style.imageContainer}>
          {imgList.map(item => {
            return (
              <div key={uuid(9, 10)} className={style.imageItem}>
                <IUploadImgComponent
                  fileList={[
                    {
                      uid: uuid(9, 10),
                      name: item.name,
                      url: item.url
                    }
                  ]}
                  disabled
                  key={item.key}
                  {...item}
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }
  return <div className={style.test}>{renderModal()}</div>;
}
