import { IFormBaseComponentsUnion, TypeUseForm } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IMaintainLogsListState
 */
export class IMaintainLogsListState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  isLoading = false;
  isExportLoading = false;
  isLoadingModalNotify = false;
  isVisibleModalMaintainRegistration = false;
  isLoadingModalMaintainRegistration = false;
  isVisibleModalCalibration = false;
}
export interface IModalComponentProps {
  title: string;
  form?: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent?: IMaintainLogsListState;
  isLoading?: boolean;
}
export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'vehicleKeyWord',
        type: 'Input',
        formItemProps: {
          label: '车辆信息'
        },
        props: {
          placeholder: '车主/车牌号/车架号',
          allowClear: true
        }
      },
      {
        key: 'time',
        type: 'RangePicker',
        formItemProps: {
          label: '回店时间'
        },
        props: {
          allowClear: true
        }
      },
      {
        key: 'content',
        type: 'Select',
        formItemProps: {
          label: '项目'
        },
        props: {
          placeholder: '选择项目',
          allowClear: true
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];

export const schemaMaintainRegistration: IFormBaseComponentsUnion[] = [
  {
    key: 'distributorId',
    type: 'Select',
    formItemProps: {
      label: '所属机构',
      rules: [
        {
          required: true,
          message: '请选择所属机构'
        }
      ]
    },
    props: {
      placeholder: '选择所属机构',
      allowClear: true,
      filterOption: false,
      options: [],
      showSearch: true
    }
  },
  {
    key: 'ownerMobile',
    type: 'Input',
    formItemProps: {
      label: '用户手机号',
      rules: [
        {
          required: true,
          message: '车主手机号'
        }
      ]
    },
    props: {
      placeholder: '车主手机号'
    }
  },
  {
    key: 'vehicleId',
    type: 'Select',
    formItemProps: {
      label: '车牌号'
    },
    props: {
      placeholder: '选择车牌号',
      allowClear: true,
      filterOption: false,
      options: [],
      showSearch: true
    }
  },
  {
    key: 'currentMaintenanceTime',
    type: 'DatePicker',
    formItemProps: {
      label: '本次保养日期',
      rules: [
        {
          required: true,
          message: '请选择本次保养日期'
        }
      ]
    }
  },
  {
    key: 'nextMaintenanceTime',
    type: 'DatePicker',
    formItemProps: {
      label: '下次保养日期',
      rules: [
        {
          required: true,
          message: '请选择下次保养日期'
        }
      ]
    }
  },
  {
    key: 'currentMaintenanceMileage',
    type: 'Input',
    formItemProps: {
      label: '本次保养里程',
      rules: [
        {
          required: true,
          message: '请输入本次保养里程'
        }
      ]
    },
    props: {
      placeholder: '请输入本次保养里程',
      addonAfter: 'km',
      type: 'number'
    }
  },
  {
    key: 'nextMaintenanceMileage',
    type: 'Input',
    formItemProps: {
      label: '下次保养里程',
      rules: [
        {
          required: true,
          message: '请输入下次保养里程'
        }
      ]
    },
    props: {
      placeholder: '请输入下次保养里程',
      addonAfter: 'km',
      type: 'number'
    }
  },
  {
    key: 'fee',
    type: 'Input',
    formItemProps: {
      label: '保养费用',
      rules: [
        {
          required: true,
          message: '请输入保养费用'
        }
      ]
    },
    props: {
      placeholder: '请输入保养费用',
      addonAfter: '元',
      type: 'number'
    }
  },
  {
    key: 'contentRange',
    type: 'CheckboxButton',
    formItemProps: {
      label: '本次保养项目',
      rules: [
        {
          required: false,
          message: '请选择保养项目'
        }
      ]
    },
    props: {
      options: []
    },
    children: {
      key: 'addCheckBox',
      type: 'span',
      children: '+ 自定义项目',
      props: {}
    }
  },
  {
    key: 'remark',
    type: 'TextArea',
    formItemProps: {
      label: '保养备注',
      rules: [
        {
          required: false,
          message: '请输入保养备注'
        }
      ]
    },
    props: {
      placeholder: '请输入保养备注',
      rows: 10
    }
  }
];

export const schemaCalibration: IFormBaseComponentsUnion[] = [
  {
    key: 'mileage',
    type: 'Input',
    formItemProps: {
      label: '当前里程',
      rules: [
        {
          required: true,
          message: '请输入当前里程'
        }
      ]
    },
    props: {
      placeholder: '请输入当前里程',
      addonAfter: 'km',
      type: 'number'
    }
  }
];

export const schemaProject: IFormBaseComponentsUnion[] = [
  {
    key: 'item',
    type: 'Input',
    formItemProps: {
      label: '项目名',
      rules: [
        {
          required: true,
          message: '请输入项目名'
        }
      ]
    },
    props: {
      placeholder: '请输入项目名'
    }
  }
];
