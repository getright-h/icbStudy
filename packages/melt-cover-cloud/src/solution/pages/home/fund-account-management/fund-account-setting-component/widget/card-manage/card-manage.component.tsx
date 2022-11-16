import { useForm } from '@fch/fch-shop-web';
import { Col, Form, Modal, Row, Divider, Button } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import style from './card-manage.module.less';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ICardManageProps } from './card-manage';
import { ACTION_TYPE } from '../../fund-account-setting.interface';

export default function CardManageComponent(props: ICardManageProps) {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible, action } = props;

  useEffect(() => {
    if (visible) {
      getDetail();
    }
  }, [visible]);

  function getDetail() {}

  function renderDetail() {
    return (
      <div>
        <h2>账户信息</h2>
        <Row>
          <Col span={6}>
            <Form.Item label={'账户名'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'账户号'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'创建时间'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'支付类型'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'账户状态'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'积累充值总额'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'资金余额'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'锁定资金'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <h2>卡券信息</h2>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <div className={style.box}>
              <Form.Item label={'卡券1'} style={{ marginBottom: 0 }} colon={false}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'卡券金额'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'卡券累积金额'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={' '} style={{ marginTop: '20px' }} colon={false} wrapperCol={{ push: 2 }}>
                <Button onClick={() => action(ACTION_TYPE.frozen, initData)}>冻结</Button>
                <Button onClick={() => action(ACTION_TYPE.thaw, initData)}>解冻</Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div>
      <Modal width={1200} title={'详情'} visible={visible} onCancel={() => close()} footer={null}>
        {renderDetail()}
      </Modal>
    </div>
  );
}
