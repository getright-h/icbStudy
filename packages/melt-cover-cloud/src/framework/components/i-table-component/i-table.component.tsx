import * as React from 'react';
import { IITableProps } from './i-table.interface';
import { useITableStore } from './i-table.component.store';
import { Table } from 'antd';

export default function ITableComponent(props: IITableProps) {
  const { isLoading = false, data = [], columns, isPagination = true, rowKey = 'id', onRow, rowSelection } = props;
  const { state } = useITableStore(props);

  return (
    <div>
      <Table
        loading={isLoading}
        dataSource={data}
        rowSelection={rowSelection}
        columns={columns}
        pagination={isPagination && state.pagination}
        rowKey={row => row[rowKey]}
        onRow={onRow}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
