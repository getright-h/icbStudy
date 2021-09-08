import { IFormBaseComponentsUnion } from '@fch/fch-shop-web';
import { Form } from 'antd';
import * as React from 'react';
import { useFormRenderStore } from './form-render.component.store';
import { IFormRenderProps } from './form-render.interface';

const FormRenderComponent = React.memo((props: IFormRenderProps) => {
  const { form, slot, className } = props;
  const { state, handleFormChange, useRefSchema, useRefRender } = useFormRenderStore(props);
  //插槽业务逻辑
  function deepSoltClone(_element: IFormBaseComponentsUnion) {
    const { key } = _element;
    return useRefSchema.current.map(item => {
      if (item.key === key) {
        return useRefRender.current.handleCreateElement(item);
      }
      return null;
    });
  }

  if (slot) {
    return (
      <Form form={form} className={className} {...props.props} onValuesChange={handleFormChange}>
        {console.log('renderslot===>', state.schema)}
        {slot({ renderItem: deepSoltClone })}
      </Form>
    );
  }
  return (
    <Form form={form} className={className} {...props.props} onValuesChange={handleFormChange}>
      {console.log('render===>', state.schema)}
      {useRefSchema.current?.map(useRefRender.current.handleCreateElement)}
    </Form>
  );
});

export default FormRenderComponent;
