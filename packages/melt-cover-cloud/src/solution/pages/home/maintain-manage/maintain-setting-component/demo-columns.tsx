import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider, Popconfirm } from 'antd';

export function demoColumns(action: Function, delFunc: { delConfirm: any; delCancel: any }): ColumnsType<any> {
  return [
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '车辆品牌',
      dataIndex: 'brandName'
    },
    {
      title: '车辆系列',
      dataIndex: 'versionName'
    },
    {
      title: '车辆配置',
      dataIndex: 'configName'
    },
    {
      title: '保养时间周期(月)',
      dataIndex: 'timeInterval'
    },
    {
      title: '保养里程周期(Km)',
      dataIndex: 'mileageInterval'
    },
    {
      title: '首保里程(Km)',
      dataIndex: 'firstMaintainMileage'
    },
    {
      title: '首保时间(月)',
      dataIndex: 'firstMaintainTime'
    },
    {
      title: '质保(月)',
      dataIndex: 'assurancePeriod'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      render: (text, row) => {
        return (
          <React.Fragment>
            <Popconfirm
              title="确定删除该规则吗?"
              onConfirm={delFunc?.delConfirm}
              onCancel={delFunc?.delCancel}
              okText="确定"
              cancelText="取消"
            >
              <a onClick={() => action(row, '删除')}>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={() => action(row, '编辑')}>编辑</a>
            {/* {??? === row.distributorId && <a onClick={() => action(row, '编辑')}>编辑</a>} */}
          </React.Fragment>
        );
      }
    }
  ];
}
