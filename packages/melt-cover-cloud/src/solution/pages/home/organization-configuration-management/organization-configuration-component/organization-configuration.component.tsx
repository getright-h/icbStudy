import { Button } from 'antd';
import * as React from 'react';
import { IFormComponent, ITablePageComponent } from '@fch/fch-shop-web';
import 'react-contexify/dist/ReactContexify.min.css';
import style from './organization-configuration.module.less';
import { useOrganizationConfigStore } from './organization-configuration.component.store';
import ConfigModalComponent from './widget/config-modal/config-modal.component';
import { SelectOrganizationList } from '../select-organization-list/select-organization-list.component';
import { ITablePlus } from '~/framework/components/component.module';
import { Columns } from './organization-configuration.columns';
import { schema } from './organization-configuration.interface';

const OrganizationConfigurationComponent = React.memo(() => {
  const { modalState, modalClose, action, table, form, getRightList } = useOrganizationConfigStore();
  const { tableActions, getTableData } = table;
  const { settingVisible, modalData } = modalState;
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
        <Button type="primary" className="ml20" onClick={tableActions.searchClick}>
          查询
        </Button>
      </React.Fragment>
    );
  }
  function renderTable() {
    return <ITablePlus table={table} columns={Columns(action)} />;
  }

  return (
    <div className={style.test}>
      <ITablePageComponent
        leftFlex={1}
        rightFlex={5}
        isFlex={true}
        pageLeft={<SelectOrganizationList selectEvent={getRightList} />}
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={renderTable()}
      ></ITablePageComponent>
      {/* 配置信息*/}
      <ConfigModalComponent
        initData={modalData}
        visible={settingVisible}
        close={modalClose('settingVisible', getTableData)}
      />
    </div>
  );
});

export default OrganizationConfigurationComponent;
