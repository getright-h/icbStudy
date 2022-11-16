import * as React from 'react';
import { Button, Modal } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { ISelectAccount, IUploadImgComponent } from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: any;
}

/**req 获取机构下拉框选项 */
export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
        widget={{
          IUploadImgComponent: IUploadImgComponent,
          ISelectAccount: ISelectAccount
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
        key: 'bagId',
        type: 'ISelectAccount',
        formItemProps: {
          label: '账户名',
          required: true
        },
        props: {}
      },
      {
        key: 'type',
        type: 'Select',
        formItemProps: {
          label: '支付类型',
          required: true
        },
        props: {
          placeholder: '请选择',
          options: [{ label: '其他', value: 1 }]
        }
      },
      {
        key: 'number',
        type: 'Input',
        formItemProps: {
          label: '充值金额',
          required: true
        },
        props: {
          placeholder: '填写充值金额'
        }
      },
      {
        key: 'remark',
        type: 'Input',
        formItemProps: {
          label: '备注'
        },
        props: {
          placeholder: '填写备注'
        }
      },
      {
        type: 'IUploadImgComponent',
        key: 'icon',
        formItemProps: {
          label: '附件凭证'
        },
        props: {
          defaultFileList: `{{formData.icon?.[0]&&[{uid: ${uuid(9, 10)},name: '权益图标',url: formData.icon?.[0]}]}}`
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
