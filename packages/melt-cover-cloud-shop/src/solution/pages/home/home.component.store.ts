import { useService, useStateStore } from '@fch/fch-tool';
import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { PAGES_MENU } from '@/solution/shared/constant/common.const';
import { MenuListService } from '~/framework/aop/strategy/menuListService';
import { useHistory } from 'react-router';
export function useHomeStore() {
  const menuListService: MenuListService = useService(MenuListService);
  const menuService: MenuService = useService(MenuService);
  const history = useHistory();
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuList();
    // return () => {
    //   menuAndAuthSubscription.unsubscribe();
    // };
  }, []);

  async function getMenuList() {
    try {
      const res = await menuListService.getMenuList().toPromise();
      console.log('menuListService =>>>>>>>>>>>>>>>>>>>>>>>>', menuListService);

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
            path = node.path;
            isValidPath = true;
          } else {
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    !!path && history.replace(path);
  }

  return { state };
}
