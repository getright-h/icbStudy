import FromComponents from '~/framework/components/form-components';
import { COMPONENT_RADIO_TYPES, COMPONENT_SELECT_TYPES } from '~/framework/components/form-components/index.types';
import { IBaseFromUnionArray } from '~/framework/components/standard-form-component/standard-from.base.type';

export function getConfigStore() {
  const itemsConfigOne: IBaseFromUnionArray = [
    {
      type: 'Select',
      key: 'distributorId',
      label: '经销商',
      componentEngine: () => FromComponents.getInstance().getSelectComponents(COMPONENT_SELECT_TYPES.SelectMaxAllOrg),
      wrapperCol: { span: 8 },
      required: true,
      componentOptions: {
        placeholder: '请选择经销商',
        allowClear: true,
        showSearch: true,
        optionFilterProp: 'label'
      }
    },
    {
      type: 'Input',
      key: 'count',
      label: '每小时可约工位数',
      componentEngine: () => FromComponents.getInstance().getInputComponents(),
      wrapperCol: { span: 8 },
      required: true,
      componentOptions: {
        placeholder: '请输入工位数',
        allowClear: true
      }
    }
  ];
  const itemsConfigTwo: IBaseFromUnionArray = [
    {
      type: 'Radio',
      key: 'autoConfig',
      label: '自动确认预约',
      componentEngine: () => FromComponents.getInstance().getRadioComponents(COMPONENT_RADIO_TYPES.RadioPrimaryGroup),
      initialValue: true,
      required: true,
      componentOptions: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      }
    }
  ];
  return { itemsConfigOne, itemsConfigTwo };
}
