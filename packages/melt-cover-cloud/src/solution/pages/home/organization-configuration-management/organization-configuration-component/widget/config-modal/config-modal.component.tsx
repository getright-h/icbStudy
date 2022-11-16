import { IFormComponent, ShowNotification, useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { Form, Modal, Radio, Select, Typography } from 'antd';
import * as React from 'react';
import { ISelectAccount, ISelectCard, ISelectCardMultiple } from '~/framework/components/component.module';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { IS_ENUM, YesNoOptions } from '~/solution/shared/constant/currency.const';
import { IConfigProps, IConfigState, LevelOptions } from './config-modal.interface';
import style from './config-modal.component.module.less';

const { Text } = Typography;

export default function ConfigModalComponent(props: IConfigProps) {
  const { state, setStateWrap } = useStateStore(new IConfigState());
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      setStateWrap({ loading: false });
      form.resetFields();
      getDetail();
    }
  }, [visible]);

  function getDetail() {
    // form.setFieldsValue({
    //   bagId: initData?.bagId || undefined,
    //   isLimit: initData?.isLimit === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isLimit,
    //   isRelationDeductMoney:
    //     initData?.isRelationDeductMoney === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isRelationDeductMoney,
    //   isAllowSubDeductMoney:
    //     initData?.isAllowSubDeductMoney === IS_ENUM.NULL ? IS_ENUM.OPEN : initData?.isAllowSubDeductMoney
    // });
    form.setFieldsValue({
      cardList: [{ name: '李华' }, { name: '小黑' }]
    });
  }

  function handleOk() {
    form.validateFields().then((values: any) => {
      console.log('[s]===>🚀', values);
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

  function formValuesChange() {}

  function RenderForm() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      style: { width: '100%' }
    };
    return (
      <Form {...layout} form={form} onValuesChange={formValuesChange} className="form-block-content">
        <Form.Item label="关联资金账户" name="bagId" rules={[{ required: true }]}>
          <ISelectAccount isPreload={true} />
        </Form.Item>
        <Form.Item label="关联卡券1" name="cardId1" rules={[{ required: true }]}>
          <ISelectCard isPreload={true} />
        </Form.Item>
        <Form.Item label="关联卡券" name="cardId" rules={[{ required: true }]}>
          <ISelectCardMultiple isPreload={true} />
        </Form.Item>
        <Form.List name="cardList">
          {(fields, { add, remove, move }) => (
            <React.Fragment>
              {fields.map((field, i) => {
                return (
                  <div key={i} className={style.box}>
                    <Form.Item name={[field.name, 'name']} label="卡券" valuePropName="children">
                      <Text type="warning" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'isAllowSubDeductMoney']}
                      label="是否允许下级机构扣款"
                      rules={[{ required: true }]}
                    >
                      <Radio.Group options={YesNoOptions} />
                    </Form.Item>
                    <Form.Item name={[field.name, 'isXX']} label="支持扣款机构层级" rules={[{ required: true }]}>
                      <Select options={LevelOptions} placeholder="请选择支持扣款机构层级" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'isLimit']}
                      label="是否开启下级机构额度限制"
                      rules={[{ required: true }]}
                    >
                      <Radio.Group options={YesNoOptions} />
                    </Form.Item>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </Form.List>
      </Form>
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
      {RenderForm()}
    </Modal>
  );
}
