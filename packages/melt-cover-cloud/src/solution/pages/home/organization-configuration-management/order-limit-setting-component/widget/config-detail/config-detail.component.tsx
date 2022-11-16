import { IFormComponent, useForm } from '@fch/fch-shop-web';
import { Col, Form, Modal, Row, Divider } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { ITablePlus } from '~/framework/components/component.module';
import { useTable } from '~/framework/hooks/useTable';
import style from './config-detail.module.less';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { IConfigDetailProps } from './config-detail';

export default function ConfigDetailComponent(props: IConfigDetailProps) {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const form = useForm();

  useEffect(() => {
    if (visible) {
      getDetail();
    }
  }, [visible]);

  function getDetail() {}

  function renderDetail() {
    return (
      <div>
        <h2>机构信息</h2>
        <Row>
          <Col span={6}>
            <Form.Item label={'机构名称'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'社会信用代码'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'联系电话'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'联系人'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'创建人'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'创建时间'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'预计状态'}>
              <span>{initData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <h2>卡券信息</h2>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <div className={style.box}>
              <Form.Item label={'关联卡券'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'可用额度'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'剩余可用额度'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'录单卡卷剩余额度告警值'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
              </Form.Item>
              <Form.Item label={'预警状态'} style={{ marginBottom: 0 }}>
                <span>{initData?.bagName || '-'}</span>
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
