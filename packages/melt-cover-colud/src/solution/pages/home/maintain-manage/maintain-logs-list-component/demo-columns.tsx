import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';

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
      title: '车主',
      render: (record, row) => {
        return row.vehicle.ownerName;
      }
    },
    {
      title: '车牌号',
      render: (record, row) => {
        return row.vehicle.vehiclePlateNumber;
      }
    },
    {
      title: '车架号',
      render: (record, row) => {
        return row.vehicle.vehicleIdentificationNumber;
      }
    },
    {
      title: '回店时间',
      dataIndex: 'currentMaintenanceTime'
    },
    {
      title: '项目',
      dataIndex: 'contentRange'
    },
    {
      title: '费用',
      dataIndex: 'fee'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '处理人',
      dataIndex: 'creatorName'
    },
    {
      title: '所属经销商',
      render: (record, row) => {
        return row.vehicle.distributorName;
      }
    }
  ];
}
