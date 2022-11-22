import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';
import { RechargePagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { ColumnTools } from '~/framework/util/widget';
import { ACTION_TYPE } from './recharge-funds.interface';
import { ASSETS_AUDIT_STATE } from '~/solution/shared/constant/currency.const';

export function demoColumns(action: Function): any {
  const render = (text: any) => text ?? '-';

  const columnTemplate = [
    {
      title: '账户名',
      dataIndex: 'bagName',
      render,
      show: true
    },
    {
      title: '账户号',
      render,
      show: true,
      dataIndex: 'bagNumber'
    },
    {
      title: '支付类型',
      render,
      show: true,
      dataIndex: 'payTypeText'
    },
    {
      title: '当前账户累计充值总额(虚拟币)',
      render,
      show: true,
      dataIndex: 'bagTotalInCome'
    },
    {
      title: '当前账户资金余额(虚拟币)',
      render,
      show: true,
      dataIndex: 'bagBalance'
    },
    {
      title: '充值卡券',
      render,
      show: true,
      dataIndex: 'businessName'
    },
    {
      title: '卡券充值金额(虚拟币)',
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
      // 当审核状态为 待审核时，显示充值的备注。其他情况为审核备注
      render: (text: string, row: RechargePagedListResType) => {
        return row.auditState === ASSETS_AUDIT_STATE.wait ? text : row.auditRemark;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      show: true,
      render: (text: any, row: RechargePagedListResType) => {
        return ColumnTools.renderTableColumnAction([
          {
            text: '详情',
            click: () => action(ACTION_TYPE.DETAIL, row)
          },
          {
            text: '修改充值',
            click: () => action(ACTION_TYPE.UPDATE, row),
            show: row?.auditState === ASSETS_AUDIT_STATE.refuse
          },
          {
            text: '充值审核',
            click: () => action(ACTION_TYPE.EXAMINE, row),
            show: row?.auditState === ASSETS_AUDIT_STATE.wait
          }
        ]);
      }
    }
  ];

  // 根据show的状态来决定是否显示这一项
  return columnTemplate
    .filter(f => f.show)
    .map(m => {
      const { show, ...payload } = m;
      return { ...payload };
    });
}
