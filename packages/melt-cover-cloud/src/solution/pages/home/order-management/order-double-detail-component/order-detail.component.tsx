import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import * as React from 'react';
import { IPreviewImgComponent } from '@fch/fch-shop-web';
// import ImageShowPreviewComponent from '~framework/components/image-show-preview-component/image-show-preview.component';
import { TEMPLATESUBTYPE } from '~/solution/shared/enums/home.enum';
import style from './order-detail.module.less';
import { useOrderDetailStore } from './order-detail.component.store';
import moment from 'moment';
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
          <strong>客户基本信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            <Col className="" span={span}>
              <Form.Item label={'录单经销商'}>
                <span>{info?.agreedServiceProvider || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'套餐包'}>
                <span>{info?.businessType || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车主类型'}>
                <span>{(info?.ownerType == 1 ? '个人' : '企业') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'证件类型'}>
                <span>{(info?.documentType == 1 ? '身份证' : '营业执照') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'证件号码'}>
                <span>{info?.identificationNumber || '-'}</span>
              </Form.Item>
            </Col>
            {info?.ownerType == 1 && (<><Col className="" span={span}>
              <Form.Item label={'车主姓名'}>
                <span>{info?.ownerName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车主手机号'}>
                <span>{info?.ownerTelephone || '-'}</span>
              </Form.Item>
            </Col></>)}
            {info?.ownerType == 2 && (<><Col className="" span={span}>
              <Form.Item label={'公司名称'}>
                <span>{info?.ownerName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'公司电话'}>
                <span>{info?.ownerTelephone || '-'}</span>
              </Form.Item>
            </Col></>)}
            {info?.ownerType == 2 && (<><Col className="" span={span}>
              <Form.Item label={'驾驶员姓名'}>
                <span>{info?.driverName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'驾驶员电话'}>
                <span>{info?.driverTelephone || '-'}</span>
              </Form.Item>
            </Col></>)}
            {/* 新增需求 */}
            <Col className="" span={span}>
              <Form.Item label={'车主与本人关系'}>
                <span>{info?.relationshipBetweenTheOwnerAndHimself || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车主联系地址'}>
                <span>{info?.ownerContactAddress || '-'}</span>
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
          <strong>汽车基本信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            {/* <Col className="" span={span}>
              <Form.Item label={'是否在用车'}>
                <span>{info?.isNewVehicle ? '新车' : '在用车' || '-'}</span>
              </Form.Item>
            </Col> */}
            <Col className="" span={span}>
              <Form.Item label={'车牌号码'}>
                <span>{info?.licensePlateNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'发动机号'}>
                <span>{info?.engineNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车架号'}>
                <span>{info?.frameNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'购车时间'}>
                <span>{info?.vehiclePurchaseDate || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'车型'}>
                <span>{info?.model || '-'}</span>
              </Form.Item>
            </Col>
            {/* 新增需求 */}
            <Col className="" span={span}>
              <Form.Item label={'增压类型'}>
                <span>{info?.pressurizationType || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'是否运营乘用车'}>
                <span>{info?.isTheVehicleOperated ? '是' : '否' || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'排量'}>
                <span>{info?.displacement && (info?.displacement + 'T') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'变速类型'}>
                <span>{info?.variableSpeedType || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'座位数'}>
                <span>{info?.numberOfSeats || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'新车购置价'}>
                <span>{info?.purchasePriceOfNewCar && (info?.purchasePriceOfNewCar + '万') || '-'}</span>
              </Form.Item>
            </Col>
            {/* <Col className="" span={span}>
              <Form.Item label={'服务购买费用'}>
                <span>{info?.purchaseServiceFee || '-'}</span>
              </Form.Item>
            </Col> */}
            <Col className="" span={span}>
              <Form.Item label={'服务开始时间'}>
                <span>{info?.serviceStartTime && moment(info?.serviceStartTime).format('YYYY-MM-DD') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'服务截止时间'}>
                <span>{info?.serviceDeadline && moment(info?.serviceDeadline).format('YYYY-MM-DD') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'服务期限'}>
                <span>{info?.maximumServicePeriod && info?.maximumServicePeriod + '月' || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'入会车辆里程数'}>
                <span>{info?.joiningVehicleMileage && (info?.joiningVehicleMileage + 'km') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'是否购买车辆损失险'}>
                <span>{info?.whetherToPurchaseVehicleLossInsurance || '-'}</span>
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
              <Form.Item label={'套餐包金额'}>
                <span>{info?.purchaseServiceFee && (info?.purchaseServiceFee + '元') || '-'}</span>
              </Form.Item>
            </Col>
            {/* 新增 */}
            <Col className="" span={span}>
              <Form.Item label={'出单员'}>
                <span>{info?.billingClerk || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付方式'}>
                <span>{info?.paymentMethod || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付凭证号'}>
                <span>{info?.paymentVoucherNo || '-'}</span>
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
            )} */}
            {info?.ownerCertificatePhoto && (
              <><p>车主证件照</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.ownerCertificatePhoto}
                      src={info?.ownerCertificatePhoto}
                      alt={'车主证件照'}
                    />
                  </div>
                </Form.Item></>
            )}
            {info?.purchaseInvoice && (
              <>
                <p>购车发票</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.purchaseInvoice}
                      src={info?.purchaseInvoice}
                      alt="购车发票 "
                    />
                  </div>
                </Form.Item>
              </>
            )}
            {info?.paymentVoucher && (
              <>
                <p>支付凭证</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.paymentVoucher}
                      src={info?.paymentVoucher}
                      alt="支付凭证 "
                    />
                  </div>
                </Form.Item>
              </>
            )}
            {info?.attachPicturePackage && (
              <>
                <p> 附加图片</p>
                <Form.Item>
                  <div className={style.img}>
                    <IPreviewImgComponent
                      key={info?.attachPicturePackage}
                      src={info?.attachPicturePackage}
                      alt="购车发票 "
                    />
                  </div>
                </Form.Item>
              </>
            )}
            {/* {info?.imagesDatas?.length > 0 && (
              <>
                <p>车身图</p>
                <Form.Item>
                  {info?.imagesDatas.map(item => {
                    return (
                      <>
                        {item.subType == TEMPLATESUBTYPE.IMAGE && item.imageUrl && item.status == 0 && (
                          <div className={style.img} key={item.id}>
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
            )} */}
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
          <div>{renderRight()}</div>
        </div>
      </React.Fragment>
    </div>
  );
}
