import { TypeUseForm } from '@fch/fch-shop-web';
import { Button, Col, Form, Modal, Row } from 'antd';
import * as React from 'react';
import { EquityList } from '~/solution/model/dto/equity-package-manage.dto';
import { IEquityPackageManageState } from '../equity-package-manage.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IEquityPackageManageState;
  handleFormChangeEvent: Function;
}

export default function DetailPackageModalComponent(props: IAddEquityProps) {
  const { title, handleOk, handleCancel, visible, stateParent } = props;
  const { detail } = stateParent;

  return (
    <div>
      <Modal
        width={700}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        visible={visible}
        okText={<Button loading={stateParent.isLoadingModal2}>确定</Button>}
      >
        <Row>
          <Col className="" span={12}>
            <Form.Item label={'创建机构'}>
              <span>{detail?.distributorName || '-'}</span>
            </Form.Item>
          </Col>
          <Col className="" span={12}>
            <Form.Item label={'套餐包价格'}>
              <span>{detail?.price || '-'}</span>
            </Form.Item>
          </Col>
          <Col className="" span={12}>
            <Form.Item label={'套餐包名'}>
              <span>{detail?.name || '-'}</span>
            </Form.Item>
          </Col>
          <Col className="" span={12}>
            <Form.Item label={'状态'}>
              <span>{detail?.statusText || '-'}</span>
            </Form.Item>
          </Col>
          <Col className="" span={24}>
            <Form.Item label={'包含权益'} labelCol={{ span: 24 }}>
              <span>
                {detail?.equityList?.map((item: EquityList) => {
                  return (
                    <span
                      style={{
                        backgroundColor: 'orangered',
                        color: 'white',
                        padding: '10px',
                        margin: '5px',
                        display: 'inline-block',
                        borderRadius: '2px 5px'
                      }}
                      key={item.id}
                    >
                      {item.name + ' '}
                    </span>
                  );
                }) || '-'}
              </span>
            </Form.Item>
          </Col>
          <Col className="" span={24}>
            <Form.Item label={'权益使用配置'} labelCol={{ span: 24 }}>
              {detail?.equityList?.map((item: EquityList) => {
                return (
                  <div key={item.id} style={{ display: 'flex', padding: '0px 40px' }}>
                    <Form.Item label={item.name} required></Form.Item>
                    {item.proportion > 0 && <Form.Item label={'权益使用百分比'}>{item.proportion || '-'}%</Form.Item>}
                    &nbsp;&nbsp;&nbsp;
                    {item.number > 0 && <Form.Item label={'权益使用次数'}>{item.number || '-'}次</Form.Item>}
                  </div>
                );
              })}
            </Form.Item>
          </Col>
          <Col className="" span={12}>
            <Form.Item label={'权益服务年限配置'} labelCol={{ span: 24 }}>
              {detail?.equityList?.map((item: EquityList) => {
                return (
                  <div key={item.id} style={{ display: 'flex', padding: '0px 40px' }}>
                    {item.month > 0 && (
                      <Form.Item label={item.name} required>
                        &nbsp;&nbsp;&nbsp;{item.month || '-'}月
                      </Form.Item>
                    )}
                  </div>
                );
              })}
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
