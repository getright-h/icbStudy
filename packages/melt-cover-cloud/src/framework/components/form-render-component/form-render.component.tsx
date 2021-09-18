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
  console.log('slot===>', slot);

  if (slot) {
    return (
      <Form form={form} className={className} {...props.props} onValuesChange={handleFormChange}>
        {console.log('renderslot===>', useRefRender.current)}
        {slot({ renderItem: deepSoltClone })}
      </Form>
    );
  }
  return (
    <div>
      <Form form={form} className={className} {...props.props} onValuesChange={handleFormChange}>
        {console.log('render===>', useRefRender?.current)}
        {useRefRender.current && useRefSchema.current?.map(useRefRender.current.handleCreateElement)}
      </Form>
    </div>
  );
});

export default FormRenderComponent;
