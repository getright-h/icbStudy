import { Button, Col, Form, Modal, Row, Typography, Divider } from 'antd';
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
import { schema } from './addEquityModal';
import { ISelectAccount, ISelectCard } from '~/framework/components/component.module';

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

  function RenderAuditInfo() {
    const span = 24;
    return (
      <>
        <Row style={{ border: '1px solid #DADADA' }}>
          <Col className="" span={span} push={4}>
            <Form.Item label={'审核结果'}>
              <span>{stateParent?.info?.auditInfo?.auditStateText || '-'}</span>
            </Form.Item>
          </Col>
          <Col className="" span={span} push={4}>
            <Form.Item label={'审核备注'}>
              <span>{stateParent?.info?.auditInfo?.auditRemark || '-'}</span>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
      </>
    );
  }

  function renderForm() {
    return (
      <IFormComponent
        form={form}
        watch={watch2}
        schema={schema}
        widget={{ IUploadImgComponent: IUploadImgComponent, ISelectAccount, ISelectCard }}
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
        {RenderAuditInfo()}
        {renderForm()}
      </Modal>
    </div>
  );
}
