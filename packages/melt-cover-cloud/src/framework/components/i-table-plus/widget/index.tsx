import { Divider, Switch, Tag, Tooltip, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import { BaseType } from 'antd/lib/typography/Base';
import React, { ReactNode } from 'react';
const { Link, Text } = Typography;

export type Options = Array<{
  label: string;
  value: string | number | boolean;
  color?: string;
}>;

export interface ColumnActionOpt {
  text: React.ReactNode;
  click?: () => void;
  show?: boolean;
  type?: BaseType;
}

export interface ColumnToolsType {
  /** 单纯处理列表异常 */
  render: (value: any) => any;
  /** 渲染表行上的操作列表 */
  renderTableColumnAction: (actionList: Array<ColumnActionOpt>) => React.ReactNode;
  /** 获取当前 Option */
  // optionsFind?: (options: Options, key: string | number | boolean) => Options | undefined
  /** 渲染标签
   * ``` ts
   *  type Options = Array<{
   *    label: string;
   *    value: string | number | boolean;
   *    color?: string;
   * }>
   * ```
   */
  renderTag: (options: Options, key: string | number | boolean, insertTest?: React.ReactNode) => JSX.Element;
  /** 渲染文本: `<朴素的文字渲染>` */
  renderText: (text: string | number, color?: BaseType | string, errorText?: React.ReactNode) => JSX.Element;
  /** 表格中的备注信息：`<超长将会隐藏、鼠标悬停展示全部文本>` */
  renderRemark: (remark: string, maxWidth?: number, errorText?: React.ReactNode) => React.ReactNode;
}

/** 表格行上各式各样的展示控件。包括但不限于：`多彩文字、标签、事件栏、超长备注、开关...`🎈 */
export const ColumnTools = {
  render: (value: any) => {
    return value ?? '-';
  },

  renderTableColumnAction: (
    actionList: Array<{
      text: React.ReactNode;
      click?: () => void;
      show?: boolean;
      type?: BaseType;
    }>
  ) => {
    const list = actionList.filter(o => o?.show ?? true);
    return (
      <React.Fragment>
        {list.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <Link type={item?.type ?? undefined} onClick={item?.click}>
                {item.text}
              </Link>
              {i < list.length - 1 ? <Divider type="vertical" /> : undefined}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  },

  renderTag: (options: Options, key: string | number | boolean, insertTest?: React.ReactNode) => {
    const tag = options.find(f => f.value == key);
    return (
      <Tag color={tag?.color ?? undefined}>
        <span>{tag?.label}</span>
        <span>{insertTest}</span>
      </Tag>
    );
  },

  renderText: (text: string | number, color?: BaseType | string, errorText?: React.ReactNode) => {
    const textBaseType = ['secondary', 'success', 'warning', 'danger'];
    const props = textBaseType.includes(color ?? 'secondary')
      ? { type: (color ?? 'secondary') as BaseType }
      : { style: { color } };
    return <Text {...props}>{text ?? errorText ?? '-'}</Text>;
  },

  renderRemark: (remark: string, maxWidth = 250, errorText?: React.ReactNode) => {
    return remark ? (
      <Tooltip title={remark}>
        <div
          style={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: `${maxWidth}px`
          }}
        >
          {remark}
        </div>
      </Tooltip>
    ) : (
      errorText ?? '-'
    );
  }
};
