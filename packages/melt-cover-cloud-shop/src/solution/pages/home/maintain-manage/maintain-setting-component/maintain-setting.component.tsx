import * as React from 'react';
import { Button } from 'antd';
import { ITableComponent, ITablePageComponent, IFormComponent } from '@fch/fch-shop-web';
import { useMaintainSettingStore } from './maintain-setting.component.store';
import { schema } from './maintain-setting.interface';
import { demoColumns } from './demo-columns';
import DetailComponent from './widget/detail.component';
import style from './maintain-setting.module.less';

export default function MaintainSettingComponent() {
  const {
    state,
    form,
    formDetail,
    maintainData,
    isLoading,
    insertLoading,
    editLoading,
    delLoading,
    tempMaintainData,
    tempLoading,
    batchLoading,
    currRow,
    changeTablePageIndex,
    changeRulesTablePageIndex,
    tableAction,
    handleCancel,
    handleSubmit,
    handleSearch,
    addMaintainConfig,
    delConfirm,
    delCancel,
    onSelectChange,
    getSearch,
    searchTemplate,
    enableRule
  } = useMaintainSettingStore();

  function renderSelectItems() {
    return (
      <IFormComponent
        className={style.formStyle}
        form={form}
        // watch={watch}
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
        <Button
          className="ml20"
          onClick={() => {
            window.location.hash = '/home/maintain/maintainSetting?source=007';
          }}
        >
          启用平台保养规则
        </Button>
        <Button type="primary" className="ml20" onClick={handleSearch}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={addMaintainConfig}>
          新增
        </Button>
      </>
    );
  }

  function renderRuleBtn() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={searchTemplate}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={enableRule} loading={batchLoading}>
          启用规则
        </Button>
      </>
    );
  }

  // 渲染主页面table
  function renderMainTable() {
    return (
      <ITableComponent
        columns={demoColumns(false, tableAction, delLoading, { delConfirm, delCancel })}
        isLoading={isLoading}
        pageIndex={maintainData.index}
        pageSize={maintainData.size}
        data={maintainData.tableData}
        total={maintainData.total}
        isPagination={true}
        changeTablePageIndex={(index: number, size: number) => changeTablePageIndex(index, size)}
      ></ITableComponent>
    );
  }
  // 渲染启用规则页面table
  function renderRuleTable() {
    const rowSelection = {
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange
    };
    return (
      <ITableComponent
        rowSelection={rowSelection}
        columns={demoColumns(true)}
        isLoading={tempLoading}
        pageIndex={tempMaintainData.index}
        pageSize={tempMaintainData.size}
        data={tempMaintainData.tableData}
        total={tempMaintainData.total}
        isPagination={true}
        changeTablePageIndex={(index: number, size: number) => changeRulesTablePageIndex(index, size)}
      ></ITableComponent>
    );
  }

  return getSearch() ? (
    <React.Fragment>
      <ITablePageComponent
        selectItemsStyle={{ width: '70%' }}
        pageName="平台保养规则模板"
        selectItems={renderSelectItems()}
        searchButton={renderRuleBtn()}
        table={renderRuleTable()}
      ></ITablePageComponent>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <ITablePageComponent
        selectItemsStyle={{ width: '70%' }}
        pageName="保养设置"
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderMainTable()}
      ></ITablePageComponent>
      <DetailComponent
        title={'设置'}
        visible={state.isVisibleModalDetail}
        handleOk={() => handleSubmit(formDetail, currRow)}
        handleCancel={() => handleCancel(currRow)}
        form={formDetail}
        isLoading={insertLoading || editLoading}
      />
    </React.Fragment>
  );
}
