import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { DISCOUNT_METHOD, PAY_METHOD } from '~/solution/shared/enums/home.enum';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    // {
    //   title: '序号',
    //   dataIndex: 'id',
    //   render: record => {
    //     return <span>{record}</span>;
    //   }
    // },
    {
      title: '订单编号',
      dataIndex: 'orderNumber'
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '车主电话',
      dataIndex: 'ownerMobile'
    },
    {
      title: '所属机构',
      dataIndex: 'distributorName'
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
      title: '购买套餐包',
      dataIndex: 'equityGroupName'
    },
    {
      title: '套餐金额',
      dataIndex: 'equityGroupPrice'
    },
    {
      title: '订单时间',
      dataIndex: 'createTime'
    },
    {
      title: '状态',
      dataIndex: 'xiaoXiuStatusStr'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '支付方式',
      dataIndex: 'payMethod',
      render: (v: number) => PAY_METHOD[v] || '-'
    },
    /* {
      title: '优惠方式',
      dataIndex: 'discountMethod',
      render: (v: number) => DISCOUNT_METHOD[v] || '-'
    }, */
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>详情</a>
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
