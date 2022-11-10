import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IRightsConsumerListState
 */

export class IRightsConsumerListState {
  searchForm = {
    index: 1,
    size: 10
  };
  visible = false;
  total: number;
  tableData: any = [];
  isLoading = false;
  searchLoading = false;
  exportLoading = false;
  confirmModalLoading = false;
  visibleDetail = false;
  modalTitle = '';
  modalWidth = 700;
  modalContainer: JSX.Element = null;
  detail: any = {};
  id: string;
  formData: any;
  orgOptionList: any[];
}

/**
 * @exports 表单组件配置
 */
export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'owner',
        type: 'Input',
        formItemProps: {
          label: '车主信息'
        },
        props: {
          placeholder: '请输入电话姓名',
          allowClear: true
        }
      },
      {
        key: 'vehicle',
        type: 'Input',
        formItemProps: {
          label: '车辆信息'
        },
        props: {
          placeholder: '请输入车牌号/车架号',
          allowClear: true
        }
      },
      {
        key: 'dateRange',
        type: 'RangePicker',
        formItemProps: {
          label: '使用时间'
        },
        props: {
          allowClear: true
        }
      },
      {
        key: 'status',
        type: 'Select',
        formItemProps: {
          label: '启用状态'
          // initialValue: -1
        },
        props: {
          placeholder: '请选择启用状态',
          allowClear: true,
          options: [
            /* {
              value: -1,
              label: '全部'
            }, */
            {
              value: 0,
              label: '待核销'
            },
            {
              value: 1,
              label: '已核销'
            }
          ]
        }
      },
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '创建机构'
        },
        props: {
          placeholder: '请选择创建机构',
          allowClear: true,
          filterOption: false,
          options: [],
          showSearch: true
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];

export class IFormProps {
  orgOptionList: { label: string; value: string }[];
}
