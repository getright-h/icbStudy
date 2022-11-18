import * as React from 'react';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { ISearchSelectComponent } from '../component.module';

export class ISelectProps {
  onChange?: (value: unknown, obj?: unknown) => void;
  /**是否预加载下拉框数据 */
  isPreload?: boolean;
  searchKey?: string;
  value?: string;
  isSendObj?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

/** 账户钱包筛选列表 -(机构配置中)下拉列表 */
export default React.memo((props: ISelectProps) => {
  const { onChange, isPreload, isSendObj = false, disabled = false, placeholder = '请选择账号', ...rest } = props;
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const requestFn = fundsOrganizitonOtherService.filtList;
  const params = {
    placeholder,
    requestFn,
    onChange: (v: any, obj: any) => onChange(v, obj),
    isPreload: isPreload,
    disabled: disabled,
    value: props.value,
    searchKey: props.searchKey,
    searchKeyName: 'bagSearch',
    responseDataStructure: ['dataList'],
    labelDataStructure: ['name'],
    valueDataStructure: ['id'],
    ...rest
  };
  const search = <ISearchSelectComponent {...params} />;
  return <React.Fragment>{search}</React.Fragment>;
});
