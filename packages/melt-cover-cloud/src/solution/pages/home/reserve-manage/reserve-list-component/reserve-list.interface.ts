import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import FromComponents from '~/framework/components/form-components';
import {
  COMPONENT_DATE_PICKER_TYPES,
  COMPONENT_SELECT_TYPES
} from '~/framework/components/form-components/index.types';
import { IBaseFromUnionArray } from '~/framework/components/standard-form-component/standard-from.base.type';
import { AppointPagedListData } from '~/solution/model/dto/reserve-manage.dto';
import { AppointStateConst, AppointStateEnum, AppSourceConst } from '~/solution/shared/enums/reserve.enum';

/**
 * @export state变量定义和初始化
 * @class IReserveListState
 */
export class IReserveListState {
  searchForm = {
    index: 1,
    size: 10
  };
  total: number;
  tableData: AppointPagedListData[] = [];
  isLoading = false;
  detailVisible = false;
}

export enum ActionType {
  DETAIL,
  CONFIRM,
  REACH,
  CANCEL
}

export const ConfirmTextByBookState = {
  [AppointStateEnum.Confirm]: { content: '确定要确认该车主的预约吗？', hint: '确定成功' },
  [AppointStateEnum.Finished]: { content: '确定该车主已到店吗？', hint: '确定成功' },
  [AppointStateEnum.Cancel]: { content: '确定要取消该预约吗？', hint: '取消成功' }
};

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'userValue',
        type: 'Input',
        formItemProps: {
          label: '用户信息'
        },
        props: {
          placeholder: '车主姓名/手机号码',
          allowClear: true
        }
      },
      {
        type: 'Input',
        key: 'vehicleValue',
        formItemProps: {
          label: '车辆信息'
        },
        props: {
          placeholder: '车牌号/车架号',
          allowClear: true
        }
      },
      {
        key: 'reserveTime',
        type: 'RangePicker',
        formItemProps: {
          label: '预约日期'
        },
        props: {
          allowClear: true,
          style: { width: '100%' }
        }
      },
      {
        key: 'appSource',
        type: 'Select',
        formItemProps: {
          label: '渠道'
        },
        props: {
          placeholder: '请选择渠道',
          allowClear: true,
          options: AppSourceConst
        }
      },
      {
        key: 'state',
        type: 'Select',
        formItemProps: {
          label: '预约状态'
        },
        props: {
          placeholder: '请选择预约状态',
          allowClear: true,
          options: AppointStateConst
        }
      },
      {
        key: 'distributorId',
        type: 'Select',
        formItemProps: {
          label: '经销商'
        },
        props: {
          placeholder: '请选择机构',
          allowClear: true,
          options: [],
          showSearch: true,
          filterOption: false
        }
      },
      {
        key: 'createTime',
        type: 'RangePicker',
        formItemProps: {
          label: '创建时间'
        },
        props: {
          allowClear: true,
          style: { width: '100%' }
        }
      }
    ],
    props: {
      cols: 3
    }
  }
];

/**
 * @exports 表单组件配置
 */
export const itemsConfig: IBaseFromUnionArray = [
  {
    type: 'Input',
    key: 'userValue',
    label: '用户信息',
    componentEngine: () => FromComponents.getInstance().getInputComponents(),
    componentOptions: {
      placeholder: '车主姓名/手机号码',
      allowClear: true
    }
  },
  {
    type: 'Input',
    key: 'vehicleValue',
    label: '车辆信息',
    componentEngine: () => FromComponents.getInstance().getInputComponents(),
    componentOptions: {
      placeholder: '车牌号/车架号',
      allowClear: true
    }
  },
  {
    key: 'reserveTime',
    type: 'DatePicker',
    label: '预约日期', // beginTime endTime
    componentEngine: () =>
      FromComponents.getInstance().getDatePickerComponents(COMPONENT_DATE_PICKER_TYPES.DatePickerRange),
    componentOptions: {
      allowClear: true
    }
  },
  {
    type: 'Select',
    key: 'appSource',
    label: '渠道',
    componentEngine: () => FromComponents.getInstance().getSelectComponents(),
    componentOptions: {
      placeholder: '请选择渠道',
      allowClear: true,
      options: AppSourceConst
    }
  },
  {
    type: 'Select',
    key: 'state',
    label: '预约状态',
    componentEngine: () => FromComponents.getInstance().getSelectComponents(),
    componentOptions: {
      placeholder: '请选择预约状态',
      allowClear: true,
      options: AppointStateConst
    }
  },
  {
    type: 'Select',
    key: 'distributorId',
    label: '经销商',
    componentEngine: () => FromComponents.getInstance().getSelectComponents(COMPONENT_SELECT_TYPES.SelectMaxAllOrg),
    componentOptions: {
      placeholder: '请选择机构',
      allowClear: true,
      showSearch: true,
      optionFilterProp: 'label'
    }
  },
  {
    type: 'DatePicker',
    key: 'createTime',
    label: '发起时间', // begin end
    componentEngine: () =>
      FromComponents.getInstance().getDatePickerComponents(COMPONENT_DATE_PICKER_TYPES.DatePickerRange),
    componentOptions: {
      allowClear: true
    }
  }
];
