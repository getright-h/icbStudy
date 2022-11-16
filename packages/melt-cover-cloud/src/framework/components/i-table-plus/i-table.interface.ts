import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { IUseTableRes } from '../../hooks/useTable';

export const DEFAULT_DATA = {
  d_total: 0,
  d_data: [] as any,
  d_rowKey: 'id',
  d_pageIndex: 1,
  d_pageSize: 10,
  d_isLoading: false,
  d_isPagination: true
};

export class ITableState {
  pagination: false | TablePaginationConfig | undefined;
}

export type ITableExtendProps = {
  /** 接收 `useTable` 返回的对象。
   *
   * **ITable** 组件就会内将帮你自动绑定 data、isLoading、total、pageIndex、pageSize、changeTablePageIndex
   *
   * 也就是说，使用**ITable**时，只需要传入 `table` 和 `columns` 即可
   *
   * @tip *通过传入对应props，可以覆盖组件内的默认绑定* */
  table?: IUseTableRes<any>;
  /** 表格数据 */
  data?: any;
  /** 表格loading */
  isLoading?: boolean;
  /** 是否开启 表格分页器 `<默认开启>`*/
  isPagination?: boolean;
  /** 表格分页器- 总页数 */
  total?: number;
  /** 表格分页器- 当前页码 */
  pageIndex?: number;
  /** 表格分页器- 一页展示条目数*/
  pageSize?: number;
  /** 分页器的change事件 */
  changeTablePageIndex?: (pageIndex: number, pageSize?: number) => void;
};

export type ITableProps = ITableExtendProps & TableProps<any>;
