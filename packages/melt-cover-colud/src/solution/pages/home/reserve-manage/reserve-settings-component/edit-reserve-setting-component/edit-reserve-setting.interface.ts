import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { FormLayout } from 'antd/lib/form/Form';
import React from 'react';
import { IRenderFormItem } from '~/framework/components/standard-form-component/standard-form.interface';
import { AppointConfigListData } from '~/solution/model/dto/reserve-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IEditReserveSettingState
 */
export class IEditReserveSettingState {
  selectedTags: number[] = [];
  loading = false;
}

/**
 * @export props变量定义和初始化
 * @class IEditReserveSettingProps
 */
export class IEditReserveSettingProps {
  visible: boolean;
  initData?: AppointConfigListData;
  close: (isSuccess?: boolean) => void;
}

export interface IFormProps {
  callback: (params: IRenderFormItem) => React.ReactNode;
  layout: FormLayout;
  columns: number;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '经销商',
          required: true,
          wrapperCol: { span: 8 }
        },
        props: {
          placeholder: '请选择创建机构',
          allowClear: true,
          filterOption: false,
          options: [],
          showSearch: true
        }
      },
      {
        key: 'count',
        type: 'Input',
        formItemProps: {
          label: '每小时可约工位数',
          required: true,
          wrapperCol: { span: 8 }
        },
        props: {
          allowClear: true,
          placeholder: '请输入工位数'
        }
      },
      {
        key: 'bitwise',
        type: 'CheckboxButton',
        formItemProps: {
          label: '预约类型',
          required: true
        },
        props: {
          options: []
        }
      },
      {
        key: 'autoConfig',
        type: 'RadioGroup',
        formItemProps: {
          label: '自动确认预约',
          required: true,
          initialValue: true,
          wrapperCol: { span: 8 }
        },
        props: {
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
