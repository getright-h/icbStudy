import React from 'react';
import { ISelectLoadingComponent } from 'fch-shop';

export default function() {
  const props = {
    placeholder: '请输入模板类型',
    reqUrl: 'http://192.168.0.252:5402/api/equity/manage/queryEquityGroupPagedList',
    createAuthHeaders: () => ({ token: 'session:e8ec0af4-7aa3-49af-91cb-247f5d560689' }),
    // createAuthHeaders: () => ({ token: 'session:e8ec0af4-7aa3-49af-91cb-247f5d560689' }),
    labelDataStructure: ['name', 'belongingText'],
    keyDataStructure: ['id'],
    valueDataStructure: ['id'],
    responseDataStructure: ['dataList'],
    onChange: (...args) => {
      console.log(args);
    }
  };
  return <ISelectLoadingComponent {...props}></ISelectLoadingComponent>;
}
