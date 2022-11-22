import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';

export function inComeColumns(): ColumnsType<any> {
  return [
    {
      title: '充值金额(虚拟币)',
      dataIndex: 'number'
    },
    {
      title: '卡券',
      dataIndex: 'businessName'
    },
    {
      title: '支付类型',
      dataIndex: 'subjectName'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作人',
      dataIndex: 'createUserName'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];
}

export function spendingColumns(): ColumnsType<any> {
  return [
    {
      title: '支出金额(虚拟币)',
      dataIndex: 'number',
      render: (value, row) => {
        console.log('row', row.mark);

        return row?.mark ? `${row?.mark}` + `${value}` : ` ${value}`;
      }
    },
    {
      title: '支出类型',
      dataIndex: 'subjectName'
    },
    {
      title: '卡券',
      dataIndex: 'businessName'
    },
    {
      title: '操作值时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作人',
      dataIndex: 'createUserName'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];
}
