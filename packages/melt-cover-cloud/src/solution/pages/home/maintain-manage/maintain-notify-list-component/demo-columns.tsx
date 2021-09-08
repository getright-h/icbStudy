import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { BackgroundResType } from '~/solution/model/dto/maintain-notify.dto';
import moment from 'moment';
import style from './maintain-notify-list.component.less';
export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '车架号',
      dataIndex: 'vehicleIdentificationNumber'
    },
    {
      title: '车牌号',
      dataIndex: 'vehiclePlateNumber'
    },
    {
      title: '品牌',
      dataIndex: 'vehicleMake'
    },
    {
      title: '车主/电话',
      render: (record: BackgroundResType) => {
        return `${record.ownerName}  ${record.ownerMobile && '/ ' + record.ownerMobile}}`;
      }
    },
    {
      title: '当前位置',
      dataIndex: 'location'
    },
    {
      title: '当前里程',
      dataIndex: 'mileage'
    },
    {
      title: '上次保养（里程/日期）',
      render: (record: BackgroundResType) => {
        return `${record.lastMaintainMileage}  ${record.lastMaintainTime && '/ ' + record.lastMaintainTime}`;
      }
    },
    {
      title: '下次保养（里程/日期）',
      render: (record: BackgroundResType) => {
        return `${record.nextMaintainMileage}  ${record.nextMaintainTime && '/ ' + record.nextMaintainTime}`;
      }
    },
    {
      title: '跟进次数',
      render: row => {
        return (
          <span onClick={() => action(row, '跟进次数')} className={style.span}>
            {row.followCount}
          </span>
        );
      }
    },
    {
      title: '保养次数',
      render: row => {
        return (
          <span onClick={() => action(row, '保养次数')} className={style.span}>
            {row.maintainCount}
          </span>
        );
      }
    },
    {
      title: '提醒次数',
      render: row => {
        return (
          <span onClick={() => action(row, '提醒次数')} className={style.span}>
            {row.remindCount}
          </span>
        );
      }
    },
    {
      title: '所属机构',
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
            <a onClick={() => action(row, '校准')}>校准</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '提醒')}>提醒</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '保养登记')}>保养登记</a>
            <Divider type="vertical" />
            <a onClick={() => action(row, '跟进')}>跟进</a>
          </React.Fragment>
        );
      }
    }
  ];
}

export function notifyModalListColumns(action?: Function): ColumnsType<any> {
  return [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      }
    },
    {
      title: '提醒方式',
      dataIndex: 'remindTypeDesc'
    },
    {
      title: '提醒时间',
      dataIndex: 'createTime',
      render: record => {
        return moment(record).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '操作人',
      dataIndex: 'creatorName'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];
}

export function followModalListColumns(action?: Function): ColumnsType<any> {
  return [
    {
      title: '序号',
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      }
    },
    {
      title: '跟进方式',
      dataIndex: 'typeDesc'
    },
    {
      title: '跟进时间',
      dataIndex: 'createTime',
      render: record => {
        return moment(record).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '跟进人',
      dataIndex: 'creatorName'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];
}
