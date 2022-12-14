import { IFormComponent, ShowNotification, useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { Button, Form, Input, Modal, Typography } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { BaseRegExpRule } from '~/framework/util/rulesBase';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ISetOrderLimitProps, ISetOrderLimitState, schema } from './set-order-limit.interface';
import style from './set-order-limit.module.less';

const { Text } = Typography;
export default function SetOrderLimitComponent(props: ISetOrderLimitProps) {
  const { state, setStateWrap } = useStateStore(new ISetOrderLimitState());
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      setStateWrap({ loading: false });
      form.resetFields();
      getDetail();
    }
  }, [visible]);

  function getDetail() {
    fundsOrganizitonOtherService.limitDetail({ id: initData?.id }).subscribe(res => {
      setStateWrap({ detailData: res });
      if (res?.cardOrderLimits?.length) {
        form.setFieldsValue({
          cardSetLimits: res.cardOrderLimits
        });
      }
    });
    // form.setFieldsValue({
    //   orderLimit: initData?.orderLimit || undefined,
    //   orderResidueWarnMoney: initData?.orderResidueWarnMoney || undefined
    // });
    // form.setFieldsValue({
    //   cardList: [{ name: '小瓜' }, { name: '小车' }]
    // });
  }

  function handleOk() {
    form.validateFields().then((values: any) => {
      if (!values?.cardSetLimits) {
        close();
        return;
      }
      setStateWrap({ loading: true });
      const params = {
        id: initData?.id,
        cardSetLimits: values?.cardSetLimits
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

  function formValuesChange() {}

  function RenderForm() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      style: { width: '100%' }
    };
    return (
      <Form {...layout} form={form} onValuesChange={formValuesChange} className="form-block-content">
        <Form.List name="cardSetLimits">
          {(fields, { add, remove, move }) => (
            <React.Fragment>
              {fields.map((field, i) => {
                return (
                  <div key={i} className={style.box}>
                    <Form.Item name={[field.name, 'businessName']} label="卡券" valuePropName="children">
                      <Text type="warning" />
                    </Form.Item>
                    <Form.Item name={[field.name, 'orderLimit']} label="可用额度" rules={[BaseRegExpRule.amount]}>
                      <Input placeholder="请输入限额值" addonAfter="虚拟货币" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'orderResidueWarnMoney']}
                      label="录单卡券剩余额度告警值"
                      rules={[{ required: true }, BaseRegExpRule.amount]}
                    >
                      <Input placeholder="请输入限额值" addonAfter="虚拟货币" />
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
    <div>
      <Modal
        width={700}
        title={'设置额度'}
        onOk={handleOk}
        confirmLoading={state.loading}
        onCancel={() => close()}
        visible={visible}
      >
        {/* <p>按照订单金额设置</p>
        <p>当前仅有额度可设置，请合理安排</p> */}
        {RenderForm()}
        {!state?.detailData?.cardOrderLimits?.length && (
          <div style={{ textAlign: 'center' }}>
            请先在<Text type="danger">【机构配置】</Text>中配置关联的资金账户
          </div>
        )}
      </Modal>
    </div>
  );
}
