import { useService, useStateStore } from '@fch/fch-tool';
import { HomeService } from '~/solution/model/services/home.service';
import { MenuService } from '~/framework/util/menu/menu.service';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { Subscription } from 'rxjs';
import { PAGES_MENU } from '@/solution/shared/constant/common.const';
export function useHomeStore() {
  const homeService = useService(HomeService);
  const menuService = useService(MenuService);
  let menuAndAuthSubscription: Subscription;
  const { state, setStateWrap } = useStateStore(new IHomeProps());

  useEffect(() => {
    getMenuAndAuth();
    // return () => {
    //   menuAndAuthSubscription.unsubscribe();
    // };
  }, []);

  function getMenuAndAuth() {
    setStateWrap({
      menuList: menuService.updateMenuByRoutes(PAGES_MENU.MENU),
      loading: false
    });
    // menuAndAuthSubscription = homeService.getMenuAndAuthKeys().subscribe((menuList: { data: IMenu[] }) => {
    //   setStateWrap({ menuList: menuService.updateMenuByRoutes(menuList.data), loading: false });
    // });
  }

  return { state };
}
