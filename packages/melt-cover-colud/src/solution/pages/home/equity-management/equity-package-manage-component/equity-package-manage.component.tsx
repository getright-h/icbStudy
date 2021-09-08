import { Button, Modal } from 'antd';
import * as React from 'react';
import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { StorageUtil } from '@fch/fch-tool';
import 'react-contexify/dist/ReactContexify.min.css';
import { demoColumns, equityColumns } from './demo-columns';
import style from './equity-package-manage.component.less';
import { useEquityPackageManageStore } from './equity-package-manage.component.store';
import { schema } from './equity-package-manage.interface';
import { Menu, Item, MenuProvider } from 'react-contexify';
import AddEquityModalComponent from './widget/addEquityModal';
import AddPackageModalComponent from './widget/addPackageModal';
import { EQUITY_ENUM } from '~/solution/shared/enums/home.enum';
import DetailPackageModalComponent from './widget/packageDetailModal';

const EquityPackageManageComponent = React.memo(() => {
  const {
    state,
    handleSearch,
    form,
    form1,
    form2,
    tableAction,
    changeTablePageIndex,
    toggleModal,
    handleOk,
    toggleModal2,
    handleOk2,
    handleContextMenuChange,
    handleAddEquity,
    handleDeleteEquity,
    handleResetSearch,
    handleAddEquityPackage,
    changeTablePageIndexEquity,
    handleFormChangeEvent,
    watch2
  } = useEquityPackageManageStore();
  let currentEquity: any = null;
  const { searchForm, tableData, total, isLoading, equityTitle } = state;
  const Role = JSON.parse(StorageUtil.getLocalStorage('userInfoRole'));
  const isBelonging = Role && Role.privilegesCode.length <= 0;
  const renderSelectItems = () => {
    return (
      <>
        <IFormComponent
          form={form}
          schema={schema}
          props={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }}
        ></IFormComponent>
      </>
    );
  };
  function renderSearchButtons() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          className="ml20"
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
        <Button type="primary" className="ml20" onClick={handleAddEquityPackage}>
          创建套餐包
        </Button>
      </React.Fragment>
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
  function renderPageLeft() {
    return (
      <div className={style.addEquity}>
        <h3>
          <span>权益管理</span>
          <span onClick={handleAddEquity}>添加权益</span>
        </h3>
        <MenuProvider
          id="menu_id"
          onContextMenu={(event: any) => {
            event.preventDefault();
            event.persist();
            console.log(1);
          }}
        >
          <ITableComponent
            columns={equityColumns(tableAction, isBelonging)}
            isLoading={state.isLoadingEquity}
            pageIndex={state.searchFormEquity.index}
            pageSize={state.searchFormEquity.size}
            data={state.tableDataEquityList}
            total={state.totalEquity}
            isPagination={true}
            onRow={record => {
              return {
                onDoubleClick: event => {
                  currentEquity = record;
                },
                onContextMenu: (event: any) => {
                  console.log(11111, record);
                  currentEquity = record;
                  if (!currentEquity.isEdit) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              };
            }}
            changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndexEquity(index, pageSize)}
          ></ITableComponent>
        </MenuProvider>
        <MyAwesomeMenu />
      </div>
    );
  }

  const handleContextMenuDel = () => {
    if (currentEquity.status == EQUITY_ENUM.Enable) {
      Modal.confirm({
        title: '操作提示',
        content: '该权益已被使用，暂时无法删除'
      });
      return;
    }
    Modal.confirm({
      title: '操作提示',
      content: '请确定删除该权益',
      onOk: () => {
        handleDeleteEquity(currentEquity);
      }
    });
  };

  const onConTextClick = (type: string) => {
    if (type === 'del') {
      handleContextMenuDel();
    } else if (type === 'change') {
      handleContextMenuChange(currentEquity);
    }
  };
  function MyAwesomeMenu() {
    console.log(isBelonging, currentEquity);
    const disabled = !isBelonging && currentEquity?.belonging == 1;
    console.log(disabled);

    return (
      <Menu id="menu_id">
        <Item
          disabled={disabled}
          onClick={() => {
            if (!currentEquity.isEdit) {
              return;
            }
            onConTextClick('change');
          }}
        >
          <span className={!state.isBelonging && state.currentEquity?.belonging == 1 ? style.disable : ''}>
            修改权益
          </span>
        </Item>
        <Item
          disabled={disabled}
          onClick={() => {
            if (!isBelonging && currentEquity?.belonging == 1) {
              return;
            }
            onConTextClick('del');
          }}
        >
          <span className={!state.isBelonging && state.currentEquity?.belonging == 1 ? style.disable : ''}>
            删除权益
          </span>
        </Item>
      </Menu>
    );
  }
  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        isFlex={true}
        pageLeft={renderPageLeft()}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
      <AddEquityModalComponent
        title={equityTitle}
        visible={state.visible}
        handleCancel={toggleModal}
        handleOk={handleOk}
        form={form1}
        stateParent={state}
      />
      <AddPackageModalComponent
        stateParent={state}
        title={state.equityPackageTitle}
        visible={state.equityPackageTitle != '详情' && state.visibleAddPackage}
        handleCancel={toggleModal2}
        handleOk={handleOk2}
        form={form2}
        handleFormChangeEvent={handleFormChangeEvent}
        watch2={watch2}
      />
      <DetailPackageModalComponent
        stateParent={state}
        title={state.equityPackageTitle}
        visible={state.equityPackageTitle == '详情' && state.visibleAddPackage}
        handleCancel={toggleModal2}
        handleOk={handleOk2}
        form={form2}
        handleFormChangeEvent={handleFormChangeEvent}
      />
    </div>
  );
});

export default EquityPackageManageComponent;
