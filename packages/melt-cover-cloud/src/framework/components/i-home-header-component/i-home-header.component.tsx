import * as React from 'react';
import { useHomeHeaderStore } from './i-home-header.component.store';
import { HomeOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Popover, Select } from 'antd';
import style from './i-home-header.component.less';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TYPES } from '~/solution/context/global/store/global.type';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { IEditPasswordComponent } from '~/framework/components/component.module';
// import { StorageUtil } from '@fch/fch-tool';
import { StorageUtil } from '~/framework/util/storage';

export function IHomeHeaderComponent() {
  const { state, logout, changePwd, popClose } = useHomeHeaderStore();
  const { dispatch, gState }: IGlobalState = React.useContext(GlobalContext);
  const userInfo = JSON.parse(StorageUtil.getLocalStorage('userInfo'));
  const userRoleInfo = JSON.parse(StorageUtil.getLocalStorage('userInfoRole'));
  const orgs = userRoleInfo.organizationIds;
  const showSelect = orgs?.length > 1;
  const currentOrgId = StorageUtil.getLocalStorage('currentOrgId') || orgs?.[0]?.organizationId;
  function renderActionContent() {
    return (
      <div className="actions">
        <a onClick={logout} className="a-link">
          注销
        </a>
        <p></p>
        {/* <a onClick={changePwd} className="a-link">
          修改密码
        </a> */}
        <IEditPasswordComponent visible={state.passwordVisible} userId={null} close={popClose} />
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.headerLeft}>
            <div className={style.logoContainer}>
              <div className={style.foldIcon} onClick={() => dispatch({ type: TYPES.SET_COLLAPSED })}>
                {React.createElement(gState.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                {/* <Icon className={style.trigger} type={gState.collapsed ? 'menu-unfold' : 'menu-fold'} /> */}
              </div>
              <div className={style.headerLogo}>
                {/* <img src={logo} /> */}
                <span>{process.env.SITE_TITLE}</span>
              </div>
            </div>
          </div>
          <div className={style.headerRight}>
            {!showSelect && <span>{orgs?.[0]?.organizationName}</span>}
            {showSelect && (
              <Select
                defaultValue={currentOrgId}
                className={style.options}
                onChange={val => {
                  StorageUtil.setLocalStorage('currentOrgId', val);
                }}
              >
                {orgs?.map((item: any) => {
                  return (
                    <Select.Option key={item.organizationId} value={item.organizationId}>
                      {item.organizationName}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
            <Popover className="ml20" content={renderActionContent()} placement="bottom">
              <HomeOutlined />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
