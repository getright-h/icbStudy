import { Button } from 'antd';
import * as React from 'react';
import { ITableComponent, IFormComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { demoColumns } from './demo-columns';
import style from './order-management-list.module.less';
import { useOrderManagementListStore } from './order-management-list.component.store';
import { schema } from './order-management-list.interface';

export default function OrderManagementListComponent() {
  const { state, handleSearch, formRef, tableAction, changeTablePageIndex, addOrder } = useOrderManagementListStore();
  const { searchForm, tableData, total, isLoading } = state;
  function renderSelectItems() {
    return (
      <IFormComponent form={formRef} schema={schema} props={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }} />
    );
  }
  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch()}>
          查询
        </Button>
        {/* <Button type="primary" className="ml20" onClick={addOrder}>
          创建订单
        </Button> */}
      </>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={demoColumns(tableAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
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
        pageName={'订单管理/双保无忧订单列表'}
        // pageLeft={renderPageLeft()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        // otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></ITablePageComponent>
    </div>
  );
}
