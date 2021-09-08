import FormRenderComponent from '~/framework/components/form-render-component/form-render.component';
import { FormInstance, useForm as useBaseForm } from 'antd/lib/form/Form';
import { useState } from 'react';

export type TypeSchemaUtil = {
  key: string;
  schema: (schema: any) => any;
};

export interface StoreForm {
  [key: string]: TypeSchemaUtil['schema'];
}

export type TypeUseForm = FormInstance & UseFormFactory;
class UseFormFactory {
  constructor(form: FormInstance) {
    Object.assign(this, form);
  }
  public StoreSchema: TypeSchemaUtil[] = [];
  public StoreSchemaDep: ProxyConstructor = null;
  public setDep(dep: ProxyConstructor) {
    this.StoreSchemaDep = dep;
  }

  public setSchema(key: TypeSchemaUtil['key'], schema: TypeSchemaUtil['schema']) {
    this.StoreSchema.push({ key, schema });
    if (this.StoreSchemaDep != null) this.StoreSchemaDep[key] = schema;
  }

  public setSchemas(_Store: StoreForm) {
    Object.keys(_Store).map((item: string) => {
      this.StoreSchema.push({ key: item, schema: _Store[item] });
    });
    if (this.StoreSchemaDep != null) this.StoreSchemaDep['_Store'] = _Store;
  }

  public getSchema() {
    return this.StoreSchema;
  }

  public clearSchema() {
    this.StoreSchema = [];
  }
}

export const useForm = (): TypeUseForm => {
  const [form] = useBaseForm();
  const [initForm] = useState(new UseFormFactory(form) as TypeUseForm);
  return initForm;
};

export default FormRenderComponent;
