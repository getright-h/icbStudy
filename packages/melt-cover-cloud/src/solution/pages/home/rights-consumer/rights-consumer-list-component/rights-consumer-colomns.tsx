import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '订单编号',
      dataIndex: 'number',
      render: (render: any, data: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '手机号',
      dataIndex: 'ownerMobile'
    },
    {
      title: '车牌号',
      dataIndex: 'ownerPlateNo'
    },
    {
      title: '车架号',
      dataIndex: 'ownerVinNo'
    },
    {
      title: '应付金额',
      dataIndex: 'consumePrice'
    },
    {
      title: '消费类型',
      dataIndex: 'equityName'
    },
    {
      title: '使用权益',
      dataIndex: 'consumePrice',
      render: (text, row) => {
        return text === 0 ? '抵用券' : '抵扣金';
      }
    },
    {
      title: '权益消费',
      dataIndex: 'discountPriceDisplay'
    },
    {
      title: '使用时间',
      dataIndex: 'createTime'
    },
    {
      title: '所属机构',
      dataIndex: 'distributorName'
    },
    {
      title: '状态',
      dataIndex: 'statusText'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>详情</a>
            <Divider type="vertical" />
            {row.status === 0 ? <a onClick={() => action(row, '待核销')}>待核销</a> : ''}
          </React.Fragment>
        );
      }
    }
  ];
}
