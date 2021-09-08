import { CascaderProps } from 'antd/lib/cascader';
import * as React from 'react';
import LazyOptionosCascaderComponent from './lazy-optionos-cascader-component/lazy-optionos-cascader.component';

export class CascaderFactory {
  public static getCascader(type?: number) {
    switch (type) {
      default:
        return (props: CascaderProps) => <LazyOptionosCascaderComponent {...props} />;
    }
  }
}
