import { IImageShowPreviewComponentProps, IImageShowPreviewState } from './image-show-preview.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import Viewer from 'viewerjs';

export function useImageShowPreviewStore(props: IImageShowPreviewComponentProps) {
  const { state, setStateWrap } = useStateStore(new IImageShowPreviewState());
  useEffect(() => {
    loadImage(props.src);
  }, [props.src]);
  function createViewer(ref: any) {
    console.log(ref);
    const cache = Object.assign({}, ref);
    cache.current = new Viewer(cache.current, {
      toolbar: {
        zoomIn: 4,
        zoomOut: 4,
        oneToOne: 4,
        reset: 4,
        rotateLeft: 4,
        rotateRight: 4,
        flipHorizontal: 4,
        flipVertical: 4
      },
      hide: function() {
        //在图片消失的时候销毁viewer
        cache.current.destroy();
        cache.current = null;
      }
    });
    cache.current && cache.current.view();
  }

  function loadImage(src: string) {
    const image = new Image();
    image.src = src;
    // 加载成功，设置 status 为 loaded
    image.onload = () => {
      setStateWrap({
        imageStatus: 'loaded'
      });
    };
    // 加载失败，设置 status 为 fail
    image.onerror = () => {
      console.log(src, '');
      // src 为 undefined 的时候不处理事件
      // 这是初始化 props 为  undefined 的情况
      // 这种情况如果捕获 onerror 会引起页面闪烁
      if (src === undefined) return;
      setStateWrap({
        imageStatus: 'fail'
      });
    };
  }
  return { state, createViewer, loadImage };
}
