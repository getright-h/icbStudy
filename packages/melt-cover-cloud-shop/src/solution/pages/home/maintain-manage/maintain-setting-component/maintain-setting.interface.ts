import { IFormBaseComponentsUnion, TypeUseForm } from '@fch/fch-shop-web';

/**
 * @export state变量定义和初始化
 * @class IMaintainSettingState
 */
export class IMaintainSettingState {
  selectedRowKeys: any = []; // 保存表格中选中的行
  isVisibleModalDetail = false; // 控制详情弹出框的显示
  isNewConfig = true; // 是否是新增配置，false为编辑配置
}

export interface IModalComponentProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  isLoading: boolean;
}

// 主页面form模板
export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'brandId',
        type: 'Select',
        formItemProps: {
          label: '品牌'
        },
        props: {
          placeholder: '选择品牌',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'factoryId',
        type: 'Select',
        formItemProps: {
          label: '厂商'
        },
        props: {
          placeholder: '选择厂商',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'versionId',
        type: 'Select',
        formItemProps: {
          label: '车系'
        },
        props: {
          placeholder: '选择车系',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'configId',
        type: 'Select',
        formItemProps: {
          label: '车型'
        },
        props: {
          placeholder: '选择车型',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      }
    ],
    props: {
      style: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
    }
  }
];
// 详情form模板
export const schemaDetail: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'carModel',
        type: 'h4',
        children: '选择车型'
      },
      {
        key: 'brandId',
        type: 'Select',
        formItemProps: {
          label: '品牌',
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ]
        },
        props: {
          placeholder: '选择品牌',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'factoryId',
        type: 'Select',
        formItemProps: {
          label: '厂商',
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ]
        },
        props: {
          placeholder: '选择厂商',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'versionId',
        type: 'Select',
        formItemProps: {
          label: '车系',
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ]
        },
        props: {
          placeholder: '选择型号',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'configId',
        type: 'Select',
        formItemProps: {
          label: '车型(配置)',
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ]
        },
        props: {
          placeholder: '选择配置',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'maintainRules',
        type: 'h4',
        children: '保养规则'
      },
      {
        key: 'timeInterval',
        type: 'Input',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ],
          label: '保养间隔时间'
        },
        props: {
          placeholder: '请输入保养周期',
          allowClear: true,
          suffix: '月',
          type: 'number',
          min: 0
        }
      },
      {
        key: 'mileageInterval',
        type: 'Input',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ],
          label: '保养间隔里程'
        },
        props: {
          placeholder: '请输入保养里程',
          allowClear: true,
          suffix: 'KM',
          type: 'number',
          min: 0
        }
      },
      {
        key: 'firstMaintainMileage',
        type: 'Input',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ],
          label: '首保里程'
        },
        props: {
          placeholder: '请输入下次保养里程',
          allowClear: true,
          suffix: 'KM',
          type: 'number',
          min: 0
        }
      },
      {
        key: 'firstMaintainTime',
        type: 'Input',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ],
          label: '首保时间'
        },
        props: {
          placeholder: '请输入首保时间',
          allowClear: true,
          suffix: '月',
          type: 'number',
          min: 0
        }
      },
      {
        key: 'container2',
        type: 'Layout',
        children: [
          {
            key: 'remindMileage',
            type: 'Input',
            formItemProps: {
              label: '预计到期差',
              wrapperCol: {
                span: 12
              },
              labelCol: {
                span: 12
              },
              rules: [
                {
                  required: true,
                  message: '必填项'
                }
              ]
            },
            props: {
              suffix: 'KM',
              allowClear: true,
              type: 'number',
              min: 0
            }
          },
          {
            key: 'remindMonth',
            type: 'Input',
            formItemProps: {
              wrapperCol: {
                span: 24
              },
              rules: [
                {
                  required: true,
                  message: '必填项'
                }
              ]
            },
            props: {
              suffix: '月',
              allowClear: true,
              type: 'number',
              min: 0
            }
          },
          {
            key: 'systemRemind',
            type: 'span',
            children: '系统提醒',
            props: {
              style: {
                // cursor: 'pointer',
                padding: '5px 5px'
              }
            }
          }
        ],
        props: {
          style: {
            gridTemplateColumns: '2fr 1fr 1fr',
            marginLeft: '3px',
            gap: '0 4px'
          },
          cols: 3
        }
      },
      {
        key: 'factoryConfig',
        type: 'h4',
        children: '厂商配置'
      },
      {
        key: 'assurancePeriod',
        type: 'Input',
        formItemProps: {
          label: '质保时长',
          wrapperCol: {
            span: 6
          },
          rules: [
            {
              required: true,
              message: '必填项'
            }
          ]
        },
        props: {
          allowClear: true,
          suffix: '月',
          type: 'number',
          min: 0
        }
      }
    ],
    props: {
      style: { gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }
    }
  }
];
// 规则页面form模板
export const ruleSchema: IFormBaseComponentsUnion[] = [
  {
    key: 'ruleContainer',
    type: 'Layout',
    children: [
      {
        key: 'brandId',
        type: 'Select',
        formItemProps: {
          label: '品牌'
        },
        props: {
          placeholder: '选择品牌',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'factoryId',
        type: 'Select',
        formItemProps: {
          label: '厂商'
        },
        props: {
          placeholder: '选择厂商',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'versionId',
        type: 'Select',
        formItemProps: {
          label: '车系'
        },
        props: {
          placeholder: '选择车系',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      },
      {
        key: 'configId',
        type: 'Select',
        formItemProps: {
          label: '车型'
        },
        props: {
          placeholder: '选择车型',
          allowClear: true,
          options: [],
          optionFilterProp: 'label',
          showSearch: true,
          labelInValue: true
        }
      }
    ],
    props: {
      style: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
    }
  }
];
