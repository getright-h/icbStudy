import * as React from 'react';
import { Button, Modal, TreeSelect } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { IUploadImgComponent } from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';
import { EQYITY_TYPE, EQYITY_USE_TYPE } from '~/solution/shared/enums/home.enum';
import { IEquityPackageManageState } from '../equity-package-manage.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IEquityPackageManageState;
}

export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
        widget={{
          IUploadImgComponent: IUploadImgComponent
        }}
        props={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          style: { width: '100%' }
        }}
      />
    );
  }

  return (
    <div>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <>
            <Button type="primary" onClick={handleCancel}>
              取消
            </Button>
            <Button loading={stateParent.isLoadingModal1} type="primary" onClick={handleOk}>
              确定
            </Button>
          </>
        }
      >
        {renderForm()}
      </Modal>
    </div>
  );
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'path',
        type: 'Input',
        formItemProps: {
          label: '账户名',
          required: true
        },
        props: {
          placeholder: '请输入账户名'
        }
      },
      {
        key: 'useType',
        type: 'RadioGroup',
        formItemProps: {
          label: '账户状态',
          initialValue: 1,
          required: true
        },
        props: {
          placeholder: '',
          options: [
            { label: '正常', value: 1 },
            { label: '冻结', value: 2 }
          ]
        }
      },
      {
        key: 'path',
        type: 'Input',
        formItemProps: {
          label: '备注',
          required: true
        },
        props: {
          placeholder: '',
          allowClear: true
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
