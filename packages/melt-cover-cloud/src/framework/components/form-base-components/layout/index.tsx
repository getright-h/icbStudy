import * as React from 'react';
import { LayoutType } from './index.type';
import style from './layout.component.less';

export function LayoutComponent(props?: LayoutType['props']): JSX.Element {
  return (
    <div
      {...props}
      className={style.layout}
      style={{
        gridTemplateColumns: `repeat(${props['cols']}, 1fr)`,
        gridTemplateRows: `repeat(${props['rows']}, 1fr)`,
        ...props.style
      }}
    ></div>
  );
}
