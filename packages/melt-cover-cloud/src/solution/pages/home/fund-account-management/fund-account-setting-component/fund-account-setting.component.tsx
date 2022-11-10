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
    watch2,
    handleSearch,
    toggleModalCreat,
    toggleModalEdit,
    saveEdit,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    handleFormChangeEvent
  } = useFundAccountSettingStore();

  const { visibleEdit, visibleCreat } = state;

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
          isLoading={false}
          pageIndex={1}
          pageSize={10}
          data={[]}
          total={0}
          // isLoading={isLoading}
          // pageIndex={searchForm.index}
          // pageSize={searchForm.size}
          // data={tableData}
          // total={total}
          isPagination={true}
          changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
        ></ITableComponent>
        {/* <AddEquityModalComponent
          visible={false}
          title={'创建账户'}
          // visible={visibleCreat}
          handleCancel={() => toggleModalCreat()}
          handleOk={() => creatFundAccount()}
          form={form2}
          // title={equityTitle}
          // visible={state.visible}
          // handleCancel={toggleModal}
          // handleOk={handleOk}
          // form={form1}
          stateParent={state}
        /> */}
      </>
    );
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'资金账户管理/资金账户设置'}
        // pageLeft={renderPageLeft()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        // otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></ITablePageComponent>

      {/* 新增权益 */}
      <AddEquityModalComponent
        stateParent={state}
        title={'创建账户'}
        // title={state.equityPackageTitle}
        visible={state.visibleCreat}
        // visible={state.equityPackageTitle != '详情' && state.visibleAddPackage}
        handleCancel={toggleModalCreat}
        handleOk={creatFundAccount}
        form={form2}
      />
      <button onClick={() => toggleModalEdit()}>1</button>
      <button onClick={() => tableAction('', '交易明细')}>2</button>

      {/* 编辑框 */}
      <AddPackageModalComponent
        stateParent={state}
        title={'编辑框'}
        visible={state.visibleEdit}
        handleCancel={toggleModalEdit}
        handleOk={saveEdit}
        form={form2}
        handleFormChangeEvent={handleFormChangeEvent}
        watch2={watch2}
      />
    </div>
  );
}
