import { Button, Input, Modal, Typography } from 'antd';
import * as React from 'react';
import { IFormBaseComponentsUnion, TypeUseForm, IFormComponent, FormRenderItem } from '@fch/fch-shop-web';
import { IWidget } from '@fch/fch-shop-web/dist/src/IFormRenderComponent/form-render.interface';
import { IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
import style from '../fund-account-setting.component';
import { EQYITY_USE_TYPE } from '~/solution/shared/enums/home.enum';
import { IFundAccountSettingState } from '../fund-account-setting.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IFundAccountSettingState;
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
          Text: Typography.Text
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
        key: 'name',
        type: 'Input',
        formItemProps: {
          label: '账户名',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '请输入账户名'
        }
      },
      {
        key: 'number',
        type: 'Text',
        formItemProps: {
          label: '账户号',
          valuePropName: 'children',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '账户号'
        }
      },
      {
        key: 'createTime',
        type: 'Text',
        formItemProps: {
          label: '创建时间',
          valuePropName: 'children',
          required: true,
          wrapperCol: { span: 10 }
        },
        props: {
          placeholder: '创建时间'
        }
      },
      {
        key: 'type',
        type: 'Select',
        formItemProps: {
          label: '支付类型',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        },
        props: {
          options: [
            { label: '其他', value: 1 },
            { label: '上级分配', value: 0 }
          ]
        }
      },
      {
        key: 'stateText',
        type: 'Text',
        formItemProps: {
          label: '账户状态',
          valuePropName: 'children',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'totalInCome',
        type: 'Text',
        formItemProps: {
          label: '累计充值总额',
          valuePropName: 'children',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'balance',
        type: 'Text',
        formItemProps: {
          label: '资金总额',
          valuePropName: 'children',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'distributor',
        type: 'Text',
        formItemProps: {
          label: '锁定资金',
          valuePropName: 'children',
          wrapperCol: { span: 10 }
        }
      }
    ],
    props: {
      cols: 2
    }
  }
];
