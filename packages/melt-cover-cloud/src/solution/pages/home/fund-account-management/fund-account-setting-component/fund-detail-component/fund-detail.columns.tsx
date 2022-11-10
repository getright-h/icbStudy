import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';

export function inComeColumns(): ColumnsType<any> {
  return [
    {
      title: '充值金额',
      dataIndex: 'keyword1'
    },
    {
      title: '支付类型',
      dataIndex: 'keyword2'
    },
    {
      title: '操作时间',
      dataIndex: 'keyword3'
    },
    {
      title: '操作人',
      dataIndex: 'keyword4'
    },
    {
      title: '备注',
      dataIndex: 'keyword5'
    }
  ];
}

export function spendingColumns(): ColumnsType<any> {
  return [
    {
      title: '回店时间',
      dataIndex: 'createTime'
    },
    {
      title: '项目',
      dataIndex: 'equityName'
    },
    {
      title: '使用权益',
      dataIndex: 'discountPrice',
      render: (value, row) => {
        return row.isNumber ? `${row.equityName}1次` : `${value}元抵扣`;
      }
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '处理人',
      dataIndex: 'modifyName'
    }
  ];
}
