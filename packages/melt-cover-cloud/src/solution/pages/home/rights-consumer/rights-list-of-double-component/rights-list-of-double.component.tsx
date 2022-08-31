import * as React from 'react';
import { Button, Modal } from 'antd';
import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import VerificationCodeComponent from '../widget/verification-code.component';
import DetailOfDoubleComponent from '../widget/detail-of-double.component';
import ImageOfDetailComponent from '../widget/image-of-detail.component';
import { useRightsListOfDoubleStore } from './rights-list-of-double.component.store';
import { schema, schemaAudit } from './rights-list-of-double.interface';
import { demoColumns } from './rights-of-double-columns';
import style from './rights-list-of-double.module.less';

export default function RightsListOfDoubleComponent() {
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
    handleOk,
    imageForm,
    handleUpload,
    auditForm,
    handleButton,
    handleToggleModal,
    handleAudit
  } = useRightsListOfDoubleStore();

  const {
    searchForm,
    tableData,
    total,
    isLoading,
    detail,
    uploadVisible,
    currModalType,
    auditVisible,
    isEdit,
    auditLoading,
    uploadLoading
  } = state;
  function renderSelectItems() {
    return <IFormComponent form={formRef} schema={schema} />;
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
      />
    );
  }
  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        pageName={'双保权益消费'}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      />
      <VerificationCodeComponent
        title={'核销'}
        visible={state.visible}
        handleCancel={toggleModal}
        handleOk={handleOk}
        refForm={refForm}
      />
      <DetailOfDoubleComponent
        titleType={currModalType}
        visible={state.visibleDetail}
        handleCancel={toggleModal2}
        detail={state.detail}
        auditLoading={auditLoading}
        handleRefuse={handleButton}
        handleAudit={handleAudit}
      />
      <Modal
        title="维修凭证上传"
        visible={uploadVisible}
        width={700}
        confirmLoading={uploadLoading}
        destroyOnClose={true}
        onOk={handleUpload}
        onCancel={() => handleToggleModal('uploadVisible')}
      >
        <ImageOfDetailComponent imageForm={imageForm} detail={detail} isEdit={isEdit} />
      </Modal>
      <Modal
        title="审核拒绝"
        centered
        width={500}
        zIndex={2000}
        visible={auditVisible}
        confirmLoading={auditLoading}
        onCancel={() => handleButton('auditVisible')}
        onOk={() => handleAudit('refuse')}
      >
        <IFormComponent form={auditForm} schema={schemaAudit} />
      </Modal>
    </div>
  );
}
