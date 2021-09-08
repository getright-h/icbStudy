import { Modal, Descriptions } from 'antd';
import * as React from 'react';
interface IAddEquityProps {
  title: string;
  handleCancel: () => void;
  visible: boolean;
  detail: any;
}

export default function DetailComponent(props: IAddEquityProps) {
  const { title, handleCancel, visible, detail } = props;

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
      </div>
    );
  }
  return (
    <div>
      <Modal title={title} onCancel={handleCancel} visible={visible} width={1000} footer={null}>
        {renderForm()}
      </Modal>
    </div>
  );
}
