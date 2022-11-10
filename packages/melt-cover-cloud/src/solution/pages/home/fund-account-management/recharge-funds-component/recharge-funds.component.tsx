import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button } from 'antd';
import * as React from 'react';
import { demoColumns } from './demo-columns';
import style from './recharge-funds.component.less';
import { useRechargeFundsStore } from './recharge-funds.component.store';

import { schema } from './recharge-funds.interface';

export default function RechargeFundsComponent() {
  const {
    state,
    formRef,
    handleSearch,
    isShowAccountRechange,
    exportExcel,
    tableAction,
    changeTablePageIndex
  } = useRechargeFundsStore();

  // 渲染选择框函数
  function renderSelectItems() {
    return (
      <IFormComponent form={formRef} schema={schema} props={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }} />
    );
  }

  // 渲染搜索框
  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch()}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={() => isShowAccountRechange(true)}>
          账户充值
        </Button>
        <Button type="primary" className="ml20" onClick={() => exportExcel()}>
          导出
        </Button>
      </>
    );
  }

  // 渲染表单体
  function renderTable() {
    return (
      <ITableComponent
        columns={demoColumns(tableAction)}
        isLoading={false}
        pageIndex={1}
        pageSize={10}
        data={[]}
        total={0}
        // columns={demoColumns(tableAction)}
        // isLoading={isLoading}
        // pageIndex={searchForm.index}
        // pageSize={searchForm.size}
        // data={tableData}
        // total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'资金账户管理/资金账户设置'}
        // pageLeft={renderPageLeft()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        // otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></ITablePageComponent>
    </div>
  );
}
