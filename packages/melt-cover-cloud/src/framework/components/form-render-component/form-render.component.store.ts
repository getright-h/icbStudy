import { IFormRenderProps, IFormRenderState, ISchemUnion } from './form-render.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Store } from 'antd/lib/form/interface';
import { useEffect, useRef } from 'react';
import { IFormBaseComponentsUnion } from '../form-base-components/index.type';
import _, { debounce } from 'lodash';
import HandleTypesFactory from '../form-base-components';
import { TypeSchemaUtil } from '.';

export function useFormRenderStore(props: IFormRenderProps) {
  const { state, setStateWrap } = useStateStore(new IFormRenderState());
  const { form, watch, schema, widget } = props;
  const useRefSchema = useRef<IFormBaseComponentsUnion[]>(schema);
  const useRefRender = useRef<HandleTypesFactory>(null);
  useRefRender.current?.setComponent(widget);
  useEffect(() => {
    useRefSchema.current = schema;
    form.getSchema().map(item => {
      handleSetSchema(item.key, item.schema);
    });
    form.clearSchema();
    setStateWrap({
      schema: useRefSchema.current
    });
  }, [JSON.stringify(schema)]);

  useEffect(() => {
    useRefRender.current = new HandleTypesFactory(form);

    setStateWrap({
      schema: useRefSchema.current
    });

    handleDepSchma();
  }, []);

  function handleDepSchma() {
    const Dep: any = {};
    const _Proxy: ProxyConstructor = new Proxy(Dep, {
      set: function() {
        const StoreSchema = form.getSchema();
        Array.from(StoreSchema).map(item => {
          handleSetSchema(item.key, item.schema);
        });
        setStateWrap({
          schema: useRefSchema.current
        });
        return true;
      }
    });
    form.setDep(_Proxy);
  }

  function handleSetSchema(key: string, func: TypeSchemaUtil['schema']) {
    let _schema: IFormBaseComponentsUnion[] = null;
    if (key === '#') {
      _schema = func(_.cloneDeep(useRefSchema.current));
    }
    if (key !== '#') {
      _schema = _.cloneDeep(useRefSchema.current);
      handleRecursiveSchema(key, _schema, func);
    }
    useRefSchema.current = _schema;
  }

  /**
   * @description setSchema函数递归处理
   * @param key
   * @param _data
   * @param func
   */
  function handleRecursiveSchema(key: string, _data: ISchemUnion, func: (schema: ISchemUnion) => ISchemUnion) {
    isArray(_data) &&
      (_data as IFormBaseComponentsUnion[] | IFormBaseComponentsUnion[][]).map(item => {
        isArray(item) && handleRecursiveSchema(key, item, func);
        isObject(item) && handleDelObjectSchema(key, item, func);
      });
    isObject(_data) && handleDelObjectSchema(key, _data, func);
  }

  function handleDelObjectSchema(key: string, _data: ISchemUnion, func: (schema: ISchemUnion) => ISchemUnion) {
    isObject(_data) &&
      Object.keys(_data).map((_key: string) => {
        if (_data[_key] == key) {
          _data = func(_data) || _data;
        }
        (isObject(_data[_key]) || isArray(_data[_key])) && handleRecursiveSchema(key, _data[_key], func);
      });
  }

  /**
   * @description watch 函数
   * @param value
   * @param values
   */
  const handleFormChange = debounce(FormChange, 200);
  function FormChange(value: Store, values: Store) {
    Object.keys(value).map((key: string) => {
      watch?.[key]?.(values[key], values);
    });
    setStateWrap({
      schema: useRefSchema.current
    });
    console.log('update');
  }

  // isArray
  function isArray(params: any) {
    return Object.prototype.toString.call(params) === '[object Array]';
  }

  // isObject
  function isObject(params: any) {
    return Object.prototype.toString.call(params) === '[object Object]';
  }

  return { state, handleFormChange, useRefSchema, useRefRender };
}
