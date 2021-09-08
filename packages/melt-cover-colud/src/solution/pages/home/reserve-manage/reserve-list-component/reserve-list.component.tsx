import * as React from 'react';
import { Button } from 'antd';
import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import ReserveDetailComponent from './reserve-detail-component/reserve-detail.component';
import { ReserveListColumns } from './reserve-list.columns';
import { useReserveListStore } from './reserve-list.component.store';
import { schema } from './reserve-list.interface';

export default function ReserveListComponent() {
  const {
    state,
    formRef,
    currentRow,
    handleSearch,
    handleExport,
    tableAction,
    changeTablePageIndex,
    modalClose
  } = useReserveListStore();
  const { searchForm, tableData, total, isLoading, detailVisible } = state;
  function renderSelectItems() {
    return (
      <IFormComponent
        form={formRef}
        schema={schema}
        props={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          style: { width: '100%' }
        }}
      />
    );
  }
  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch(true)}>
          查询
        </Button>
        {/* <Button type="primary" className="ml20" onClick={handleExport}>
          导出
        </Button> */}
      </>
    );
  }
  function renderTable() {
    return (
      <ITableComponent
        columns={ReserveListColumns(tableAction)}
        isLoading={isLoading}
        rowKey={'id'}
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
    <React.Fragment>
      <ITablePageComponent
        pageName={'预约列表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
        selectItemsStyle={{
          flex: 1
        }}
      ></ITablePageComponent>
      {detailVisible && <ReserveDetailComponent visible={detailVisible} close={modalClose} data={currentRow.current} />}
    </React.Fragment>
  );
}
