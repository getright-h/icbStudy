import { hot } from 'react-hot-loader';
import * as React from 'react';
import { ConfigProvider, message, Modal, notification } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { FchMessage, FchModal, FchNotification, FchProvider } from '@fch/fch-shop-web';
import { useGlobalContext } from '~/solution/context/global/global.provider';
import MainReducer from '~/solution/context/redux/reducer/index';
import { RoutesService } from '~/framework/util/routes/routes.service';
import { ChildrenObject } from '~/framework/microAPP/microAppModal';

moment.locale('zh-cn');

const App = (props: { routers: Array<ChildrenObject> }) => {
  const { routers } = props;
  // 项目内部用的hooks provicer
  const { GlobalProvider } = useGlobalContext();
  // 主项目用的store 主要用来接收子应用传来的信息
  const store = createStore(MainReducer);
  // ConfigProvider.config({
  //   prefixCls: 'RongBaoYun'
  // });
  //
  message.config({
    prefixCls: 'RongBaoYun-message'
  });
  Modal.config({
    rootPrefixCls: 'RongBaoYun'
  });
  notification.config({
    prefixCls: 'RongBaoYun-notification'
  });
  FchMessage.config({
    prefixCls: 'RongBaoYun-message'
  });
  FchModal.config({
    rootPrefixCls: 'RongBaoYun'
  });
  FchNotification.config({
    prefixCls: 'RongBaoYun-notification'
  });
  const zh_CN: any = zhCN;
  return (
    <ConfigProvider locale={zhCN} prefixCls={'RongBaoYun'}>
      <FchProvider locale={zh_CN} prefixCls={'RongBaoYun'}>
        <Provider store={store}>
          <GlobalProvider>
            <HashRouter>{RoutesService.renderRoutes(routers, false)}</HashRouter>
          </GlobalProvider>
        </Provider>
      </FchProvider>
    </ConfigProvider>
  );
};

export default hot(module)(App);
