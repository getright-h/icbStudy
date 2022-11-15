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
      title: '支出金额',
      dataIndex: 'createTime',
      // todo 后端给的一个状态值，在金额这一栏前面加个 + -
      render: (value, row) => {
        return row.isNumber ? `${row.equityName}1次` : `${value}元抵扣`;
      }
    },
    {
      title: '支出类型',
      dataIndex: 'equityName'
    },
    {
      title: '操作值时间',
      dataIndex: 'discountPrice'
    },
    {
      title: '操作人',
      dataIndex: 'modifyName'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];
}
