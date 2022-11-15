import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button, Modal } from 'antd';
import * as React from 'react';
import { demoColumns } from './demo-columns';
import style from './fund-account-setting.component.less';
import { useFundAccountSettingStore } from './fund-account-setting.component.store';

import { schema } from './fund-account-setting.interface';
import AddEquityModalComponent from './widget/addEquityModal';
import AddPackageModalComponent from './widget/addPackageModal';
import DetailPackageModalComponent from './widget/packageDetailModal';

export default function FundAccountSettingComponent() {
  const {
    state,
    formRef,
    form2,
    form3,
    handleSearch,
    toggleModalCreat,
    toggleModalEdit,
    saveEdit,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount
  } = useFundAccountSettingStore();

  const { isLoading, total, tableData, searchForm } = state;

  // 渲染选择框函数
  function renderSelectItems() {
    return (
      <IFormComponent form={formRef} schema={schema} props={{ labelCol: { span: 6 }, wrapperCol: { span: 18 } }} />
    );
  }

  // 渲染搜索框
  function renderSearchButtons() {
    return (
      <>
        <Button type="primary" className="ml20" onClick={() => handleSearch()}>
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={() => toggleModalCreat()}>
          创建账户
        </Button>
        <Button type="primary" className="ml20" onClick={() => exportExcel()}>
          导出
        </Button>
      </>
    );
  }

  // 渲染表单体
  function renderTable() {
    return (
      <>
        <ITableComponent
          columns={demoColumns(tableAction)}
          isLoading={isLoading}
          data={tableData}
          total={total}
          pageIndex={searchForm.index}
          pageSize={searchForm.size}
          isPagination={true}
          changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
        ></ITableComponent>
      </>
    );
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'资金账户管理/资金账户设置'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>

      {/* 创建账户 */}
      <AddEquityModalComponent
        stateParent={state}
        title={'创建账户'}
        visible={state.visibleCreat}
        handleCancel={toggleModalCreat}
        handleOk={creatFundAccount}
        form={form3}
      />

      {/* 编辑框 */}
      <AddPackageModalComponent
        stateParent={state}
        title={'编辑框'}
        visible={state.visibleEdit}
        handleCancel={toggleModalEdit}
        handleOk={saveEdit}
        form={form2}
      />
    </div>
  );
}
