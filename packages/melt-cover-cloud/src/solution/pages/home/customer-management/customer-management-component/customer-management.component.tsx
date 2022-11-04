import { Button } from 'antd';
import * as React from 'react';
import { IFormComponent, ITablePageComponent, ITableComponent } from '@fch/fch-shop-web';
import style from './customer-management.module.less';
import { useCustomerManagementStore } from './customer-management.component.store';
import { CustomerManageColumns } from './customer-manage.columns';
import { schema } from './customer-management.interface';

export default function CustomerManagementComponent() {
  const {
    state,
    handleSearch,
    formRef,
    tableAction,
    changeTablePageIndex,
    handleExport
  } = useCustomerManagementStore();
  const { searchForm, tableData, total, isLoading } = state;
  function renderSelectItems() {
    return (
      <IFormComponent
        form={formRef}
        schema={schema}
        props={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
      ></IFormComponent>
    );
  }

  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch(true)}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={() => handleExport()}>
          导出
        </Button>
      </>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={CustomerManageColumns(tableAction)}
        isLoading={isLoading}
        pageIndex={searchForm.page}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
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
        pageName={'客户管理'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
    </div>
  );
}
