import { IFormComponent, ITableComponent, ITablePageComponent } from '@fch/fch-shop-web';
import { Button } from 'antd';
import * as React from 'react';
import { MenuProvider } from 'react-contexify';
import { demoColumns, orgConfigColumns } from './demo-columns';
import style from './organization-configuration.component.less';
import { useOrganizationConfigurationStore } from './organization-configuration.component.store';
import { schema } from './organization-configuration.interface';

export default function OrganizationConfigurationComponent() {
  const {
    state,
    changeTablePageLeft,
    form1,
    handleSearch,
    tableAction,
    changeTablePageMain
  } = useOrganizationConfigurationStore();

  // 左侧列表
  function renderPageLeft() {
    return (
      <div>
        <h3>
          <span>渠道列表</span>
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
            columns={orgConfigColumns(tableAction, true)}
            // columns={equityColumns(tableAction, isBelonging)}
            isLoading={false}
            // isLoading={state.isLoadingEquity}
            pageIndex={1}
            // pageIndex={state.searchFormEquity.index}
            pageSize={10}
            // pageSize={state.searchFormEquity.size}
            data={[]}
            // data={state.tableDataEquityList}
            total={10}
            // total={state.totalEquity}
            isPagination={true}
            /* onRow={record => {
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
            }} */
            changeTablePageIndex={(index: number, pageSize: number) => changeTablePageLeft(index, pageSize)}
          ></ITableComponent>
        </MenuProvider>
        {/* <MyAwesomeMenu /> */}
      </div>
    );
  }

  // 主体列表
  function renderTable() {
    return (
      <ITableComponent
        columns={demoColumns(tableAction)}
        isLoading={true}
        // isLoading={isLoading}
        pageIndex={1}
        // pageIndex={searchForm.index}
        pageSize={10}
        // pageSize={searchForm.size}
        data={[]}
        // data={tableData}
        total={5}
        // total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageMain(index, pageSize)}
      ></ITableComponent>
    );
  }

  // 搜索框
  const renderSelectItems = () => {
    return (
      <>
        <IFormComponent
          form={form1}
          // form={form}
          schema={schema}
          props={{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }}
        ></IFormComponent>
      </>
    );
  };

  // 查询按钮
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
      </React.Fragment>
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
    </div>
  );
}
