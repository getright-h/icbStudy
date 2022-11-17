import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Divider, Input, Radio } from 'antd';
import * as React from 'react';
// import ImageShowPreviewComponent from '~framework/components/image-show-preview-component/image-show-preview.component';
import style from './recharge-detail.module.less';
import { useRechargeDetailStore } from './recharge-detail.component.store';
import TextArea from 'antd/lib/input/TextArea';
import { ElementOptions } from './recharge-detail.interface';
import { ImageDisplayComponent } from '~/framework/components/component.module';
// const IPreviewImgComponent = ImageShowPreviewComponent;
export default function RechargeDetailComponent() {
  const { state, goback, form, isExamine, examineFn } = useRechargeDetailStore();
  const { info } = state;

  function renderUserInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div>
        <h3>
          <Button onClick={goback} icon={<ArrowLeftOutlined />}>
            返回
          </Button>
        </h3>
        <h2>充值信息</h2>
        <div>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'账户名'}>
                <span>{info?.bagInfo?.name || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户号'}>
                <span>{info?.bagInfo?.number || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户累计充值总额'}>
                <span>{info?.bagInfo?.totalInCome ?? '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户资金余额'}>
                <span>{info?.bagInfo?.balance ?? '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider />
        <div>
          <h2>充值信息</h2>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'充值卡卷'}>
                <span>{info?.buyInfo?.businessName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'充值金额'}>
                <span>{info?.buyInfo?.number ?? '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'卡券积累充值金额'}>
                <span>{info?.buyInfo?.totalInCome ?? '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'卡券金额'}>
                <span>{info?.buyInfo?.balance ?? '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付类型'}>
                <span>{info?.buyInfo?.payType || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'备注'}>
                <span>{info?.buyInfo?.remark || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'附件凭证'}>
                {info?.buyInfo?.receiptImage ? (
                  <ImageDisplayComponent width={'200px'} height="auto" imageUrl={info?.buyInfo?.receiptImage} />
                ) : (
                  '-'
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Divider />
        <div>
          <h2>审核信息</h2>
          {isExamine ? (
            <Row>
              <Col className="" span={span}>
                <Form.Item name="auditState" label={'审核结果'} rules={[{ required: true }]}>
                  <Radio.Group options={ElementOptions} />
                </Form.Item>
              </Col>
              <Col className="" span={span}>
                <Form.Item name="auditRemark" label={'备注'}>
                  <TextArea placeholder="请输入审核备注" />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="" span={span}>
                <Form.Item label={'审核结果'}>
                  <span>{info?.auditInfo?.auditStateText || '-'}</span>
                </Form.Item>
              </Col>
              <Col className="" span={span}>
                <Form.Item label={'备注'}>
                  <span>{info?.auditInfo?.auditRemark || '-'}</span>
                </Form.Item>
              </Col>
            </Row>
          )}
        </div>
        {isExamine && (
          <>
            <Divider />
            <Row>
              <Col offset={22}>
                <Button onClick={examineFn} danger>
                  确认
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }

  function renderLeft() {
    const span = 8;
    return (
      <Form form={form} className={style.imgBox}>
        {renderUserInfo({ span })}
      </Form>
    );
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
