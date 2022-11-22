import { ShowNotification, useForm } from '@fch/fch-shop-web';
import { Col, Form, Modal, Row, Divider, Button } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import style from './card-manage.module.less';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ICardManageProps, ICardManageState } from './card-manage.interface';
import { ACTION_TYPE } from '../../fund-account-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { BagRelation } from '~/solution/model/dto/funds-organiziton-other.dto';
import { BAG_STATE_ENUM } from '~/solution/shared/constant/currency.const';

export default function CardManageComponent(props: ICardManageProps) {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const { state, setStateWrap } = useStateStore(new ICardManageState());
  useEffect(() => {
    if (visible) {
      getCardDetail();
    }
  }, [visible]);

  // 获取卡券相关详情
  function getCardDetail() {
    fundsOrganizitonOtherService.bagDetail({ bagId: initData?.bagId }).subscribe(res => {
      setStateWrap({ detailData: res });
    });
  }

  function setCardState(row: BagRelation) {
    const state = row.state === BAG_STATE_ENUM.normal ? BAG_STATE_ENUM.frozen : BAG_STATE_ENUM.normal;
    const text = row.state === BAG_STATE_ENUM.normal ? '冻结' : '解冻';
    Modal.confirm({
      title: '提示',
      type: 'warning',
      content: `确定要${text}这个账户吗?`,
      onOk: () => {
        fundsOrganizitonOtherService.setBagRelationState({ bagRelationId: row.bagRelationId, state }).subscribe(_ => {
          ShowNotification.success('设置成功');
          getCardDetail();
        });
      }
    });
  }

  function renderDetail() {
    const bagInfo = state?.detailData?.bag;
    return (
      <div>
        <h2>账户信息</h2>
        <Row>
          <Col span={6}>
            <Form.Item label={'账户名'}>
              <span>{bagInfo?.name || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'账户号'}>
              <span>{bagInfo?.id || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'创建时间'}>
              <span>{bagInfo?.createTime || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'支付类型'}>
              <span>{initData?.typeText || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'账户状态'}>
              <span>{initData?.stateText || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'积累充值总额'}>
              <span>{initData?.totalInCome + '虚拟币' ?? '-'}</span>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={'资金余额'}>
              <span>{initData?.balance + '虚拟币' ?? '-'}</span>
            </Form.Item>
          </Col>
          {/* <Col span={6}>
            <Form.Item label={'锁定资金'}>
              <span>{initData?.bagName ?? '-'}</span>
            </Form.Item>
          </Col> */}
        </Row>
        <Divider />
        <h2>卡券信息</h2>
        <Row gutter={[20, 20]}>
          {state?.detailData?.bagRelations?.map((b, index) => {
            return (
              <Col span={8} key={index}>
                <div className={style.box}>
                  <Form.Item label={<b>{b.businessName}</b>} style={{ marginBottom: 0 }} colon={false}></Form.Item>
                  <Form.Item label={'卡券金额'} style={{ marginBottom: 0 }}>
                    <span>{b.balance + '虚拟币' ?? '-'}</span>
                  </Form.Item>
                  <Form.Item label={'卡券累积金额'} style={{ marginBottom: 0 }}>
                    <span>{b?.totalInCome + '虚拟币' ?? '-'}</span>
                  </Form.Item>
                  <Form.Item
                    label={' '}
                    style={{ marginTop: '20px', marginBottom: 0 }}
                    colon={false}
                    wrapperCol={{ push: 20 }}
                  >
                    {b?.state === BAG_STATE_ENUM.normal ? (
                      <Button onClick={() => setCardState(b)} danger>
                        冻结
                      </Button>
                    ) : (
                      <Button onClick={() => setCardState(b)}>解冻</Button>
                    )}
                  </Form.Item>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
  return (
    <div>
      <Modal width={1400} title={'详情'} visible={visible} onCancel={() => close()} footer={null}>
        {renderDetail()}
      </Modal>
    </div>
  );
}
