import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '账户名',
      dataIndex: 'bagNumber'
    },
    {
      title: '账户号',
      dataIndex: 'bagName'
    },
    {
      title: '支付类型',
      dataIndex: 'bagTypeText'
    },
    {
      title: '当前账户累计充值总额',
      dataIndex: 'totalInCome'
    },
    {
      title: '当前账户资金余额',
      dataIndex: 'balance'
    },
    {
      title: '充值金额',
      dataIndex: 'number'
    },
    {
      title: '审核状态',
      dataIndex: 'auditStateText'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '备注',
      dataIndex: 'remark'
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
            {/* 状态为 通过 不通过 */}{' '}
            {row?.auditState == 1 ? (
              <a onClick={() => action(row, '修改充值')}>修改充值</a>
            ) : (
              <a onClick={() => action(row, '充值审核')}>充值审核</a>
            )}
          </React.Fragment>
        );
      }
    }
  ];
}
