import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Space } from 'antd';
import { ActionType } from './reserve-list.interface';

export function ReserveListColumns(action: Function): ColumnsType<any> {
  function renderBtns(row: any) {
    const detailBtn = () => (
      <a key={0} onClick={() => action(row, ActionType.DETAIL)}>
        详情
      </a>
    );
    const confirmBtn = () => (
      <a key={1} onClick={() => action(row, ActionType.CONFIRM)}>
        确认
      </a>
    );
    const reachBtn = () => (
      <a key={2} onClick={() => action(row, ActionType.REACH)}>
        到店
      </a>
    );
    const cancelBtn = () => (
      <a key={3} onClick={() => action(row, ActionType.CANCEL)}>
        取消
      </a>
    );
    const btns: JSX.Element[] = [detailBtn()];
    if (row.state == 0) {
      btns.push(confirmBtn());
    } else if (row.state == 1) {
      btns.push(reachBtn(), cancelBtn());
    }
    return btns;
  }
  return [
    {
      title: '渠道',
      dataIndex: 'appSourceText'
    },
    {
      title: '预约编号',
      dataIndex: 'number'
    },
    {
      title: '姓名',
      dataIndex: 'userName'
    },
    {
      title: '手机号',
      dataIndex: 'userMobile'
    },
    {
      title: '车牌号',
      dataIndex: 'vehiclePlate'
    },
    {
      title: '经销商',
      dataIndex: 'distributorName'
    },
    {
      title: '车型',
      dataIndex: 'versionName'
    },
    {
      title: '预约时间',
      dataIndex: 'time'
    },
    {
      title: '发起时间',
      dataIndex: 'createTime'
    },
    {
      title: '类型',
      dataIndex: 'typeText'
    },
    {
      title: '活动',
      dataIndex: 'activityDescFormat'
    },
    {
      title: '状态',
      dataIndex: 'stateText'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => <Space size="small">{renderBtns(row)}</Space>
    }
  ];
}
