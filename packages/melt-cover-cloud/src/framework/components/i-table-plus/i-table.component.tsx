import { Table } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { useStateStore } from '@fch/fch-tool';
import { DEFAULT_DATA, ITableProps, ITableState } from './i-table.interface';

const ITableComponent: React.FC<ITableProps> = props => {
  const { state, setStateWrap } = useStateStore(new ITableState());
  const { d_data, d_isLoading, d_isPagination, d_rowKey, d_total, d_pageSize, d_pageIndex } = DEFAULT_DATA;
  const {
    data,
    total,
    table,
    pageSize,
    isLoading,
    pageIndex,
    rowKey = d_rowKey,
    isPagination = d_isPagination,
    changeTablePageIndex,
    ...restProps
  } = props;

  const t_total = total ?? table?.tableState?.total ?? d_total;
  const t_data = data ?? table?.tableState?.tableData ?? d_data;
  const t_pageSize = pageSize ?? table?.tableState?.pageSize ?? d_pageSize;
  const t_loading = isLoading ?? table?.tableState?.isLoading ?? d_isLoading;
  const t_current = pageIndex ?? table?.tableState?.pageIndex ?? d_pageIndex;
  const t_onChange = changeTablePageIndex ?? table?.tableActions?.changeTablePageIndex;

  useEffect(() => {
    const pagination = {
      total: t_total,
      current: t_current,
      pageSize: t_pageSize,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: t_onChange,
      showTotal: (total: number) => <div>共 {total} 条</div>
    };
    setStateWrap({ pagination });
  }, [JSON.stringify(props)]);

  return (
    <Table
      pagination={isPagination && state.pagination}
      scroll={props.scroll || { x: 'max-content' }}
      loading={t_loading}
      dataSource={t_data}
      rowKey={rowKey}
      {...restProps}
    />
  );
};

export default ITableComponent;
