import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import * as React from 'react';
// import ImageShowPreviewComponent from '~framework/components/image-show-preview-component/image-show-preview.component';
import style from './recharge-detail.module.less';
import { useRechargeDetailStore } from './recharge-detail.component.store';
// const IPreviewImgComponent = ImageShowPreviewComponent;
export default function RechargeDetailComponent() {
  const { state, goback, form } = useRechargeDetailStore();
  const { info } = state;

  function renderUserInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div>
        <h3>
          <strong onClick={goback}>
            <ArrowLeftOutlined />
            返回
          </strong>
        </h3>
        <h3>
          <strong>
            <strong>充值信息</strong>
          </strong>
        </h3>
        <hr />
        <div>
          <h4>
            <strong>账户基本信息</strong>
          </h4>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'账户名'}>
                <span>{info?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户号'}>
                <span>{info?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户累计充值总额'}>
                <span>{(info?.ownerType == 1 ? '个人' : '企业') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户资金余额'}>
                <span>{(info?.certificateType == 1 ? '身份证' : '营业执照') || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <h4>
            <strong>充值信息</strong>
          </h4>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'充值金额'}>
                <span>{info?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'创建时间'}>
                <span>{info?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付类型'}>
                <span>{(info?.ownerType == 1 ? '个人' : '企业') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'备注'}>
                <span>{(info?.certificateType == 1 ? '身份证' : '营业执照') || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <h4>
            <strong>审核信息</strong>
          </h4>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'审核结果'}>
                <span>{info?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'备注'}>
                <span>{info?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderLeft() {
    const span = 8;
    return <Form className={style.imgBox}>{renderUserInfo({ span })}</Form>;
  }
  return (
    <div className={style.addOrder}>
      <React.Fragment>
        <div className={style.addOrderContent}>
          <div>{renderLeft()}</div>
          {/* bug here */}
        </div>
      </React.Fragment>
    </div>
  );
}
