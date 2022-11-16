import * as React from 'react';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ISearchSelectComponent } from '../component.module';

export class ISelectProps {
  onChange?: (value: unknown) => void;
  /**是否预加载下拉框数据 */
  isPreload?: boolean;
  searchKey?: string;
  value?: string;
  isSendObj?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

/** 卡卷-下拉列表-多选 */
export default React.memo((props: ISelectProps) => {
  const { onChange, isPreload, isSendObj = false, disabled = false, placeholder = '请选择卡券', ...rest } = props;
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const requestFn = fundsOrganizitonOtherService.cardSimpleList;
  const params = {
    placeholder,
    requestFn,
    onChange: (v: any, obj: any) => onChange(isSendObj ? obj : v),
    isPreload: isPreload,
    disabled: disabled,
    value: props.value,
    searchKey: props.searchKey,
    mode: 'multiple' as 'multiple' | 'tags',
    searchKeyName: 'name',
    responseDataStructure: ['dataList'],
    labelDataStructure: ['name'],
    valueDataStructure: ['id'],
    ...rest
  };
  const search = <ISearchSelectComponent {...params} />;
  return <React.Fragment>{search}</React.Fragment>;
});
