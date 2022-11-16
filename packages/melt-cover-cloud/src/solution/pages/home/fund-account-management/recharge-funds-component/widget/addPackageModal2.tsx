import { Button, Modal, Typography } from 'antd';
import * as React from 'react';
import {
  IFormBaseComponentsUnion,
  TypeUseForm,
  IFormComponent,
  FormRenderItem,
  IUploadImgComponent
} from '@fch/fch-shop-web';
import { IWidget } from '@fch/fch-shop-web/dist/src/IFormRenderComponent/form-render.interface';
import { IRechargeFundsState } from '../recharge-funds.interface';
import { uuid } from '~/framework/util/common/tool';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IRechargeFundsState;
  handleFormChangeEvent?: Function;
  watch2?: IWidget;
}

export default function AddPackageModalComponent2(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent, watch2 } = props;
  const { disableFooter } = stateParent;
  const footer: any = disableFooter ? null : (
    <>
      <Button type="primary" onClick={handleCancel}>
        取消
      </Button>
      <Button loading={stateParent.isLoadingModal2} type="primary" onClick={handleOk}>
        确定
      </Button>
    </>
  );
  const renderContent = (props: any) => {
    const { renderItem } = props;
    return (
      <div>
        <div>{schema.map(renderItem)}</div>
      </div>
    );
  };
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        watch={watch2}
        schema={schema}
        slot={renderContent}
        widget={{ Text: Typography.Text, IUploadImgComponent: IUploadImgComponent }}
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
        width={700}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        visible={visible}
        okText={<Button loading={stateParent.isLoadingModal2}>确定</Button>}
        footer={footer}
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
      /* {
        key: 'id',
        type: 'Input',
        formItemProps: {
          label: '账号名称',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          type: 'text',
          placeholder: '请输入账号名称'
        }
      },
      {
        key: 'type',
        type: 'Select',
        formItemProps: {
          label: '支付类型',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '请选择支付类型',
          options: [{ label: '其他', value: 0 }]
        }
      }, */
      {
        key: '',
        type: 'Text',
        formItemProps: {
          label: '审核信息',
          wrapperCol: { span: 10 }
        }
      },
      {
        key: '',
        type: 'Text',
        formItemProps: {
          label: '拒绝原因',
          wrapperCol: { span: 10 }
        }
      },
      {
        key: '',
        type: 'Select',
        formItemProps: {
          label: '充值账户',
          wrapperCol: { span: 10 }
        },
        props: {
          options: [
            { label: '资金账户1', value: 1 },
            { label: '资金账户2', value: 2 }
          ]
        }
      },
      {
        key: '',
        type: 'Select',
        formItemProps: {
          label: '充值卡券',
          wrapperCol: { span: 10 }
        },
        props: {
          options: [
            { label: '卡券1', value: 1 },
            { label: '卡券2', value: 2 }
          ]
        }
      },
      {
        key: 'number',
        type: 'Input',
        formItemProps: {
          label: '充值金额',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          type: 'number',
          placeholder: '请输入充值金额'
        }
      },
      {
        key: 'remark',
        type: 'Input',
        formItemProps: {
          label: '备注',
          wrapperCol: { span: 10 }
        },
        props: {
          type: 'text',
          placeholder: '请输入备注'
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
