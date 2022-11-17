import { Button, Modal, Typography } from 'antd';
import * as React from 'react';
import {
  IFormBaseComponentsUnion,
  TypeUseForm,
  IFormComponent,
  FormRenderItem,
  IPreviewImgComponent
} from '@fch/fch-shop-web';
import { IWidget } from '@fch/fch-shop-web/dist/src/IFormRenderComponent/form-render.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: any;
  handleFormChangeEvent?: Function;
  watch2?: IWidget;
}

export default function AddPackageModalComponent(props: IAddEquityProps) {
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
        widget={{
          Text: Typography.Text,
          Img: IPreviewImgComponent
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
      {
        key: 'bagName',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户名称',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'bagNumber',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户号',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'totalIncome',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户累计充值总额',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'balance',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户资金余额',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'number',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '充值金额',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'createTime',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '创建时间',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'bagTypeText',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '支付类型',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'remark',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '充值备注',
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'remark',
        type: 'Img',
        formItemProps: {
          valuePropName: 'children',
          label: '附件图片',
          // style: { width: '50px' },
          wrapperCol: { span: 10 }
        },
        props: {
          src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          // style: { width: '50px' }
        }
      },
      {
        key: 'auditState',
        type: 'Select',
        formItemProps: {
          label: '审核结果',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          options: [
            { label: '通过', value: 1 },
            { label: '不通过', value: 0 }
          ]
        }
      },
      {
        key: 'auditRemark',
        type: 'Input',
        formItemProps: {
          label: '审核备注',
          wrapperCol: { span: 10 }
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
