import * as React from 'react';
import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button } from 'antd';
import { useReserveSettingsStore } from './reserve-settings.component.store';
import { ReserveSettingsColumns } from './reserve-settings.columns';
import { schema } from './reserve-settings.interface';
import EditReserveSettingComponent from './edit-reserve-setting-component/edit-reserve-setting.component';

export default function ReserveSettingsComponent() {
  const {
    state,
    formRef,
    currentRow,
    handleSearch,
    handleExport,
    addReserveSetting,
    tableAction,
    changeTablePageIndex,
    modalClose
  } = useReserveSettingsStore();
  const { searchForm, tableData, total, isLoading, isSettingVisible } = state;
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
        <Button type="primary" className="ml20" onClick={addReserveSetting}>
          添加预约设置
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
        columns={ReserveSettingsColumns(tableAction)}
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
    <React.Fragment>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'预约设置'}
        selectItems={renderSelectItems()}
        selectItemsStyle={{ minWidth: '900px' }}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
      {isSettingVisible && (
        <EditReserveSettingComponent visible={isSettingVisible} close={modalClose} initData={currentRow.current} />
      )}
    </React.Fragment>
  );
}
