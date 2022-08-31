import * as React from 'react';
import { Divider } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { PERMISSIONS } from '~/solution/shared/enums/permissions.enum';
import { PermissionButton } from '~/framework/components/component.module';
import { ACTION_TYPE, ORDER_STATE } from './rights-list-of-double.interface';

export function demoColumns(action: Function): ColumnsType<any> {
  return [
    {
      title: '订单编号',
      dataIndex: 'number',
      render: (render: any, data: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '车主姓名',
      dataIndex: 'ownerName'
    },
    {
      title: '手机号',
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
      title: '应付金额',
      dataIndex: 'consumePrice'
    },
    {
      title: '消费类型',
      dataIndex: 'equityName'
    },
    {
      title: '使用权益',
      dataIndex: 'consumePrice',
      render: (text, row) => {
        return text === 0 ? '抵用券' : '抵扣金';
      }
    },
    {
      title: '权益消费',
      dataIndex: 'discountPriceDisplay'
    },
    {
      title: '使用时间',
      dataIndex: 'createTime'
    },
    {
      title: '所属机构',
      dataIndex: 'distributorName'
    },
    {
      title: '状态',
      dataIndex: 'statusText'
    },
    {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      width: 200,
      render: (text, row) => {
        return (
          <React.Fragment>
            <a onClick={() => action(row, ACTION_TYPE.Detail)}>详情</a>
            {row.status === ORDER_STATE.Wait && (
              <PermissionButton id={PERMISSIONS.writeOffOfDouble}>
                <Divider type="vertical" />
                <a onClick={() => action(row, ACTION_TYPE.Verify)}>待核销</a>
              </PermissionButton>
            )}
            {row.status === ORDER_STATE.Success && (
              <PermissionButton id={PERMISSIONS.uploadOfDouble}>
                <Divider type="vertical" />
                <a onClick={() => action(row, ACTION_TYPE.Upload)}>上传凭证</a>
              </PermissionButton>
            )}
            {row.status === ORDER_STATE.CheckReject && (
              <PermissionButton id={PERMISSIONS.editOfDouble}>
                <Divider type="vertical" />
                <a onClick={() => action(row, ACTION_TYPE.Edit)}>修改</a>
              </PermissionButton>
            )}
            {row.status === ORDER_STATE.WaitCheck && (
              <PermissionButton id={PERMISSIONS.auditOfDouble}>
                <Divider type="vertical" />
                <a onClick={() => action(row, ACTION_TYPE.Audit)}>审核</a>
              </PermissionButton>
            )}
          </React.Fragment>
        );
      }
    }
  ];
}
