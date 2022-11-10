import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '账户名',
      dataIndex: 'orderNumber'
    },
    {
      title: '账户号',
      dataIndex: 'ownerName'
    },
    {
      title: '支付类型',
      dataIndex: 'ownerMobile'
    },
    {
      title: '账户状态',
      dataIndex: 'distributorName'
    },
    {
      title: '账户累计充值总额',
      dataIndex: 'ownerPlateNo'
    },
    {
      title: '账户资金余额',
      dataIndex: 'ownerVinNo'
    },
    {
      title: '创建时间',
      dataIndex: 'equityGroupName'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '编辑')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '交易明细')}>交易明细</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '冻结')}>冻结</a>
          </React.Fragment>
        );
      }
    }
  ];
}
