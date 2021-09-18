import { Button } from 'antd';
import * as React from 'react';
import { ITableComponent, ITablePageComponent, IFormComponent } from '@fch/fch-shop-web';
import { demoColumns } from './demo-columns';
import { useMaintainLogsListStore } from './maintain-logs-list.component.store';
import { schema } from './maintain-logs-list.interface';
import MaintainRegistrationComponent from './widget/maintain.registration.component';
import CalibrationComponent from './widget/calibration.component';
import style from './maintain-logs-list.module.less';

export default function MaintainLogsListComponent() {
  const {
    state,
    form,
    maintainLogData,
    isLoading,
    exportLoading,
    recordLoading,
    changeTablePageIndex,
    handleSearch,
    handleExportExcel,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    formMaintainRegistration,
    formCalibration,
    handleAdd,
    watch,
    insertLoading,
    handleCancelCalibration,
    insertItem
  } = useMaintainLogsListStore();
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
        <Button type="primary" className="ml20" loading={exportLoading} onClick={handleExportExcel}>
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
        columns={demoColumns()}
        isLoading={isLoading}
        pageIndex={maintainLogData.index}
        pageSize={maintainLogData.size}
        data={maintainLogData.tableData}
        total={maintainLogData.total}
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
        isLoading={recordLoading}
      />
      <CalibrationComponent
        title={'新增保养项目'}
        visible={state.isVisibleModalCalibration}
        handleOk={insertItem}
        handleCancel={handleCancelCalibration}
        form={formCalibration}
        isLoading={insertLoading}
      />
    </div>
  );
}
