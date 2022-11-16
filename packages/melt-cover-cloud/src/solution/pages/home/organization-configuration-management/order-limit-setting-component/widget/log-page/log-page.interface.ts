import { LimitPagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { ColumnsType } from 'antd/lib/table';
import { ColumnTools } from '~/framework/util/widget';

export interface ILogPageProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  initData?: LimitPagedListResType;
}
const { render } = ColumnTools;
export const Columns: ColumnsType<any> = [
  {
    title: '操作人员',
    dataIndex: 'createUserName',
    render
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    render
  },
  {
    title: '内容',
    dataIndex: 'oldContext',
    render: (text: string, row: LimitPagedListResType) =>
      `录单限额:${row?.orderLimit ?? 0}元 - 录单剩余额度告警值:${row?.orderResidueWarnMoney ?? 0}元`
  }
];
