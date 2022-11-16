import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore, StorageUtil } from '@fch/fch-tool';
import { IHomeProps } from './home.interface';
import { useEffect, useRef } from 'react';
import { MenuListService } from '~/framework/aop/strategy/menuListService';
import { useHistory, useLocation } from 'react-router-dom';
import { HistoryService } from '~/framework/util/routes/history.service';
export function useHomeStore() {
  const { state, setStateWrap } = useStateStore(new IHomeProps());
  const menuListService: MenuListService = useService(MenuListService);
  const menuService: MenuService = useService(MenuService);
  const history = useHistory();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   getMenuList();
  // return () => {
  //   menuAndAuthSubscription.unsubscribe();
  // };
  // }, []);

  useEffect(() => {
    if (StorageUtil.getLocalStorage('TOKENINFO')) {
      getMenuList();
    } else {
      logout();
    }
  }, [pathname]);

  async function getMenuList() {
    try {
      const res = await menuListService.getMenuList().toPromise();
      // console.log('menuListService =>>>>>>>>>>>>>>>>>>>>>>>>', menuListService);

      const menuList = menuService.updateMenuByRoutes(res?.menuList);
      if (menuList) {
        setStateWrap({ menuList, loading: false });
        if (history.location.pathname == '/home') {
          parseFirstLeafPath(menuList);
        } else if (history.location.pathname !== '/home/index') {
          const canActive = judgeInMenu(menuList, history.location.pathname);
          !canActive && history.replace('/home/index');
        }
      }
    } catch (error) {
      // ShowNotification.error(error);
      console.error(error);
      // StorageUtil.removeLocalStorage('token');
      // history.replace('/login');
      // location.reload();
    }
  }

  // 默认跳转菜单中第一个页面
  function judgeInMenu(arr: any[], urlPath: string) {
    let isValidPath = false;
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!isValidPath) {
          if (!node.children.length) {
            if (urlPath.includes(node.path)) {
              isValidPath = true;
            } else {
              isValidPath = true;
            }
          } else {
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    return isValidPath;
  }

  // 默认跳转菜单中第一个页面
  function parseFirstLeafPath(arr: any[]) {
    let isValidPath = false;
    let path = '';
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!isValidPath) {
          if (!node.children.length) {
            isValidPath = true;
            path += '/' + node.path;
          } else {
            path += '/' + node.path;
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    !!path && history.replace(path);
  }

  function logout() {
    // 清除cookie 返回登录界面
    StorageUtil.removeLocalStorage('TOKENINFO');
    HistoryService.getHashHistory().push('/login');
  }

  return { state };
}
