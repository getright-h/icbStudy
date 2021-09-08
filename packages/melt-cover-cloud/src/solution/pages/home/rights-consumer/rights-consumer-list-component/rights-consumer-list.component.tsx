import * as React from 'react';
import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import style from './rights-consumer-list.component.less';
import { useRightsConsumerListStore } from './rights-consumer-list.component.store';
import { Button } from 'antd';
import { demoColumns } from './rights-consumer-colomns';
import { schema } from './rights-consumer-list.interface';
import VerificationCodeComponent from '../widget/verification-code.component';
import DetailComponent from '../widget/detail.component';

export default function RightsConsumerListComponent() {
  const {
    state,
    handleSearch,
    formRef,
    addOrder,
    tableAction,
    changeTablePageIndex,
    exportExcel,
    toggleModal,
    toggleModal2,
    refForm,
    handleOk
  } = useRightsConsumerListStore();
  const { searchForm, tableData, total, isLoading } = state;
  function renderSelectItems() {
    return <IFormComponent form={formRef} schema={schema}></IFormComponent>;
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
        >
          查询
        </Button>
        <Button type="primary" className="ml20" onClick={addOrder}>
          核销码核销
        </Button>
        <Button type="primary" className="ml20" onClick={exportExcel}>
          导出
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
        leftFlex={1}
        rightFlex={5}
        pageName={'权益消费'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
      <VerificationCodeComponent
        title={'核销'}
        visible={state.visible}
        handleCancel={toggleModal}
        handleOk={handleOk}
        refForm={refForm}
      />
      <DetailComponent title={'详情'} visible={state.visibleDetail} handleCancel={toggleModal2} detail={state.detail} />
    </div>
  );
}
