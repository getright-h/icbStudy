import { QuestionCircleOutlined } from '@ant-design/icons';
import { IFormComponent } from '@fch/fch-shop-web';
import { Button, Cascader, Tooltip } from 'antd';
import * as React from 'react';
import { IUploadImgComponent } from '~/framework/components/component.module';
// import FormRenderComponent from '~/framework/components/form-render-component';
import { uuid } from '~/framework/util/common/tool';
import style from './add-order.component.less';
import { useAddOrderStore } from './add-order.component.store';
import { schema } from './add-order.interface';
import CodeInputComponent from './widget/code-input-component/code-input.component';
import LazyOptionosCascaderComponent from './widget/lazy-optionos-cascader-component/lazy-optionos-cascader.component';
export default function AddOrderComponent() {
  const { state, formRef, handleSubmit, goBack, watch } = useAddOrderStore();
  function renderForm() {
    return (
      <IFormComponent
        form={formRef}
        schema={schema}
        widget={{
          Cascader,
          IUploadImgComponent,
          CodeInputComponent,
          LazyOptionosCascaderComponent
        }}
        props={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 }
        }}
        watch={watch}
      ></IFormComponent>
    );
  }
  function renderSearchButtons() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          className="ml20"
          onClick={() => {
            handleSubmit();
          }}
          loading={state.isLoading}
        >
          提交
        </Button>
        <Button type="primary" className="ml20" onClick={goBack}>
          返回
        </Button>
      </React.Fragment>
    );
  }
  return (
    <div className={style.addOrder}>
      {renderForm()}
      {renderSearchButtons()}
    </div>
  );
}
export function renderToolTip() {
  return (
    <Tooltip title={renderToolTipTitle()}>
      <div>
        是否散户
        <QuestionCircleOutlined key={uuid(7, 10)} />
      </div>
    </Tooltip>
  );
}

function renderToolTipTitle() {
  return (
    <React.Fragment>
      <p key={uuid(7, 10)}>非散户：用户基于此单权益将只能在录单门店消费权益</p>
      <p key={uuid(7, 10)}>散户：用户基于此单权益将可在平台任意门店消费权益</p>
    </React.Fragment>
  );
}
