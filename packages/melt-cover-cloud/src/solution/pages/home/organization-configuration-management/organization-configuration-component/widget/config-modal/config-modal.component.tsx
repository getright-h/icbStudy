import { IFormComponent, ShowNotification, useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { Modal } from 'antd';
import * as React from 'react';
import { ISelectAccount } from '~/framework/components/component.module';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { IS_ENUM } from '~/solution/shared/constant/currency.const';
import { IConfigProps, IConfigState, schema } from './config-modal.interface';

export default function ConfigModalComponent(props: IConfigProps) {
  const { state, setStateWrap } = useStateStore(new IConfigState());
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const form = useForm();

  React.useEffect(() => {
    if (visible) {
      setStateWrap({ loading: false });
      form.resetFields();
      getDetail();
    }
  }, [visible]);

  function getDetail() {
    form.setFieldsValue({
      bagId: initData?.bagId || undefined,
      isLimit: initData?.isLimit === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isLimit,
      isRelationDeductMoney:
        initData?.isRelationDeductMoney === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isRelationDeductMoney,
      isAllowSubDeductMoney:
        initData?.isAllowSubDeductMoney === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isAllowSubDeductMoney
    });
  }

  function handleOk() {
    form.validateFields().then(values => {
      setStateWrap({ loading: true });
      const params = {
        ...values,
        distributorId: initData?.distributorId
      };
      fundsOrganizitonOtherService.setOrganizationConf(params).subscribe(
        _ => {
          ShowNotification.success('配置成功');
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
        widget={{ ISelectAccount }}
        props={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          style: { width: '100%' }
        }}
      />
    );
  }

  return (
    <Modal
      width={700}
      title={'配置'}
      onOk={handleOk}
      confirmLoading={state.loading}
      onCancel={() => close()}
      visible={visible}
    >
      {renderForm()}
    </Modal>
  );
}
