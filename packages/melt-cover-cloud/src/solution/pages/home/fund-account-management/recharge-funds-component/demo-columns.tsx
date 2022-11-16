import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';
import { RechargePagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';

export function demoColumns(action: Function): any {
  const render = (text: any) => text ?? '-';

  const columnTemplate = [
    {
      title: '账户名',
      dataIndex: 'bagNumber',
      render,
      show: true
    },
    {
      title: '账户号',
      render,
      show: true,
      dataIndex: 'bagName'
    },
    {
      title: '支付类型',
      render,
      show: true,
      dataIndex: 'bagTypeText'
    },
    {
      title: '当前账户累计充值总额',
      render,
      show: true,
      dataIndex: 'totalInCome'
    },
    {
      title: '当前账户资金余额',
      render,
      show: true,
      dataIndex: 'balance'
    },
    {
      title: '充值金额',
      render,
      show: true,
      dataIndex: 'number'
    },
    {
      title: '审核状态',
      render,
      show: true,
      dataIndex: 'auditStateText'
    },
    {
      title: '创建时间',
      render,
      show: true,
      dataIndex: 'createTime'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      show: true,
      // 当审核状态为 -1 待审核时，显示充值的备注。其他情况为审核备注
      render: (text: string, row: RechargePagedListResType) => {
        return row.auditState == -1 ? text : row.auditRemark;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      show: true,
      render: (text: any, row: { auditState: number }) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>详情</a>
            <Divider type="vertical" />
            {/* 状态为 通过 不通过 */}
            {row?.auditState == 0 ? (
              // 未通过
              <a onClick={() => action(row, '修改充值')}>修改充值</a>
            ) : // 已通过
            row?.auditState == 1 ? (
              <></>
            ) : (
              // 未审核
              <a onClick={() => action(row, '充值审核')}>充值审核</a>
            )}
          </React.Fragment>
        );
      }
    }
  ];

  // 根据show的状态来决定是否显示这一项
  return columnTemplate
    .filter(f => f.show)
    .map(m => {
      const { show, ...payload } = m;
      console.log('{ ...payload }', m);

      return { ...payload };
    });
}
