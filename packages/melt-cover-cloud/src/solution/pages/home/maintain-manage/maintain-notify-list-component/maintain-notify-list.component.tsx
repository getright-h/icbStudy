import { Button } from 'antd';
import * as React from 'react';
import { ITableComponent, ITablePageComponent, IFormComponent } from '@fch/fch-shop-web';
import { demoColumns } from './demo-columns';
import style from './maintain-notify-list.component.less';
import { useMaintainNotifyListStore } from './maintain-notify-list.component.store';
import { schema } from './maintain-notify-list.interface';
import CalibrationComponent from './widget/calibration.component';
import FollowListComponent from './widget/followList.component';
import MaintainFollowComponent from './widget/maintain.follow.component';
import MaintainRegistrationComponent from './widget/maintain.registration.component';
import NotifyComponent from './widget/notify.component';
import NotifyListComponent from './widget/notifyList.component';

export default function MaintainNotifyListComponent() {
  const {
    state,
    form,
    handleSearch,
    tableAction,
    changeTablePageIndex,
    handleOk,
    handleCancel,
    formNotify,
    toggleModal,
    handleOkCalibration,
    handleCancelCalibration,
    formCalibration,
    formMaintainFollow,
    handleOkMaintainFollow,
    handleCancelMaintainFollow,
    formMaintainRegistration,
    handleOkMaintainRegistration,
    handleCancelMaintainRegistration,
    handleResetSearch,
    handleExportExcel,
    onSelectChange,
    changeTablePageNotifyListIndex,
    changeTablePageFollowListIndex
  } = useMaintainNotifyListStore();
  const { searchForm, tableData, total, isLoading } = state;
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
        <Button type="default" className="ml20" onClick={() => toggleModal('isVisibleModalNotify')}>
          批量提醒
        </Button>
        <Button
          type="primary"
          className="ml20"
          loading={isLoading}
          onClick={() => {
            handleSearch();
          }}
        >
          查询
        </Button>
        <Button
          type="primary"
          className="ml20"
          onClick={() => {
            handleResetSearch();
          }}
        >
          重置
        </Button>
        {/* <Button type="primary" className="ml20">
          导入
        </Button> */}
        <Button loading={state.isExportLoading} type="primary" className="ml20" onClick={handleExportExcel}>
          导出
        </Button>
        {/* <Button type="primary" className="ml20">
          导入模板
        </Button> */}
      </>
    );
  }

  function renderTable() {
    const rowSelection = {
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange
    };
    return (
      <ITableComponent
        rowSelection={rowSelection}
        columns={demoColumns(tableAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        rowKey={'vehicleId'}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  function renderOtherButtons() {
    return (
      <div className={style.otherButton}>
        <Button type="primary" loading={isLoading} onClick={() => handleSearch(1, 10, [1, 2])}>
          即将保养（{state.overTimeAccount}）
        </Button>
        <Button type="primary" loading={isLoading} className="ml20" onClick={() => handleSearch(1, 10, [3])}>
          逾期保养（{state.soonAccount}）
        </Button>
      </div>
    );
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        selectItemsStyle={{
          width: '60%'
        }}
        pageName={'保养管理/保养提醒'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      />
      <NotifyComponent
        title={'提醒设置'}
        visible={state.isVisibleModalNotify}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={formNotify}
        stateParent={state}
      />
      <CalibrationComponent
        title={state.title}
        visible={state.isVisibleModalCalibration}
        handleOk={handleOkCalibration}
        handleCancel={handleCancelCalibration}
        form={formCalibration}
        stateParent={state}
      />
      <MaintainFollowComponent
        title={'保养跟进'}
        visible={state.isVisibleModalMaintainFollow}
        handleOk={handleOkMaintainFollow}
        handleCancel={handleCancelMaintainFollow}
        form={formMaintainFollow}
        stateParent={state}
      />
      <MaintainRegistrationComponent
        title={'新增保养记录'}
        visible={state.isVisibleModalMaintainRegistration}
        handleOk={handleOkMaintainRegistration}
        handleCancel={handleCancelMaintainRegistration}
        form={formMaintainRegistration}
        stateParent={state}
      />
      <NotifyListComponent
        title={'保养提醒次数列表'}
        visible={state.isVisibleModalNotifyList}
        handleOk={() => toggleModal('isVisibleModalNotifyList')}
        handleCancel={() => toggleModal('isVisibleModalNotifyList')}
        stateParent={state}
        changeTablePageIndex={changeTablePageNotifyListIndex}
      />
      <FollowListComponent
        title={'保养跟进次数列表'}
        visible={state.isVisibleModalFollowList}
        handleOk={() => toggleModal('isVisibleModalFollowList')}
        handleCancel={() => toggleModal('isVisibleModalFollowList')}
        stateParent={state}
        changeTablePageIndex={changeTablePageFollowListIndex}
      />
    </div>
  );
}
