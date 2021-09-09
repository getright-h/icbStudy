import { Button, Modal } from 'antd';
import * as React from 'react';
import { IFormComponent } from '@fch/fch-shop-web';
import { IModalComponentProps, schemaDetail } from '../maintain-setting.interface';
import style from '../maintain-setting.component.less';

export default function DetailComponent(props: IModalComponentProps) {
  const { title, visible, handleCancel, handleOk, isLoading, form } = props;
  function renderForm() {
    return (
      <>
        <IFormComponent
          className={style.formStyle}
          form={form}
          schema={schemaDetail}
          props={{
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
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
