import { useLayoutEffect } from 'react';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IItem, IStandardFormState, IStandardFromProps } from './standard-form.interface';

export function useStandardFormStore(props: IStandardFromProps) {
  const { state, setStateWrap } = useStateStore(new IStandardFormState());
  const { items } = props;
  const cacheShouldUpdateArray: IItem[] = items.filter((item: IItem) => item.options?.update);
  let updateST: any = null;

  useLayoutEffect(() => {
    setStateWrap({
      formValue: {}
    });
  }, []);
  /**
   * @description 处理表单联动渲染更新逻辑
   */
  function handleFormChange(changedValues: any, values: any) {
    const keys = Object.keys(changedValues);
    cacheShouldUpdateArray.map((item: IItem) => {
      if (!!~keys.indexOf(item.key)) {
        clearTimeout(updateST);
        updateST = setTimeout(function() {
          setStateWrap({
            formValue: values
          });
          console.log('update');
          // if (props.handleFormChangeEvent) {
          //   props.handleFormChangeEvent(changedValues, values);
          // }
        }, 100);
      }
    });
    if (props.handleFormChangeEvent) {
      props.handleFormChangeEvent(changedValues, values);
    }
    console.log('changedValues===>', changedValues);
  }

  return { handleFormChange, state };
}
