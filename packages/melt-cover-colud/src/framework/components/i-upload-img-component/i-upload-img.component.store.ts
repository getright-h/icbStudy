import { IIUploadImgState, IIUploadImgProps } from './i-upload-img.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { UploadFile, UploadChangeParam, RcCustomRequestOptions } from 'antd/lib/upload/interface';
import { useRef, useEffect, MutableRefObject } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';
import Viewer from 'viewerjs';
import { UploadImageService } from '~/solution/model/services/upload-image.service';
import { OssToken } from '~/solution/model/dto/upload-image.dto';
import OSS from 'ali-oss';
export function useIUploadImgStore(props: IIUploadImgProps) {
  const { state, setStateWrap } = useStateStore(new IIUploadImgState());
  const returnImageListInfo: MutableRefObject<Array<string>> = useRef([]);
  const uploadImageService: UploadImageService = useService(UploadImageService);
  const refImg = useRef<any>();
  const refChange = useRef<boolean>(false);
  useEffect(() => {
    if (props.defaultFileList?.length > 0 && !refChange.current) {
      setStateWrap({
        fileList: props.defaultFileList
      });
    }
    refChange.current = false;
  }, [JSON.stringify(props.defaultFileList)]);

  /**
   * @param {UploadChangeParam} { file, fileList } 上传图片change事件，返回file的状态和文件信息
   * [...fileList] 是为了解决一直uploading的bug（官方的）
   */
  function handleChange({ file, fileList }: UploadChangeParam<UploadFile>) {
    refChange.current = true;
    if (file.status === 'done') {
      fileList = fileList.map(item => {
        return item;
      });
      props.onChange?.(returnImageListInfo.current);
    } else if (file.status === 'removed') {
      returnImageListInfo.current = returnImageListInfo.current.filter(returnImage => {
        return returnImage != (file['response'] || file['url']);
      });
      props?.getFileList?.(returnImageListInfo.current);
      returnImageListInfo.current?.map((item, index) => {
        fileList[index].response = item;
      });
      props.onChange?.(returnImageListInfo.current);
    }
    setStateWrap({ fileList: file.status ? [...fileList] : state.fileList });
  }

  /**
   * @param {UploadFile} file 预览功能
   */
  function handlePreview(file: UploadFile) {
    console.log('previewFile===>', file);
    if (props.type == 'video') {
      setStateWrap({
        previewVideo: file.response,
        previewVisible: !state.previewVisible
      });
      return;
    }
    refImg.current = new Viewer(document.getElementById('IUplodaImageBoxShowEa'), {
      url: () => {
        return file.url || file.response;
      },
      hide: handleCancel
    });
    console.log('viewer===>', refImg.current);
    console.log('file===>', file.url || file.response);
    refImg.current?.show();
  }

  function handlePreviewFile(file: UploadFile) {
    if (props.type == 'video') {
      return new Promise(resolve => {
        resolve(props.templateUrl);
      });
    }
    return null;
  }

  /**
   * @param  取消功能
   */
  function handleCancel(viewer: any) {
    console.log('state.viewer===>', viewer);
    refImg.current?.destroy();
    setStateWrap({
      previewVisible: false
    });
  }

  /**
   * @param {UploadFile} file 下载图片功能
   */
  function handleDownload(file: UploadFile) {
    // CommonUtil.downFile(file.thumbUrl, file.fileName);
  }

  function getOssTiken(): Promise<OssToken> {
    return new Promise(resolve => {
      uploadImageService.getOssToken().subscribe((res: any) => {
        const { credentials, ossFileMeta } = res;
        const result = {
          accessKeyId: credentials.accessKeyId,
          accessKeySecret: credentials.accessKeySecret,
          securityToken: credentials.securityToken,
          region: ossFileMeta.region,
          bucket: ossFileMeta.bucket
        };
        resolve(result);
      });
    });
  }
  function getClient(ossToken: OssToken) {
    return new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: ossToken.region,
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: ossToken.accessKeyId,
      accessKeySecret: ossToken.accessKeySecret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: ossToken.securityToken,
      // 填写Bucket名称。
      bucket: ossToken.bucket
    });
  }

  /**
   * @param {RcCustomRequestOptions} item 自定义上传的请求，其中包含了前端上传压缩
   * @returns
   */
  async function customReq(item: RcCustomRequestOptions) {
    /**
     * 处理视频上传逻辑
     */
    if (props.type == 'video') {
      const ossToken: OssToken = await getOssTiken();
      const client: OSS = getClient(ossToken);
      const name = 'ROOTDIR/' + '_' + +new Date() + '.mp4';
      const response = await client.put(name, item.file);
      console.log('response===>', response);
      returnImageListInfo.current.push(response.url);
      props?.getFileList?.(returnImageListInfo.current);
      item.onSuccess(response.url as any, item.file);
      // axios
      //   .post(item.action, formData, {
      //     onUploadProgress: ({ total, loaded }) => {
      //       item.onProgress(
      //         {
      //           percent: Number(Math.round((loaded / total) * 100).toFixed(2))
      //         },
      //         item.file
      //       );
      //     }
      //   })
      //   .then(({ data: response }) => {
      //     console.log('dataVideo===>', response);
      //     returnImageListInfo.current.push(response.data[0].fileFullUrl);
      //     props.getFileList(returnImageListInfo.current);
      //     item.onSuccess(response.data[0].fileFullUrl, item.file);
      //   })
      //   .catch(item.onError);
      return;
    }

    new Compressor(item.file as any, {
      quality: 0.6,
      convertSize: 1000000,
      success(result: any) {
        const formData = new FormData();
        formData.append('file', result, result.name);
        formData.append('id', '1000');
        return axios
          .post(item.action, formData, {
            onUploadProgress: ({ total, loaded }) => {
              item.onProgress(
                {
                  percent: Number(Math.round((loaded / total) * 100).toFixed(2))
                },
                item.file
              );
            }
          })
          .then(({ data: response }) => {
            returnImageListInfo.current.push(response.data[0].fileFullUrl);
            props?.getFileList?.(returnImageListInfo.current);
            item.onSuccess(response.data[0].fileFullUrl, item.file);
          })
          .catch(item.onError);
      },
      error(err) {
        console.log(err);
      }
    });
  }
  return {
    state,
    customReq,
    handleChange,
    handlePreview,
    handleCancel,
    handleDownload,
    handlePreviewFile
  };
}
