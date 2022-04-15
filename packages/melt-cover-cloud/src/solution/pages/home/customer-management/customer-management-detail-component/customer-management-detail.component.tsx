import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Radio, Row } from 'antd';
import * as React from 'react';
import { ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import ModalImgShowComponent from '~/framework/components/modal-img-show-component/modal-img-show.component';
import style from './customer-management-detail.module.less';
import { useCustomerManagementDetailStore } from './customer-management-detail.component.store';
import { ConsumeRecordColumns, FollowRecordColumns, RemainEquityColumns } from './customer-detail.columns';
import { TableType } from './customer-management-detail.interface';
import { CERTIFICATE_TYPE_ENUM } from '~/solution/shared/enums/home.enum';

export default function CustomerManagementDetailComponent() {
  const { state, imgList, goback, changeTablePageIndex, changeRaido, toggleModal } = useCustomerManagementDetailStore();
  const { detail, idCardImages, vehicleImages } = state;
  function renderUserInfo() {
    return (
      <div>
        <h3>
          <strong>客户基本信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            <Col className="" span={6}>
              <Form.Item label={'客户姓名'}>
                <span>{detail?.ownerName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'客户电话'}>
                <span>{detail?.ownerMobile || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'客户性别'}>
                <span>{'-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'所属机构'}>
                <span>{detail?.distributorName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'证件类型'}>
                <span>{CERTIFICATE_TYPE_ENUM[detail?.certificateType] || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'证件号码'}>
                <span>{detail?.certificateNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'购买套餐包'}>
                <span>{detail?.equityGroupName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'订单编号'}>
                <span>{detail?.orderNumber || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'常驻地址'}>
                <span>{'-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'下单日期'}>
                <span>{detail?.createTime || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'身份证照'}>
                <div onClick={() => toggleModal('idCardImages')} className={style.imgBox}>
                  <img src="https://emoji.cdn.bcebos.com/yunque/hejirukou.jpg" alt="" />
                  <div>共{idCardImages.length || 0}张</div>
                </div>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'套餐包金额'}>
                <span>{'￥' + detail?.equityGroupPrice || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'销售顾问'}>
                <span>{detail?.salesmenName || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderCarInfo() {
    return (
      <div>
        <h3>
          <strong>汽车基本信息</strong>
        </h3>
        <hr />
        <div>
          <Row>
            <Col className="" span={6}>
              <Form.Item label={'车辆图片'}>
                <div onClick={() => toggleModal('vehicleImages')} className={style.imgBox}>
                  <img src="https://emoji.cdn.bcebos.com/yunque/hejirukou.jpg" alt="" />
                  <div>共{vehicleImages.length || 0}张</div>
                </div>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'车牌号码'}>
                <span>{detail?.ownerPlateNo || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'车型'}>
                <span>{detail?.versionName || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'购车时间'}>
                <span>{detail?.purchaseTime || '-'}</span>
              </Form.Item>
            </Col>
            <Col className="" span={6}>
              <Form.Item label={'车架号'}>
                <span>{detail?.ownerVinNo || '-'}</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  function renderPackage() {
    const { chargeSearchForm, chargeTableData, chargeTotal, chargeBalance, isLoading } = state;
    return (
      <div>
        <div>
          <h3>
            <strong>剩余权益</strong>
          </h3>
          <Row>
            <Col className="" span={6}>
              <Form.Item label={'账户抵扣金余额'}>
                <span>{`￥${chargeBalance}`}</span>
              </Form.Item>
            </Col>
            {/* 有效期与表格内相同，可不展示
            <Col className="" span={6}>
              <Form.Item label={'有效期'}>
                <span>{111 || '-'}</span>
              </Form.Item>
            </Col> */}
          </Row>
        </div>
        <hr />
        <div>
          <ITableComponent
            columns={RemainEquityColumns()}
            isLoading={isLoading}
            pageIndex={chargeSearchForm.index}
            pageSize={chargeSearchForm.size}
            data={chargeTableData}
            total={chargeTotal}
            isPagination={true}
            rowKey={'equityName'}
            changeTablePageIndex={(index: number, pageSize: number) =>
              changeTablePageIndex(index, pageSize, TableType.CHARGE)
            }
          ></ITableComponent>
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
      { label: '跟进&提醒记录', value: 1, disabled: true },
      { label: '回店记录', value: 2 }
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
              columns={FollowRecordColumns()}
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
              columns={ConsumeRecordColumns()}
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
    return (
      <div>
        {renderUserInfo()}
        {renderCarInfo()}
        {renderPackage()}
        {renderLogs()}
      </div>
    );
  }
  function renderTitle() {
    return (
      <div>
        <span className="ml20" onClick={goback}>
          <ArrowLeftOutlined />
          返回
        </span>
        <span className="ml20">客户管理/客户详情</span>
      </div>
    );
  }
  function renderModal() {
    const { visible, modalTitle } = state;
    return (
      <ModalImgShowComponent
        visible={visible}
        title={modalTitle}
        handleClose={() => {
          toggleModal();
        }}
        handleOk={() => {
          toggleModal();
        }}
        imgList={imgList.current}
      />
    );
  }
  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={renderTitle()}
        table={renderContent()}
      ></ITablePageComponent>
      {renderModal()}
    </div>
  );
}
