import React from 'react';
import { IFormBaseComponentsUnion, IFormComponent } from '@fch/fch-shop-web';
import { uuid } from '~/framework/util/common/tool';
import { IUploadImgComponent } from '~/framework/components/component.module';

/**
 * @description 处理后端返回的图片数据
 * @param {any[]} totalPic 源数据
 * @return {*} 返回处理后的数据
 */
function handlePicList(totalPic: any[]): any {
  let mileageImage = '',
    maintainOrderImage = '',
    maintainInvoiceImage = '';
  const extraImage: string[] = [];
  if (Array.isArray(totalPic)) {
    totalPic.forEach(item => {
      switch (item?.fileName) {
        case '里程图片':
          mileageImage = item.filePath;
          break;
        case '保养工单':
          maintainOrderImage = item.filePath;
          break;
        case '保养发票':
          maintainInvoiceImage = item.filePath;
          break;
        case '附加图片':
          item.filePath && extraImage.push(item.filePath);
          break;
        default:
          break;
      }
    });
  }
  return { mileageImage, maintainOrderImage, maintainInvoiceImage, extraImage };
}

export default function ImageOfDetailComponent(props: any) {
  const { imageForm, detail = {}, isEdit = false } = props;
  /** 编辑时有详情，初次上传无详情内容 */
  const voucherFileDtos = isEdit ? detail?.voucherFileDtos : [];
  const { mileageImage, maintainOrderImage, maintainInvoiceImage, extraImage } = handlePicList(voucherFileDtos);

  /** 上传凭证组件配置，后端格式图片名称是中文 */
  const imageSchema: IFormBaseComponentsUnion[] = [
    {
      key: 'container',
      type: 'Layout',
      children: [
        {
          key: '里程图片',
          type: 'IUploadImgComponent',
          formItemProps: {
            rules: [{ required: true, message: '请上传里程图片' }],
            initialValue: mileageImage ? [mileageImage] : undefined
          },
          props: {
            remarkText: '里程图片',
            defaultFileList: mileageImage && [
              {
                uid: 'mileageImage',
                name: '里程图片',
                url: mileageImage,
                status: 'done'
              }
            ]
          }
        },
        {
          key: '保养工单',
          type: 'IUploadImgComponent',
          formItemProps: {
            rules: [{ required: true, message: '请上传保养工单' }],
            initialValue: maintainOrderImage ? [maintainOrderImage] : undefined
          },
          props: {
            remarkText: '保养工单',
            defaultFileList: maintainOrderImage && [
              {
                uid: 'maintainOrderImage',
                name: '保养工单',
                url: maintainOrderImage,
                status: 'done'
              }
            ]
          }
        },
        {
          key: '保养发票',
          type: 'IUploadImgComponent',
          formItemProps: {
            rules: [{ required: true, message: '请上传保养发票' }],
            initialValue: maintainInvoiceImage ? [maintainInvoiceImage] : undefined
          },
          props: {
            remarkText: '保养发票',
            defaultFileList: maintainInvoiceImage && [
              {
                uid: 'maintainInvoiceImage',
                name: '保养发票',
                url: maintainInvoiceImage,
                status: 'done'
              }
            ]
          }
        }
      ],
      props: { style: { display: 'flex' } }
    },
    {
      key: 'container2',
      type: 'Layout',
      props: { style: { display: 'flex' } },
      children: [
        {
          key: '附加图片',
          type: 'IUploadImgComponent',
          formItemProps: {
            initialValue: extraImage
          },
          props: {
            remarkText: '附加图片',
            maxImgNumber: 5,
            defaultFileList:
              extraImage?.length > 0 &&
              extraImage.map((item: any) => ({ uid: uuid(9, 10), url: item, status: 'done' })),
            /** 解决多张图片集合改变时form表单值异常问题 */
            onChange: (file: any, fileList: any[]) => {
              const picList: string[] = [];
              fileList?.forEach(item => (item?.url || item?.response) && picList.push(item?.url || item?.response));
              imageForm.setFieldsValue({ 附加图片: picList });
            }
          }
        }
      ]
    }
  ];
  return <IFormComponent form={imageForm} schema={imageSchema} widget={{ IUploadImgComponent }} />;
}
