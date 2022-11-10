import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button, Modal } from 'antd';
import * as React from 'react';
import { demoColumns } from './demo-columns';
import style from './recharge-funds.component.less';
import { useRechargeFundsStore } from './recharge-funds.component.store';

import { schema } from './recharge-funds.interface';
import AddEquityModalComponent from './widget/addEquityModal';
import AddPackageModalComponent from './widget/addPackageModal';
import AddPackageModalComponent2 from './widget/addPackageModal2';
import DetailPackageModalComponent from './widget/packageDetailModal';

export default function RechargeFundsComponent() {
  const {
    state,
    formRef,
    form2,
    form3,
    watch2,
    handleSearch,
    toggleModalCreat,
    toggleModalAudit,
    toggleModalEditCharge,
    saveAudit,
    saveEditCharge,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    creatFundAccount,
    handleFormChangeEvent,
    handleFormChangeEvent2
  } = useRechargeFundsStore();

  const { visibleAudit, visibleCreat } = state;

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
          账户充值
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
      </>
    );
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'资金账户管理/资金账户充值'}
        // pageLeft={renderPageLeft()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        // otherSearchBtns={renderOtherButtons()}
        table={renderTable()}
      ></ITablePageComponent>

      {/* 修改充值 */}
      <AddPackageModalComponent2
        stateParent={state}
        title={'修改充值'}
        visible={state.visibleEditAudit}
        handleCancel={toggleModalEditCharge}
        handleOk={saveEditCharge}
        form={form3}
        handleFormChangeEvent={handleFormChangeEvent2}
        watch2={watch2}
      />

      {/* 账户充值 */}
      <AddEquityModalComponent
        stateParent={state}
        title={'充值'}
        // title={state.equityPackageTitle}
        visible={state.visibleCreat}
        // visible={state.equityPackageTitle != '详情' && state.visibleAddPackage}
        handleCancel={toggleModalCreat}
        handleOk={creatFundAccount}
        form={form2}
      />
      <button onClick={() => toggleModalAudit()}>充值审核</button>
      <button onClick={() => tableAction('', '修改充值')}>修改充值</button>
      <button onClick={() => tableAction('', '详情')}>详情</button>

      {/* 充值审核信息 */}
      <AddPackageModalComponent
        stateParent={state}
        title={'充值审核信息'}
        visible={state.visibleAudit}
        handleCancel={toggleModalAudit}
        handleOk={saveAudit}
        form={form2}
        handleFormChangeEvent={handleFormChangeEvent}
        watch2={watch2}
      />
    </div>
  );
}
