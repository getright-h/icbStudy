import { IFormBaseComponentsUnion, TypeUseForm } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IMaintainNotifyListState
 */
export class IMaintainNotifyListState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: any = [];
  selectedRowKeys: any = [];
  isLoading = false;
  isExportLoading = false;
  isRemindLoading = false;
  isVisibleModalNotify = false;
  isLoadingModalNotify = false;
  isVisibleModalCalibration = false;
  isLoadingModalCalibration = false;
  isVisibleModalMaintainFollow = false;
  isLoadingModalMaintainFollow = false;
  isVisibleModalMaintainRegistration = false;
  isLoadingModalMaintainRegistration = false;
  soonAccount = 0;
  overTimeAccount = 0;
  // 保养提醒列表
  searchsNotifyListModalForm = {
    index: 1,
    size: 10
  };
  isNotifyListModalLoading = false;
  tablesNotifyListModalData: any = [];
  totalsNotifyListModal = 0;
  isVisibleModalNotifyList = false;
  // 保养跟进列表
  searchsFollowListModalForm = {
    index: 1,
    size: 10
  };
  isFollowListModalLoading = false;
  tablesFollowListModalData: any = [];
  totalsFollowListModal = 0;
  isVisibleModalFollowList = false;
  title = '';
}

export interface IModalComponentProps {
  title: string;
  form?: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IMaintainNotifyListState;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'ownerKeyWord',
        type: 'Input',
        formItemProps: {
          label: '车主'
        },
        props: {
          placeholder: '请输入姓名/手机号',
          allowClear: true
        }
      },
      {
        key: 'vehicleKeyWord',
        type: 'Input',
        formItemProps: {
          label: '车辆信息'
        },
        props: {
          placeholder: '车牌/车架号',
          allowClear: true
        }
      },
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '所属机构'
        },
        props: {
          placeholder: '选择所属机构',
          allowClear: true,
          filterOption: false,
          options: [],
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'vehicleModel',
        type: 'Input',
        formItemProps: {
          label: '品牌型号'
        },
        props: {
          placeholder: '请输入品牌型号',
          allowClear: true
        }
      },
      {
        key: 'container1',
        type: 'Layout',
        children: [
          {
            key: 'startMileage',
            type: 'Input',
            formItemProps: {
              label: '当前里程',
              labelCol: {
                span: 9
              },
              wrapperCol: {
                span: 15
              }
            },
            props: {
              placeholder: '当前里程(KM)'
            }
          },
          {
            key: 'quotor',
            type: 'span',
            children: '-'
          },
          {
            key: 'endMileage',
            type: 'Input',
            props: {
              placeholder: '当前里程(KM)'
            },
            formItemProps: {
              labelCol: {
                span: 9
              },
              wrapperCol: {
                span: 15
              }
            }
          }
        ],
        props: {
          style: {
            gridColumn: '2 / 4',
            gridTemplateColumns: '200px 10px 200px'
          }
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];

export const schemaNotify: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'remindType',
        type: 'CheckboxGroup',
        formItemProps: {
          label: '提醒方式',
          rules: [
            {
              required: true,
              message: '请选择提醒方式'
            }
          ]
        },
        props: {
          options: [
            { label: 'App', value: 0 },
            { label: '微信', value: 1 }
          ]
        }
      },
      {
        key: 'message',
        type: 'TextArea',
        formItemProps: {
          label: '提醒信息',
          rules: [
            {
              required: true,
              message: '请输入提醒信息'
            }
          ]
        },
        props: {
          placeholder: '请输入提醒信息',
          rows: 10
        }
      },
      {
        key: 'remark',
        type: 'TextArea',
        formItemProps: {
          label: '提醒备注',
          rules: [
            {
              required: false,
              message: '请输入提醒备注'
            }
          ]
        },
        props: {
          placeholder: '请输入提醒备注',
          rows: 5
        }
      }
    ]
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

export const schemaMaintainFollow: IFormBaseComponentsUnion[] = [
  {
    key: 'type',
    type: 'Select',
    formItemProps: {
      label: '跟进方式',
      rules: [
        {
          required: true,
          message: '选择跟进方式'
        }
      ]
    },
    props: {
      placeholder: '选择跟进方式',
      allowClear: true,
      options: [
        { label: '电话通知', value: 0 },
        { label: '短信通知', value: 1 },
        { label: '其它', value: 2 }
      ]
    }
  },
  {
    key: 'remark',
    type: 'TextArea',
    formItemProps: {
      label: '跟进备注',
      rules: [
        {
          required: true,
          message: '请输入跟进备注'
        }
      ]
    },
    props: {
      placeholder: '请输入跟进备注',
      rows: 10
    }
  }
];

export const schemaMaintainRegistration: IFormBaseComponentsUnion[] = [
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
