import React from 'react';
import { TablePageTelStore } from './table-page-tel.component.store';

export interface IProps {
  tablePageTelStore?: TablePageTelStore,
  pageName?: string|React.ReactNode,
  isFlex?: boolean,
  leftFlex?: number,
  rightFlex?: number,
  pageLeft?: any,
  selectTags?: any,
  selectItems?: any,
  searchButton?: any,
  otherSearchBtns?: any,
  table?: any,
  selectItemsStyle?:any,
}