import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';
import { ColumnTools } from '~/framework/util/widget';
import { ACTION_TYPE } from './fund-account-setting.interface';
import { BAG_STATE_ENUM } from '~/solution/shared/constant/currency.const';

const { render } = ColumnTools;
export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '账户名',
      dataIndex: 'name',
      render
    },
    {
      title: '账户号',
      dataIndex: 'number',
      render
    },
    {
      title: '支付类型',
      dataIndex: 'typeText',
      render
    },
    {
      title: '账户状态',
      dataIndex: 'stateText',
      render
    },
    {
      title: '账户累计充值总额(虚拟货币)',
      dataIndex: 'totalInCome',
      render
    },
    {
      title: '账户资金余额(虚拟货币)',
      dataIndex: 'balance',
      render
    },
    // {
    //   title: '锁定资金',
    //   dataIndex: 'ownerVinNo',
    //   render
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, row) => {
        return ColumnTools.renderTableColumnAction([
          {
            text: '编辑',
            click: () => action(ACTION_TYPE.DETAIL, row)
          },
          {
            text: '交易明细',
            click: () => action(ACTION_TYPE.INFO, row)
          },
          {
            text: '冻结',
            click: () => action(ACTION_TYPE.frozen, row),
            show: row.state === BAG_STATE_ENUM.normal
          },
          {
            text: '解冻',
            click: () => action(ACTION_TYPE.thaw, row),
            show: row.state === BAG_STATE_ENUM.frozen
          },
          {
            text: '卡券管理',
            click: () => action(ACTION_TYPE.card, row)
          }
        ]);
      }
    }
  ];
}
