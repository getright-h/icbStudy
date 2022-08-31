import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IRightsListOfDoubleState
 */
export class IRightsListOfDoubleState {
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
  uploadVisible = false;
  currModalType: ACTION_TYPE;
  auditVisible = false;
  /** 判断是编辑还是初次上传 */
  isEdit = false;
  /** 审核按钮loading */
  auditLoading = false;
  /** 上传按钮loading */
  uploadLoading = false;
}

/** 列表操作枚举 */
export enum ACTION_TYPE {
  /** 详情 */
  Detail,
  /** 待核销 */
  Verify,
  /** 上传凭证 */
  Upload,
  /** 审核 */
  Audit,
  /** 修改 */
  Edit
}

export enum ORDER_STATE {
  All = -1,
  /** 待核销 */
  Wait = 0,
  /** 已核销/待上传凭证 */
  Success = 1,
  /** 待审核 */
  WaitCheck = 2,
  /** 审核通过 */
  CheckPass = 3,
  /** 审核拒绝 */
  CheckReject = 4
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
          label: '启用状态',
          initialValue: -1
        },
        props: {
          placeholder: '请选择启用状态',
          allowClear: true,
          options: [
            {
              value: -1,
              label: '全部'
            },
            {
              value: 0,
              label: '待核销'
            },
            {
              value: 1,
              label: '待传凭证'
            },
            {
              value: 2,
              label: '待审核'
            },
            {
              value: 3,
              label: '审核通过'
            },
            {
              value: 4,
              label: '审核拒绝'
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

/** 审核弹窗表单 */
export const schemaAudit: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    props: { cols: 1 },
    children: [
      {
        key: 'remark',
        type: 'TextArea',
        formItemProps: { label: '拒绝原因', required: true },
        props: { placeholder: '请输入拒绝原因', autoSize: true }
      }
    ]
  }
];
