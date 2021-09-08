import * as React from 'react';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import { TypeUseForm } from '@fch/fch-shop-web';
import _ from 'lodash';
import { IChildren, IFormBaseComponentsUnion } from './index.type';
import { IENUMCOMPONENTS } from './index.enum';
import { IWidget } from '../form-render-component/form-render.interface';

export default class HandleTypesFactory {
  static _IENUMCOMPONENTS: IWidget = IENUMCOMPONENTS;
  public form: TypeUseForm;
  constructor(form: TypeUseForm) {
    this.form = form;
    this.initBind();
  }
  initBind() {
    this.handleCompiler = this.handleCompiler.bind(this);
    this.handleCreateElement = this.handleCreateElement.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.renderLayout = this.renderLayout.bind(this);
    this.renderFormItem = this.renderFormItem.bind(this);
    this.handleChildren = this.handleChildren.bind(this);
  }
  handleCompiler(element: any): any {
    const RegRuleSchema = /\{\{(.*)\}\}/;
    const RegRuleFormData = /formData/g;
    const formData = this.form.getFieldsValue();
    if (isObject(element)) {
      Object.keys(element).map((item: string) => {
        if (isObject(element[item])) {
          this.handleCompiler(element[item]);
          return;
        }
        if (isString(element[item]) && RegRuleSchema.test(element[item])) {
          const str = element[item].substring(2, element[item].length - 2);
          element[item] = Function(`return ${str.replace(RegRuleFormData, JSON.stringify(formData))}`)();
        }
      });
    }
    if (isString(element)) {
      if (RegRuleSchema.test(element)) {
        const str = element.substring(2, element.length - 2);
        element = Function(`return ${str.replace(RegRuleFormData, JSON.stringify(formData))}`)();
      }
    }

    return element;
  }

  handleCreateElement(_element: IFormBaseComponentsUnion): JSX.Element {
    const element = this.handleCompiler(_.cloneDeep(_element));
    const { type, props, children, hidden } = element;
    if (hidden) return null;
    if (type == 'Layout') {
      return this.renderLayout(element);
    }
    if (HandleTypesFactory._IENUMCOMPONENTS[type]) {
      return this.renderFormItem(element);
    }
    return React.createElement(type, props, this.handleChildren(children));
  }

  setComponent(Components: IWidget) {
    HandleTypesFactory._IENUMCOMPONENTS = Object.assign(HandleTypesFactory._IENUMCOMPONENTS, Components);
  }

  renderLayout(element: IFormBaseComponentsUnion) {
    const { key, props, children, type } = this.handleCompiler(element);
    const render = React.createElement(HandleTypesFactory._IENUMCOMPONENTS[type], props, this.handleChildren(children));
    return <React.Fragment key={key}>{render}</React.Fragment>;
  }

  renderFormItem(element: IFormBaseComponentsUnion): JSX.Element {
    const { key, props, children, formItemProps, type } = this.handleCompiler(element) as IFormBaseComponentsUnion & {
      formItemProps?: FormItemProps;
    };
    const render = React.createElement(HandleTypesFactory._IENUMCOMPONENTS[type], props, this.handleChildren(children));
    const formItem = this.handleCompiler(formItemProps);
    const _rules = this.handleCompiler(formItem?.rules);
    const rules = _rules
      ? [{ required: formItemProps?.required || false, message: `${formItemProps?.label}不能为空` }, ..._rules]
      : [{ required: formItemProps?.required || false, message: `${formItemProps?.label}不能为空` }];
    return (
      <FormItem
        name={this.handleCompiler(key)}
        key={this.handleCompiler(key)}
        {...formItem}
        style={{ ...this.handleCompiler(props?.style) }}
        rules={rules}
      >
        {render}
      </FormItem>
    );
  }

  handleChildren(children: IChildren) {
    if (isArray(children)) {
      return (children as IFormBaseComponentsUnion[]).map((item, index) => {
        return (
          <React.Fragment key={index}>
            {isArray(item) ? this.handleChildren(item) : this.handleCreateElement(item)}
          </React.Fragment>
        );
      });
    }
    if (isObject(children)) {
      return this.handleCreateElement(children as IFormBaseComponentsUnion);
    }
    return children;
  }
}

// isArray
export function isArray(params: any) {
  return Object.prototype.toString.call(params) === '[object Array]';
}

// isObject
export function isObject(params: any) {
  return Object.prototype.toString.call(params) === '[object Object]';
}

// isObject
export function isString(params: any) {
  return Object.prototype.toString.call(params) === '[object String]';
}
