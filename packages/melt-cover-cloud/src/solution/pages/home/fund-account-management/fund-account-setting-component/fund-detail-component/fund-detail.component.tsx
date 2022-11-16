import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Form, Radio, Row } from 'antd';
import * as React from 'react';
import { ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import style from './fund-detail.module.less';
import { useOrderDetailStore } from './fund-detail.component.store';
import { inComeColumns, spendingColumns } from './fund-detail.columns';
import { TableType } from './fund-detail.interface';
export default function FundDetailComponent() {
  const { state, goback, changeRaido, changeTablePageIndex } = useOrderDetailStore();
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
            <strong></strong>
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
    const { followSearchForm, followTableData, followTotal, isLoading, radio } = state;
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
            defaultValue={1}
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
                changeTablePageIndex(index, pageSize, TableType.INCOME)
              }
            ></ITableComponent>
          ) : (
            <ITableComponent
              columns={spendingColumns()}
              isLoading={isLoading}
              pageIndex={followSearchForm.index}
              pageSize={followSearchForm.size}
              data={followTableData}
              total={followTotal}
              isPagination={true}
              changeTablePageIndex={(index: number, pageSize: number) =>
                changeTablePageIndex(index, pageSize, TableType.SPENDING)
              }
            ></ITableComponent>
          )}
        </div>
      </div>
    );
  }

  function renderDetailInfo(props: { span: number }) {
    const { span } = props;
    return (
      <div>
        <h4>
          <strong> 交易明细</strong>
        </h4>
        <ITablePageComponent leftFlex={1} rightFlex={5} table={renderLogs()}></ITablePageComponent>
      </div>
    );
  }

  function renderLeft() {
    const span = 8;
    return (
      <Form className={style.imgBox}>
        {renderUserInfo({ span })}
        {renderDetailInfo({ span })}
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
