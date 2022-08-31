import * as React from 'react';
import { Modal, Descriptions, Divider, Space, Button, Popconfirm } from 'antd';
import { IPreviewImgComponent } from '@fch/fch-shop-web';
import { ACTION_TYPE } from '../rights-list-of-double-component/rights-list-of-double.interface';

interface IAddEquityProps {
  titleType: ACTION_TYPE;
  handleCancel: () => void;
  handleRefuse: Function;
  handleAudit: Function;
  visible: boolean;
  detail: any;
  auditLoading?: boolean;
}

export default function DetailOfDoubleComponent(props: IAddEquityProps) {
  const { titleType, handleCancel, visible, detail, handleRefuse, handleAudit, auditLoading } = props;

  /** 处理弹窗标题字段 */
  function renderTitle() {
    let title = '';
    switch (titleType) {
      case ACTION_TYPE.Detail:
        title = '详情';
        break;
      case ACTION_TYPE.Audit:
        title = '审核';
        break;
      default:
        break;
    }
    return title;
  }

  function renderForm() {
    return (
      <div>
        <Descriptions column={4}>
          <Descriptions.Item label="车主姓名">{detail.ownerName}</Descriptions.Item>
          <Descriptions.Item label="车主电话">{detail.ownerMobile}</Descriptions.Item>
          <Descriptions.Item label="车牌号">{detail.ownerPlateNo}</Descriptions.Item>
          <Descriptions.Item label="车架号">{detail.ownerVinNo}</Descriptions.Item>
          <Descriptions.Item label="订单金额">{detail.orderPrice}</Descriptions.Item>
          <Descriptions.Item label="消费类型">{detail.equityName}</Descriptions.Item>
          <Descriptions.Item label="使用权益">{detail.consumePrice === 0 ? '抵用券' : '抵扣金'}</Descriptions.Item>
          <Descriptions.Item label="权益消费">{detail.discountPrice}</Descriptions.Item>
          <Descriptions.Item label="所属机构">{detail.distributorName}</Descriptions.Item>
          <Descriptions.Item label="使用时间">{detail.createTime}</Descriptions.Item>
          <Descriptions.Item label="状态">{detail.statusText}</Descriptions.Item>
        </Descriptions>
        <Divider />
        {Array.isArray(detail?.voucherFileDtos) && detail.voucherFileDtos.length > 0 && (
          <>
            <p>维修凭证</p>
            <Space direction="vertical" size="large">
              <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(5, 150px)' }}>
                {detail.voucherFileDtos
                  ?.filter((item: any) => item?.fileName !== '附加图片')
                  .map((item: any, index: number) => (
                    <div
                      key={index}
                      style={{ display: 'grid', gridTemplateRows: '150px 22px', justifyItems: 'center' }}
                    >
                      <IPreviewImgComponent src={item?.filePath} alt={item?.fileName} />
                      <div>{item?.fileName}</div>
                    </div>
                  ))}
              </div>
              <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(5,150px)' }}>
                {detail.voucherFileDtos
                  ?.filter((item: any) => item?.fileName === '附加图片')
                  .map((item: any, index: number) => (
                    <div
                      key={index}
                      style={{ display: 'grid', gridTemplateRows: '150px 22px', justifyItems: 'center' }}
                    >
                      <IPreviewImgComponent src={item?.filePath} alt={item?.fileName} />
                      <div>{item?.fileName}</div>
                    </div>
                  ))}
              </div>
            </Space>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Modal
        title={renderTitle()}
        visible={visible}
        width={1000}
        onCancel={handleCancel}
        /** 详情页不需要按钮 */
        footer={
          ACTION_TYPE.Audit === titleType ? (
            <div>
              <Popconfirm title="确认是否审核通过?" onConfirm={() => handleAudit('pass')}>
                <Button loading={auditLoading} danger>
                  通过
                </Button>
              </Popconfirm>

              <Button loading={auditLoading} danger onClick={() => handleRefuse('auditVisible')}>
                拒绝
              </Button>
            </div>
          ) : null
        }
      >
        {renderForm()}
      </Modal>
    </div>
  );
}
