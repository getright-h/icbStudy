import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { ActionType } from './reserve-settings.interface';

export function ReserveSettingsColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '经销商',
      dataIndex: 'distributorName'
    },
    {
      title: '每小时可约工位数',
      dataIndex: 'count'
    },
    {
      title: '预约类型',
      dataIndex: 'bitwiseContent'
    },
    {
      title: '是否自动确认',
      dataIndex: 'autoConfig',
      render: (value: boolean) => <span>{value ? '是' : '否'}</span>
    },
    {
      title: '添加时间',
      dataIndex: 'createTime'
    },
    {
      title: '是否启用',
      dataIndex: 'state',
      render: (value: boolean) => <span>{value ? '是' : '否'}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ActionType.EDIT)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, ActionType.DELETE)}>删除</a>
          </React.Fragment>
        );
      }
    }
  ];
}
