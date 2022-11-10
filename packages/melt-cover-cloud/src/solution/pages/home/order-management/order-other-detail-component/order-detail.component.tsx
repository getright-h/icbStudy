import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import * as React from 'react';
import { IPreviewImgComponent } from '@fch/fch-shop-web';
// import ImageShowPreviewComponent from '~framework/components/image-show-preview-component/image-show-preview.component';
import { DISCOUNT_METHOD, PAY_METHOD, TEMPLATESUBTYPE } from '~/solution/shared/enums/home.enum';
import style from './order-detail.module.less';
import { useOrderDetailStore } from './order-detail.component.store';
// const IPreviewImgComponent = ImageShowPreviewComponent;
export default function OrderDetailComponent() {
  const { state, goback } = useOrderDetailStore();
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
          <strong>客户信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            {/* <Col className="" span={span}>
              <Form.Item label={'录单经销商'}>
                <span>{info?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'套餐包'}>
                <span>{info?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车主类型'}>
                <span>{(info?.ownerType == 1 ? '个人' : '企业') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'证件类型'}>
                <span>{(info?.certificateType == 1 ? '身份证' : '营业执照') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'证件号码'}>
                <span>{info?.certificateNumber || '-'}</span>
              </Form.Item>
            </Col> */}
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
                <span>{info?.ownerMobile || '-'}</span>
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
            {/* <Col className="" span={span}>
              <Form.Item label={'是否在用车'}>
                <span>{info?.isNewVehicle ? '新车' : '在用车' || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'购车时间'}>
                <span>{info?.createTime || '-'}</span>
              </Form.Item>
            </Col> */}
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
              <Form.Item label={'车型'}>
                <span>{`${info?.brandName}-${info?.factoryName}-${info?.versionName}` || '-'}</span>
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
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户名'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'购买套餐包'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'套餐金额'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'订单时间'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'状态'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付方式'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'最大服务期限'}>
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'备注'}>
                <span>{info?.equityGroupPrice || '-'}</span>
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
        <div className={style.scrollContent}>
          <Form className={style.imgBox}>
            {/* {info?.certificateFront && (
              <>
                <p>{info?.ownerType === 1 ? '车主证件照正面' : '营业执照'}</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.certificateFront}
                      src={info?.certificateFront}
                      alt={info?.ownerType === 1 ? '车主证件照正面' : '营业执照'}
                    />
                  </div>
                </Form.Item>
              </>
            )}
            {info?.reverseSideOfCertificate && info?.ownerType == 1 && (
              <>
                <p>车主证件照反面</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.reverseSideOfCertificate}
                      src={info?.reverseSideOfCertificate}
                      alt="车主证件照反面"
                    />
                  </div>
                </Form.Item>
              </>
            )} */}
            {info?.imagesDatas?.length > 0 && (
              <>
                <p>车身图</p>
                <Form.Item>
                  {info?.imagesDatas.map(item => {
                    return (
                      <>
                        {item.subType == TEMPLATESUBTYPE.IMAGE && item.imageUrl && item.status == 0 && (
                          <div className={style.img} key={item.id}>
                            {/* todo 填充图片描述 */}
                            <IPreviewImgComponent src={item.imageUrl} alt="车身图" />
                          </div>
                        )}
                        {item.subType == TEMPLATESUBTYPE.VIDEO && item.imageUrl && item.status == 0 && (
                          <div className={style.img} key={item.id}>
                            <video controls src={item.imageUrl}></video>
                          </div>
                        )}
                      </>
                    );
                  })}
                </Form.Item>
              </>
            )}
          </Form>
        </div>
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
