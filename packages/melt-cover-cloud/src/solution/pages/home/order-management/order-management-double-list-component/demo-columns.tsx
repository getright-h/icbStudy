import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import style from './order-management-list.module.less';

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
      dataIndex: 'ownerTelephone'
    },
    {
      title: '所属机构',
      dataIndex: 'agreedServiceProvider'
    },
    {
      title: '车牌号',
      dataIndex: 'licensePlateNumber'
    },
    {
      title: '车架号',
      dataIndex: 'frameNumber'
    },
    {
      title: '购买套餐包',
      dataIndex: 'businessType'
    },
    {
      title: '套餐金额',
      dataIndex: 'purchaseServiceFee'
    },
    {
      title: '订单时间',
      dataIndex: 'createTime'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '状态',
      render: record => {
        return <span>已完成</span>;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a onClick={() => action(row, '详情')}>详情</a>
              <Divider type="vertical" />
              <Menu triggerSubMenuAction="click" expandIcon={null} mode={'horizontal'} className={style.hoverNone}>
                <SubMenu title="下载">
                  <Menu.Item onClick={() => action(row, '带章服务函')}>带章服务函</Menu.Item>
                  <Menu.Item onClick={() => action(row, '不带章服务函')}>不带章服务函</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </React.Fragment>
        );
      }
    }
  ];
}
