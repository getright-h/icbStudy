import { Button } from 'antd';
import * as React from 'react';
import { IFormComponent, ITablePageComponent } from '@fch/fch-shop-web';
import 'react-contexify/dist/ReactContexify.min.css';
import style from './order-limit-setting.module.less';
import { useOrderLimitSettingStore } from './order-limit-setting.component.store';
import { schema } from './order-limit-setting.interface';
import { SelectOrganizationList } from '../select-organization-list/select-organization-list.component';
import { ITablePlus } from '~/framework/components/component.module';
import { Columns } from './order-limit-setting.columns';
import SetOrderLimitComponent from './widget/set-order-limit/set-order-limit.component';
import LogPageComponent from './widget/log-page/log-page.interface.component';

const OrderLimitSettingComponent = React.memo(() => {
  const { modalState, modalClose, action, table, form, getRightList } = useOrderLimitSettingStore();
  const { tableActions, getTableData } = table;
  const { settingVisible, modalData, logVisible } = modalState;
  /** 检测是否非经销商 */
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
      {/* 设置额度 */}
      <SetOrderLimitComponent
        initData={modalData}
        visible={settingVisible}
        close={modalClose('settingVisible', getTableData)}
      />
      {/* 日志 */}
      <LogPageComponent visible={logVisible} close={modalClose('logVisible')} initData={modalData} />
    </div>
  );
});

export default OrderLimitSettingComponent;
