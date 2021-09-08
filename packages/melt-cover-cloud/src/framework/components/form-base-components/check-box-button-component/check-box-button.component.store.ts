import { ICheckBoxButtonState } from './check-box-button.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { useEffect } from 'react';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';

export function useCheckBoxButtonStore(props: CheckboxGroupProps) {
  const { state, setStateWrap } = useStateStore(new ICheckBoxButtonState());
  const { onChange } = props;
  useEffect(() => {
    setStateWrap({
      options: props.options
    });
  }, [JSON.stringify(props.options)]);
  useEffect(() => {
    const map = new Map();
    props.value?.map((item: any) => {
      map.set(item.value, item);
    });
    setStateWrap({
      values: map
    });
  }, [JSON.stringify(props.value)]);
  function handleCheck(item: CheckboxOptionType | string): boolean {
    return state.values.has((item as CheckboxOptionType).value ?? (item as string));
  }

  function trigger(item: CheckboxOptionType | string) {
    const newState = state.values,
      changeValues: any = [];
    if (state.values.has((item as CheckboxOptionType).value ?? (item as string))) {
      newState.delete((item as CheckboxOptionType).value ?? (item as string));
    } else {
      newState.set((item as CheckboxOptionType).value ?? (item as string), item);
    }

    setStateWrap({
      values: newState
    });
    Array.from(newState).map(item => {
      changeValues.push(item[1]);
    });
    onChange?.(changeValues);
  }
  return { state, handleCheck, trigger };
}
