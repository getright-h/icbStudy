import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { ActionType } from './customer-management.interface';

export function CustomerManageColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '来源',
      dataIndex: 'orderSourceStr'
    },
    {
      title: '客户名',
      dataIndex: 'ownerName'
    },
    {
      title: '客户电话',
      dataIndex: 'ownerMobile'
    },
    {
      title: '车牌号',
      dataIndex: 'ownerPlateNo'
    },
    {
      title: '车架号',
      dataIndex: 'ownerVinNo'
    },
    {
      title: '品牌型号',
      dataIndex: 'versionName'
    },
    {
      title: '创建日期',
      dataIndex: 'createTime'
    },
    {
      title: '销售员',
      dataIndex: 'salesmenName'
    },
    {
      title: '所属机构',
      dataIndex: 'distributorName'
    },
    {
      title: '购买套餐包',
      dataIndex: 'equityGroupName'
    },
    {
      title: '已回店次数',
      dataIndex: 'backToTheShopCount'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ActionType.DETAIL)}>详情</a>
            {/* <Divider type="vertical" />
            <a onClick={() => action(row, '编辑')}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '删除')}>删除</a> */}
          </React.Fragment>
        );
      }
    }
  ];
}
