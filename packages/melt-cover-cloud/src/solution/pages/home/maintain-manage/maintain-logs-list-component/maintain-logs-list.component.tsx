import { Button } from 'antd';
import * as React from 'react';
import { ITableComponent, ITablePageComponent, IFormComponent } from '@fch/fch-shop-web';
import { demoColumns } from './demo-columns';
import style from './maintain-logs-list.component.less';
import { useMaintainLogsListStore } from './maintain-logs-list.component.store';
import { schema } from './maintain-logs-list.interface';
import MaintainRegistrationComponent from './widget/maintain.registration.component';

export default function MaintainLogsListComponent() {
  const {
    state,
    form,
    tableAction,
    changeTablePageIndex,
    handleSearch,
    handleExportExcel,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    formMaintainRegistration,
    handleAdd,
    watch
  } = useMaintainLogsListStore();
  const { searchForm, tableData, total, isLoading, isExportLoading } = state;
  function renderSelectItems() {
    return (
      <IFormComponent
        className={style.formStyle}
        form={form}
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
        <Button
          type="primary"
          className="ml20"
          onClick={() => {
            handleSearch();
          }}
          loading={isLoading}
        >
          查询
        </Button>
        <Button type="primary" className="ml20" loading={isExportLoading} onClick={handleExportExcel}>
          导出
        </Button>
        <Button type="primary" className="ml20" onClick={handleAdd}>
          新增保养记录
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
        selectItemsStyle={{
          width: '60%'
        }}
        pageName={'保养管理/保养记录列表'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      />
      <MaintainRegistrationComponent
        watch={watch}
        title={'新增保养记录'}
        visible={state.isVisibleModalMaintainRegistration}
        handleOk={handleOkMaintainRegistration}
        handleCancel={handleCancelMaintainRegistration}
        form={formMaintainRegistration}
        stateParent={state}
      />
    </div>
  );
}
