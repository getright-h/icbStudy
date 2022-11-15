import * as React from 'react';
import { Button, Modal } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { IFundAccountSettingState } from '../fund-account-setting.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IFundAccountSettingState;
}

export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
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
            <Button loading={stateParent.isLoadingModal3} type="primary" onClick={handleOk}>
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
        key: 'name',
        type: 'Text',
        formItemProps: {
          label: '账户名',
          required: true,
          valuePropName: 'children'
        },
        props: {
          placeholder: '请输入账户名'
        }
      },
      {
        key: 'state',
        type: 'RadioGroup',
        formItemProps: {
          label: '账户状态',
          initialValue: 1,
          required: true
        },
        props: {
          placeholder: '',
          options: [
            { label: '正常', value: 0 },
            { label: '冻结', value: 1 }
          ]
        }
      },
      {
        key: 'remark',
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
