import { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';
import * as React from 'react';
import style from './check-box-button.module.less';
import { useCheckBoxButtonStore } from './check-box-button.component.store';

export default function CheckBoxButtonComponent(props: CheckboxGroupProps) {
  const { handleCheck, trigger } = useCheckBoxButtonStore(props);
  const { options, children } = props as CheckboxGroupProps & { children: any };
  function renderItem(item: CheckboxOptionType | string, index: number) {
    return (
      <span key={index} className={`${handleCheck(item) ? style.checked : ''}`} onClick={() => trigger(item)}>
        {(item as CheckboxOptionType)?.label || item}
      </span>
    );
  }

  return (
    <div className={style.test}>
      {options.map(renderItem)}
      {children}
    </div>
  );
}
