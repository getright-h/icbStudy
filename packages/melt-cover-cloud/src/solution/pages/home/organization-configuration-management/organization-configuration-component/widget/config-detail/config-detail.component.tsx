import { IFormComponent, useForm } from '@fch/fch-shop-web';
import { Col, Form, Modal, Row, Divider } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { ITablePlus } from '~/framework/components/component.module';
import { useTable } from '~/framework/hooks/useTable';
import style from './config-detail.module.less';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { IConfigDetailProps, IConfigDetailState } from './config-detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IS_ENUM, YesNoOptions } from '~/solution/shared/constant/currency.const';
import { ColumnTools } from '~/framework/util/widget';
import { LevelOptions } from '../config-modal/config-modal.interface';

export default function ConfigDetailComponent(props: IConfigDetailProps) {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { state, setStateWrap } = useStateStore(new IConfigDetailState());
  const { initData, close, visible } = props;
  const form = useForm();

  useEffect(() => {
    if (visible) {
      getDetail();
    }
  }, [visible]);

  function getDetail() {
    fundsOrganizitonOtherService.organizationConfigDetail({ id: initData?.id }).subscribe(res => {
      setStateWrap({ detailData: res });
    });
  }

  function renderDetail() {
    const detailData = state?.detailData;
    const { renderTag } = ColumnTools;
    return (
      <div>
        <h2>机构信息</h2>
        <Row>
          <Col span={8}>
            <Form.Item label={'机构名称'}>
              <span>{detailData?.distributorName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'关联资金账户'}>
              <span>{detailData?.bagName || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'关联卡券'}>
              <span>{detailData?.businessNames || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'配置是否开启额度限制'}>
              <span>{detailData?.isLimitTxt || '-'}</span>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={'更新时间'}>
              <span>{detailData?.modifyTime || '-'}</span>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {!!detailData?.cardSets?.length && (
          <>
            <h2>卡券信息</h2>
            <Row gutter={[20, 20]}>
              {detailData?.cardSets?.map((card, index) => {
                return (
                  <Col span={8} key={index}>
                    <div className={style.box}>
                      <Form.Item label={'卡卷'} style={{ marginBottom: 0 }}>
                        <span>{card?.businessName || '-'}</span>
                      </Form.Item>
                      <Form.Item label={'是否允许下级机构扣款'} style={{ marginBottom: 0 }}>
                        <span>{renderTag(YesNoOptions, card?.isAllowSubDeductMoney) || '-'}</span>
                      </Form.Item>
                      {card?.isAllowSubDeductMoney === IS_ENUM.OPEN && (
                        <>
                          <Form.Item label={'支持扣款机构层级'} style={{ marginBottom: 0 }}>
                            <span>{renderTag(LevelOptions, card?.organizationDeductMoneyLevel) || '-'}</span>
                          </Form.Item>
                          <Form.Item label={'配置是否开启下级机构额度限制'} style={{ marginBottom: 0 }}>
                            <span>{renderTag(YesNoOptions, card?.isLimit) || '-'}</span>
                          </Form.Item>
                        </>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    );
  }
  return (
    <div>
      <Modal width={1200} title={'详情'} visible={visible} onCancel={() => close()} footer={null}>
        {renderDetail()}
      </Modal>
    </div>
  );
}
