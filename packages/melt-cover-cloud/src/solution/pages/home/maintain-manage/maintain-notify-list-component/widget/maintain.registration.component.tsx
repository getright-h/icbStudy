import { Button, Modal } from 'antd';
import * as React from 'react';
import { IFormComponent } from '@fch/fch-shop-web';
import { IModalComponentProps, schemaMaintainRegistration } from '../maintain-notify-list.interface';
import style from '../maintain-notify-list.module.less';

export default function MaintainRegistrationComponent(props: IModalComponentProps) {
  const { title, visible, handleCancel, handleOk, stateParent, form } = props;
  function renderForm() {
    return (
      <>
        <IFormComponent
          className={style.formStyle}
          form={form}
          schema={schemaMaintainRegistration}
          props={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }}
        ></IFormComponent>
      </>
    );
  }
  return (
    <React.Fragment>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <>
            <Button type="primary" onClick={handleCancel}>
              取消
            </Button>
            <Button loading={stateParent.isLoadingModalNotify} type="primary" onClick={handleOk}>
              确定
            </Button>
          </>
        }
      >
        {renderForm()}
      </Modal>
    </React.Fragment>
  );
}
