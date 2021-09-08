import { Col, Form, Input, Row } from 'antd';
import * as React from 'react';
import style from './standard-form.component.less';
import { useStandardFormStore } from './standard-form.component.store';
import {
  defaultFromItemLayout,
  IItem,
  IRenderFormItem,
  IStandardFromProps,
  responsive
} from './standard-form.interface';
const FormItem = Form.Item;

const StandardFormComponent = React.memo(function(props: IStandardFromProps) {
  const { items, layout, columns, onFinish, slotFormComponent } = props;
  console.log('props===>', props);
  const { handleFormChange } = useStandardFormStore(props);
  function renderFormItem(params: IRenderFormItem) {
    const { item, columns } = params;
    const { label, key, required, componentEngine, componentOptions, rules = [] } = item;
    const col: number = columns > 6 ? 6 : columns;
    const rulesArr = rules
      ? [{ required, message: `${label}不能为空` }, ...rules]
      : [{ required, message: `${label}不能为空` }];
    const _item = Object.assign({}, item);
    delete _item.componentEngine;
    delete _item.componentOptions;
    return (
      !item.hideForce && (
        <Col {...responsive[col]} key={key}>
          <FormItem name={key} rules={rulesArr} {..._item}>
            {componentEngine?.()?.(componentOptions as any) || <Input {...(componentOptions as any)} />}
          </FormItem>
        </Col>
      )
    );
  }

  /**
   * 插槽
   */
  if (slotFormComponent) {
    return (
      <div className={style.standardFormContainer}>
        <Form {...defaultFromItemLayout} {...props} onFinish={onFinish && onFinish} onValuesChange={handleFormChange}>
          {slotFormComponent({ columns, layout, callback: renderFormItem })}
        </Form>
      </div>
    );
  }

  return (
    <div className={style.standardFormContainer}>
      <Form {...defaultFromItemLayout} {...props} onFinish={onFinish && onFinish} onValuesChange={handleFormChange}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {items.map((item: IItem) => renderFormItem({ item, layout, columns }))}
        </Row>
      </Form>
    </div>
  );
});

export default StandardFormComponent;
