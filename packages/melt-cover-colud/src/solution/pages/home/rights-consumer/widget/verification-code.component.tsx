import { Modal } from 'antd';
import * as React from 'react';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';

interface IAddEquityProps {
  title: string;
  refForm: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
}

export default function VerificationCodeComponent(props: IAddEquityProps) {
  const { title, refForm, handleOk, handleCancel, visible } = props;
  function renderForm() {
    const { schema } = getSchema();
    return (
      <IFormComponent
        form={refForm}
        schema={schema}
        props={{
          wrapperCol: { span: 12 },
          labelCol: { span: 6 }
        }}
      ></IFormComponent>
    );
  }
  return (
    <div>
      <Modal title={title} onOk={handleOk} onCancel={handleCancel} visible={visible}>
        {renderForm()}
      </Modal>
    </div>
  );
}

function getSchema() {
  const schema: IFormBaseComponentsUnion[] = [
    {
      key: 'verCode',
      type: 'Input',
      formItemProps: {
        label: '核销码'
      },
      props: {
        placeholder: '请输入核销码',
        allowClear: true
      }
    }
  ];
  return { schema };
}
