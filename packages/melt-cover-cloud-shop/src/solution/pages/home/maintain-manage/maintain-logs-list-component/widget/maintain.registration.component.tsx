import { Button, Modal } from 'antd';
import * as React from 'react';
import { IFormComponent } from '@fch/fch-shop-web';
import { schemaMaintainRegistration, IModalComponentProps } from '../maintain-logs-list.interface';
import style from '../maintain-logs-list.module.less';

export default function MaintainRegistrationComponent(props: IModalComponentProps & { watch: any }) {
  const { title, visible, handleCancel, handleOk, isLoading, form, watch } = props;
  function renderForm() {
    return (
      <>
        <IFormComponent
          watch={watch}
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
            <Button loading={isLoading} type="primary" onClick={handleOk}>
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
