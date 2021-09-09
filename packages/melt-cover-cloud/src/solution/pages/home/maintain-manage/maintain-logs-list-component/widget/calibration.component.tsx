import { Button, Modal } from 'antd';
import * as React from 'react';
import { IFormComponent } from '@fch/fch-shop-web';
import { IModalComponentProps, schemaCalibration, schemaProject } from '../maintain-logs-list.interface';
import style from '../maintain-logs-list.component.less';

export default function CalibrationComponent(props: IModalComponentProps) {
  const { title, visible, handleCancel, handleOk, isLoading, form } = props;

  function renderForm() {
    const schema = title == '新增保养项目' ? schemaProject : schemaCalibration;
    return (
      <>
        <IFormComponent
          className={style.formStyle}
          form={form}
          schema={schema}
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
        zIndex={9999}
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
