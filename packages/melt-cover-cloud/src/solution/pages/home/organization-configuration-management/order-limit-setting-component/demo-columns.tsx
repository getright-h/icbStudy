import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { EquityList } from '~/solution/model/dto/equity-package-manage.dto';
import style from './order-limit-setting.module.less';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '机构名称',
      dataIndex: 'distributorName'
    },
    {
      title: '社会信用代码',
      dataIndex: 'name'
    },
    {
      title: '联系电话',
      dataIndex: 'desc'
    },
    {
      title: '联系人',
      dataIndex: 'price'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '录单限额',
      dataIndex: 'statusText'
    },
    {
      title: '剩余额度',
      dataIndex: 'statusText'
    },
    {
      title: '预警状态',
      dataIndex: 'statusText'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '设置额度')}>设置额度</a>
            <Divider type="vertical" />
            {/* todo 等后端数据再写这个 */}
            <a onClick={() => action(row, '日志')}>日志</a>
          </React.Fragment>
        );
      }
    }
  ];
}

export function channelColumns(action: Function, isBelonging: boolean): ColumnsType<any> {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'left'
    }
  ];
}
