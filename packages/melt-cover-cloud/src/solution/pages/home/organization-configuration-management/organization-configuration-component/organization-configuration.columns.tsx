import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { ColumnTools } from '~/framework/util/widget';
import { ACTION_TYPE } from './organization-configuration.interface';

const { render } = ColumnTools;
export function Columns(action: Function): ColumnsType<any> {
  return [
    {
      title: '机构名称',
      dataIndex: 'distributorName',
      render
    },
    {
      title: '资金账户',
      dataIndex: 'bagName',
      render
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      render
    },
    /* {
      title: '配置是否开启额度限制',
      dataIndex: 'isLimitTxt',
      render
    }, */
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) =>
        ColumnTools.renderTableColumnAction([
          { text: '详情', click: () => action(ACTION_TYPE.DETAIL, row) },
          { text: '配置', click: () => action(ACTION_TYPE.SETTING, row) }
        ])
    }
  ];
}
