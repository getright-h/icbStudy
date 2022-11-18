import { Button } from 'antd';
import * as React from 'react';
import { ITableComponent, IFormComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { demoColumns } from './demo-columns';
import style from './other-order-management.module.less';
import { useOtherOrderManagementStore } from './other-order-management.component.store';
import { schema } from './other-order-management.interface';
import { ISelectOtherOrderDistributor, ISelectOtherOrderEquityGroup } from '~/framework/components/component.module';

export default function OtherOrderManagementComponent() {
  const { state, handleSearch, formRef, tableAction, changeTablePageIndex, addOrder } = useOtherOrderManagementStore();
  const { searchForm, tableData, total, isLoading } = state;
  function renderSelectItems() {
    return (
      <IFormComponent
        widget={{ ISelectOtherOrderDistributor, ISelectOtherOrderEquityGroup }}
        form={formRef}
        schema={schema}
        props={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }}
      />
    );
  }
  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch()}>
          查询
        </Button>
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
        pageName={'订单管理/订单列表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
    </div>
  );
}
