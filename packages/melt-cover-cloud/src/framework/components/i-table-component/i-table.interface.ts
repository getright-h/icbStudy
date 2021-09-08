import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/lib/table';

/**
 * @export state变量定义和初始化
 * @class IITableState
 */
export class IITableState {
  pagination: false | TablePaginationConfig;
}

export type IITableProps = {
  isLoading: boolean;
  data: any;
  total: number;
  pageSize?: number;
  columns: ColumnsType<any>;
  isPagination?: boolean;
  pageIndex: number;
  rowKey?: string;
  changeTablePageIndex: (page: number, pageSize?: number) => void;
} & TableProps<any>;
