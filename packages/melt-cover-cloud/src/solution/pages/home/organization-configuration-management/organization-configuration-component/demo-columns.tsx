import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { EquityList } from '~/solution/model/dto/equity-package-manage.dto';
import style from './organization-configuration.module.less';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '机构名称',
      dataIndex: 'distributorName'
    },
    {
      title: '资金账户',
      dataIndex: 'name'
    },
    {
      title: '更新时间',
      dataIndex: 'desc'
    },
    {
      title: '配置是否开启额度限制',
      dataIndex: 'price'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '配置')}>配置</a>
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
