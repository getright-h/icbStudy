import { ColumnsType } from 'antd/lib/table';

export function channelColumns(): ColumnsType<any> {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'left'
    }
  ];
}
