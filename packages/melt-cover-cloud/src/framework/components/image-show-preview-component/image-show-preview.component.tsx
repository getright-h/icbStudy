import * as React from 'react';
import style from './image-show-preview.module.less';
import { useImageShowPreviewStore } from './image-show-preview.component.store';
import 'viewerjs/dist/viewer.css';
import { IImageShowPreviewComponentProps } from './image-show-preview.interface';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default function ImageShowPreviewComponent(props: IImageShowPreviewComponentProps) {
  const { state, createViewer } = useImageShowPreviewStore(props);
  const { src, alt } = props;
  const node = useRef<any>(null);
  function renderImageBox() {
    const { imageStatus } = state;
    if (imageStatus === 'loading') {
      return (
        <div className={style.noImageBox}>
          <Icon type={imageStatus} component={() => <></>} />
        </div>
      );
    } else if (imageStatus === 'fail') {
      return (
        <div className={style.noImageBox}>
          <InfoCircleOutlined />
          {/* <Icon type={'warning'} component={() => <></>} /> */}
          <div>图片加载失败</div>
        </div>
      );
    } else if (imageStatus === 'loaded') {
      return (
        <img
          ref={node}
          onClick={() => {
            createViewer(node);
          }}
          src={src}
          alt={alt}
          className={style.img}
        />
      );
    } else {
      return <></>;
    }
  }
  return <div className={style.container}>{renderImageBox()}</div>;
}
