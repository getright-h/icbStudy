import * as React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Divider } from 'antd';
import { EquityList } from '~/solution/model/dto/equity-package-manage.dto';
import style from './equity-package-manage.module.less';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '创建机构',
      dataIndex: 'distributorName'
    },
    {
      title: '套餐包名',
      dataIndex: 'name'
    },
    {
        title: '套餐说明',
        dataIndex: 'desc'
    },
    {
      title: '套餐包价格',
      dataIndex: 'price'
    },
    {
      title: '包含权益',
      dataIndex: 'equityList',
      render: (record: EquityList[]) => {
        return (
          <>
            {record.map((item: EquityList) => {
              return <span key={item.id}>{item.name + ' '}</span>;
            })}
          </>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '状态',
      dataIndex: 'statusText'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, '详情')}>详情</a>
            <Divider type="vertical" />
            <span style={{ display: row.isEdit ? 'block' : 'none' }}>
              <a onClick={() => action(row, '编辑')}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => action(row, '删除')}>删除</a>
            </span>
          </React.Fragment>
        );
      }
    }
  ];
}

export function equityColumns(action: Function, isBelonging: boolean): ColumnsType<any> {
  return [
    {
      title: '权益',
      dataIndex: 'name',
      align: 'left'
    },
    {
      title: '所属',
      dataIndex: 'distributorName',
      align: 'left',
      render: (row, record) => {
        return (
          <span className={style.textOverFlow + ' ' + (!record.isEdit ? style.disable : '')} title={row}>
            {row}
          </span>
        );
      }
    }
  ];
}
