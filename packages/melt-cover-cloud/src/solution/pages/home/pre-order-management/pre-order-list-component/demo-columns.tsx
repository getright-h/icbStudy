import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '序号',
      dataIndex: 'number',
      render: (render: any, data: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '订单编号',
      dataIndex: 'orderNumber'
    },
    {
      title: '车主电话',
      dataIndex: 'ownerMobile'
    },
    {
      title: '车主类型',
      dataIndex: 'ownerType',
      render: (render: any, data: any, index: number) => {
        return render == 1 ? '个人' : '企业';
      }
    },
    {
      title: '所属机构',
      dataIndex: 'distributorName'
    },
    {
      title: '是否散户',
      dataIndex: 'isScatteredUser',
      render: (render: any, data: any, index: number) => {
        return render ? '是' : '否';
      }
    },
    {
      title: '购买套餐包',
      dataIndex: 'equityGroupName'
    },
    {
      title: '创单时间',
      dataIndex: 'createTime'
    },
    {
      title: '状态',
      dataIndex: 'statusDesc'
    },
    {
      title: '所属经销商',
      dataIndex: 'distributorName'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            {row.status != -99 && <a onClick={() => action(row, '详情')}>详情</a>}
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
