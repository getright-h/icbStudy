import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import * as React from 'react';
import { IPreviewImgComponent } from '@fch/fch-shop-web';
import { TEMPLATESUBTYPE } from '~/solution/shared/enums/home.enum';
import style from './order-detail.module.less';
import { useOrderDetailStore } from './order-detail.component.store';
import { useEffect } from 'react';
export default function OrderDetailComponent() {
  const { state, goback } = useOrderDetailStore();
  const { info, images } = state;
  console.log('images', images);

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
          <strong>客户信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'车主姓名'}>
                <span>{info?.ownerName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车主手机号'}>
                <span>{info?.ownerMobile || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'所属机构'}>
                <span>{info?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderCarInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div>
        <h3>
          <strong>车辆基本信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'车架号'}>
                <span>{info?.ownerVinNo || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车牌号码'}>
                <span>{info?.ownerPlateNo || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车辆类型'}>
                <span>{info?.vehicleClass}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车型'}>
                <span>{info?.vehicleType}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderOrderInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div>
        <div>
          <h3>
            <strong>订单信息</strong>
          </h3>
          <hr />
        </div>
        <div>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'订单编号'}>
                <span>{info?.orderNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户名'}>
                <span>{info?.bagName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户号'}>
                <span>{info?.bagNumber || '-'}</span>
              </Form.Item>
            </Col>
            {/* todo 缺少字段 */}
            <Col className="" span={span}>
              <Form.Item label={'卡券号'}>
                <span>{info?.bagNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'购买套餐包'}>
                <span>{info?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'套餐金额'}>
                <span>{info?.equityGroupPrice}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'订单时间'}>
                <span>{info?.createTime || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'状态'}>
                <span>{info?.orderStateTxt || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付方式'}>
                <span>{info?.payTypeText || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'最大服务期限'}>
                <span>{info?.serviceTime || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'备注'}>
                <span>{info?.remark || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  function renderLeft() {
    const span = 8;
    return (
      <Form className={style.imgBox}>
        {renderUserInfo({ span })}
        {renderCarInfo({ span })}
        {renderOrderInfo({ span })}
      </Form>
    );
  }
  function renderRight() {
    return (
      <>
        {info?.images && (
          <div className={style.scrollContent}>
            <Form className={style.imgBox}>
              <Form.Item>
                {images?.map?.((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item.Title}</p>
                      <div className={style.img}>
                        <IPreviewImgComponent src={JSON.parse(item.Url)?.[0]} alt="车身图" />
                      </div>
                    </div>
                  );
                })}
              </Form.Item>
            </Form>
          </div>
        )}
      </>
    );
  }
  return (
    <div className={style.addOrder}>
      <React.Fragment>
        <div className={style.addOrderContent}>
          <div>{renderLeft()}</div>
          <div style={{ flex: 0.5 }}>{renderRight()}</div>
        </div>
      </React.Fragment>
    </div>
  );
}
