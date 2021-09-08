import * as React from 'react';
import { IUploadImgComponent } from '../../component.module';
import { IIUploadImgProps } from '../../i-upload-img-component/i-upload-img.interface';
import { COMPONENT_UPLOAD_TYPES } from '../index.types';

export class UploadFactory {
  public static getUpload(type?: number) {
    switch (type) {
      default:
        return (props: IIUploadImgProps) => <IUploadImgComponent {...props} />;
    }
  }
}
