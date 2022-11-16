import { IFormComponent, ShowNotification, useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { Button, Input, Modal } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ISetOrderLimitProps, ISetOrderLimitState, schema } from './set-order-limit.interface';

export default function SetOrderLimitComponent(props: ISetOrderLimitProps) {
  const { state, setStateWrap } = useStateStore(new ISetOrderLimitState());
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const form = useForm();

  useEffect(() => {
    if (visible) {
      setStateWrap({ loading: false });
      form.resetFields();
      getDetail();
    }
  }, [visible]);

  function getDetail() {
    form.setFieldsValue({
      orderLimit: initData?.orderLimit || undefined,
      orderResidueWarnMoney: initData?.orderResidueWarnMoney || undefined
    });
  }

  function handleOk() {
    form.validateFields().then(values => {
      setStateWrap({ loading: true });
      const params = {
        ...values,
        id: initData?.id
      };
      fundsOrganizitonOtherService.setLimit(params).subscribe(
        _ => {
          ShowNotification.success('设置成功');
          close(true);
        },
        _ => {
          setStateWrap({ loading: false });
        }
      );
    });
  }

  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
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
        title={'设置额度'}
        onOk={handleOk}
        confirmLoading={state.loading}
        onCancel={() => close()}
        visible={visible}
      >
        <p>按照订单金额设置</p>
        <p>当前仅有额度可设置，请合理安排</p>
        {renderForm()}
      </Modal>
    </div>
  );
}
