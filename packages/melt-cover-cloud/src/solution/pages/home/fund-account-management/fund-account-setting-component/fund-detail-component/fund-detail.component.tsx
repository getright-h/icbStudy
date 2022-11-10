import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Radio, Row } from 'antd';
import * as React from 'react';
import { IPreviewImgComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
// import ImageShowPreviewComponent from '~framework/components/image-show-preview-component/image-show-preview.component';
import { DISCOUNT_METHOD, PAY_METHOD, TEMPLATESUBTYPE } from '~/solution/shared/enums/home.enum';
import style from './order-detail.module.less';
import { useOrderDetailStore } from './order-detail.component.store';
import { inComeColumns, spendingColumns } from './fund-detail.columns';
// const IPreviewImgComponent = ImageShowPreviewComponent;
export default function OrderDetailComponent() {
  const { state, goback, changeRaido } = useOrderDetailStore();
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
          <strong>交易明细</strong>
        </h3>
        <hr />
        <div>
          <h5>账户基本信息</h5>
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
              <Form.Item label={'累计充值总额'}>
                <span>{(info?.ownerType == 1 ? '个人' : '企业') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'资金余额'}>
                <span>{(info?.certificateType == 1 ? '身份证' : '营业执照') || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'账户状态'}>
                <span>{info?.certificateNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'*配置是否开启额度限制'}>
                <span>{info?.ownerName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'创建时间'}>
                <span>{info?.ownerMobile || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderLogs() {
    const {
      followSearchForm,
      followTableData,
      followTotal,
      consumeSearchForm,
      consumeTableData,
      consumeTotal,
      isLoading,
      radio
    } = state;
    const options = [
      { label: '收入', value: 1 },
      { label: '支出', value: 2 }
    ];
    return (
      <div>
        <div>
          <br />
          <br />
          <Radio.Group
            defaultValue={radio}
            options={options}
            onChange={changeRaido}
            value={radio}
            optionType="button"
            buttonStyle={'solid'}
          />
        </div>
        <hr />
        <div>
          {radio == 1 ? (
            <ITableComponent
              columns={inComeColumns()}
              isLoading={isLoading}
              pageIndex={followSearchForm.index}
              pageSize={followSearchForm.size}
              data={followTableData}
              total={followTotal}
              isPagination={true}
              changeTablePageIndex={(index: number, pageSize: number) =>
                changeTablePageIndex(index, pageSize, TableType.FOLLOW)
              }
            ></ITableComponent>
          ) : (
            <ITableComponent
              columns={spendingColumns()}
              isLoading={isLoading}
              pageIndex={consumeSearchForm.index}
              pageSize={consumeSearchForm.size}
              data={consumeTableData}
              total={consumeTotal}
              isPagination={true}
              changeTablePageIndex={(index: number, pageSize: number) =>
                changeTablePageIndex(index, pageSize, TableType.CONSUME)
              }
            ></ITableComponent>
          )}
        </div>
      </div>
    );
  }

  function renderContent() {
    return <div>{renderLogs()}</div>;
  }

  function renderCarInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div className={style.test}>
        <h5>交易明细</h5>
        <ITablePageComponent leftFlex={1} rightFlex={5} table={renderContent()}></ITablePageComponent>
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
                <span>{info?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'订单是否为散户'}>
                <span>{info?.isScatteredUser ? '是' : '否' || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'订单备注'}>
                <span>{info?.remark || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={span}>
              <Form.Item label={'支付方式'}>
                <span>{PAY_METHOD[info?.payMethod] || '-'}</span>
              </Form.Item>
            </Col>
            {/* <Col className="" span={span}>
              <Form.Item label={'优惠方式'}>
                <span>{DISCOUNT_METHOD[info?.discountMethod] || '-'}</span>
              </Form.Item>
            </Col> */}
            {info?.xiaoXiuActivationCheckRemark && (
              <Col className="" span={24}>
                <Form.Item label={'助修宝审核备注'}>
                  <span>{info?.xiaoXiuActivationCheckRemark || '-'}</span>
                </Form.Item>
              </Col>
            )}
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
  return (
    <div className={style.addOrder}>
      <React.Fragment>
        <div className={style.addOrderContent}>
          <div>{renderLeft()}</div>
        </div>
      </React.Fragment>
    </div>
  );
}
