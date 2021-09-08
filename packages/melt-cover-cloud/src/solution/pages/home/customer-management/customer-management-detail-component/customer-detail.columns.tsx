import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';

export function RemainEquityColumns(): ColumnsType<any> {
  return [
    {
      title: '权益名',
      dataIndex: 'equityName'
    },
    {
      title: '剩余次数',
      dataIndex: 'balanceNumber'
    },
    {
      title: '有效期',
      dataIndex: 'expirationTime'
    },
    {
      title: '已使用',
      dataIndex: 'usedNumber'
    }
  ];
}
export function FollowRecordColumns(): ColumnsType<any> {
  return [
    {
      title: '时间',
      dataIndex: 'keyword1'
    },
    {
      title: '项目',
      dataIndex: 'keyword2'
    },
    {
      title: '方式',
      dataIndex: 'keyword3'
    },
    {
      title: '备注',
      dataIndex: 'keyword4'
    },
    {
      title: '处理人',
      dataIndex: 'keyword5'
    }
  ];
}

export function ConsumeRecordColumns(): ColumnsType<any> {
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
