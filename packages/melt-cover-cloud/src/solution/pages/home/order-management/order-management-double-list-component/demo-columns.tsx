import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import style from './order-management-list.module.less';

export function demoColumns(action: Function, prop: Record<string, any>): ColumnsType<any> {
  const { charterList } = prop;
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
        /** 服务章程按钮 */
        let charter = '';
        /** 判断当前方案是否包含服务章程 */
        charterList?.some((item: { serviceCharterUrl: string; productId: string }) => {
          if (item?.productId === row?.businessTypeId) {
            charter = item.serviceCharterUrl;
          }
          return charter;
        });

        return (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a onClick={() => action(row, '详情')}>详情</a>
              <Divider type="vertical" />
              <Menu triggerSubMenuAction="click" expandIcon={null} mode={'horizontal'} className={style.hoverNone}>
                <SubMenu title="下载">
                  <Menu.Item onClick={() => action(row, '带章服务函')}>带章服务函</Menu.Item>
                  {/* <Menu.Item onClick={() => action(row, '不带章服务函')}>不带章服务函</Menu.Item> */}
                  {charter && (
                    <Menu.Item onClick={() => action(Object.assign({}, row, { charter }), '服务章程')}>
                      服务章程
                    </Menu.Item>
                  )}
                </SubMenu>
              </Menu>
            </div>
          </React.Fragment>
        );
      }
    }
  ];
}
