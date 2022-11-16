import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button } from 'antd';
import * as React from 'react';
import { demoColumns } from './demo-columns';
import style from './recharge-funds.component.less';
import { useRechargeFundsStore } from './recharge-funds.component.store';

import { schema } from './recharge-funds.interface';
import AddEquityModalComponent from './widget/addEquityModal';
import AddPackageModalComponent from './widget/addPackageModal';
import AddPackageModalComponent2 from './widget/addPackageModal2';
import AddPackageModalComponent3 from './widget/addPackageModal3';

export default function RechargeFundsComponent() {
  const {
    state,
    formRef,
    form2,
    form3,
    form4,
    form5,
    handleSearch,
    toggleModalRecharge,
    toggleModalAudit,
    toggleModalDetail,
    toggleModalEditCharge,
    saveAudit,
    saveEditCharge,
    exportExcel,
    tableAction,
    changeTablePageIndex,
    recharge
  } = useRechargeFundsStore();

  const { tableData, total, isLoading, searchForm } = state;

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
        <Button type="primary" className="ml20" onClick={() => toggleModalRecharge()}>
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
          isLoading={isLoading}
          pageIndex={searchForm.index}
          pageSize={searchForm.size}
          data={tableData}
          total={total}
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
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
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
      />
      {/* action 详情 */}
      <AddPackageModalComponent3
        stateParent={state}
        title={'详情'}
        visible={state.visibleDetail}
        handleCancel={toggleModalDetail}
        form={form5}
      />

      {/* 账户充值 */}
      <AddEquityModalComponent
        stateParent={state}
        title={'充值'}
        visible={state.visibleCreat}
        handleCancel={toggleModalRecharge}
        handleOk={recharge}
        form={form2}
      />
      {/* 充值审核信息 */}
      <AddPackageModalComponent
        stateParent={state}
        title={'充值审核信息'}
        visible={state.visibleAudit}
        handleCancel={toggleModalAudit}
        handleOk={saveAudit}
        form={form4}
      />
    </div>
  );
}
