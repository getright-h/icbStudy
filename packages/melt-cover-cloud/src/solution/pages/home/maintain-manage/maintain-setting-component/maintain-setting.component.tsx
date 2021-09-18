import { Button } from 'antd';
import * as React from 'react';
import style from './maintain-setting.module.less';
import { useMaintainSettingStore } from './maintain-setting.component.store';
import { ITableComponent, ITablePageComponent, IFormComponent } from '@fch/fch-shop-web';
import { schema } from './maintain-setting.interface';
import { demoColumns } from './demo-columns';
import DetailComponent from './widget/detail.component';

export default function MaintainSettingComponent() {
  const {
    state,
    form,
    formDetail,
    changeTablePageIndex,
    tableAction,
    handleCancel,
    handleSubmit,
    handleSearch,
    addMaintainConfig,
    delConfirm,
    delCancel
  } = useMaintainSettingStore();
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
      />
    );
  }

  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch(1, searchForm.size, true)}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={addMaintainConfig}>
          新增
        </Button>
      </>
    );
  }

  function renderTable() {
    return (
      <ITableComponent
        columns={demoColumns(tableAction, { delConfirm, delCancel })}
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
        selectItemsStyle={{ width: '70%' }}
        pageName="保养设置"
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
      <DetailComponent
        title={'设置'}
        visible={state.isVisibleModalDetail}
        handleOk={() => handleSubmit(formDetail, state.currRow)}
        handleCancel={() => handleCancel(state.currRow)}
        form={formDetail}
        stateParent={state}
      />
    </React.Fragment>
  );
}
