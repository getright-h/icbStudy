import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { ColumnTools } from '~/framework/util/widget';
import { ACTION_TYPE, WarnOptions } from './order-limit-setting.interface';

export function Columns(action: Function): ColumnsType<any> {
  return [
    {
      title: '机构名称',
      dataIndex: 'distributorName'
    },
    {
      title: '社会信用代码',
      dataIndex: 'unitCode'
    },
    {
      title: '联系电话',
      dataIndex: 'unitMobile'
    },
    {
      title: '联系人',
      dataIndex: 'contactName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '录单限额',
      dataIndex: 'orderLimit',
      render: (text: number) => `${text}元`
    },
    {
      title: '剩余额度',
      dataIndex: 'orderResidueMoney',
      render: (text: number) => `${text}元`
    },
    {
      title: '预警状态',
      dataIndex: 'orderResidueWarnState',
      render: (state: number) => ColumnTools.renderTag(WarnOptions, state)
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) =>
        ColumnTools.renderTableColumnAction([
          { text: '设置额度', click: () => action(ACTION_TYPE.SETTING, row) },
          { text: '日志', click: () => action(ACTION_TYPE.LOG, row) }
        ])
    }
  ];
}
