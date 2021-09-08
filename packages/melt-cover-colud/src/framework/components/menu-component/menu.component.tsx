import * as React from 'react';
import { IProps, IMenu, IconList } from './menu.interface';
// import { createFromIconfontCN } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
function MenuComponent(props: IProps) {
  const { currentUrl, expandList } = props;
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  console.log('2222currentUrl===>', currentUrl);
  const renderMenuItems = React.useCallback(
    (menuList: IMenu[]) => {
      return menuList.map(menu => {
        const { title, paths, icon } = menu;

        return menu.children?.length ? (
          <SubMenu
            key={paths}
            title={
              <span>
                {IconList[icon]}
                <span>{title}</span>
              </span>
            }
          >
            {renderMenuItems(menu.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={paths}>
            <Link to={paths}>
              {/* <IconFont type={icon} /> */}
              <span>{title}</span>
            </Link>
          </Menu.Item>
        );
      });
    },
    [props.menuList]
  );
  const MenuItems = renderMenuItems(props.menuList);
  return (
    <Menu
      mode="inline"
      selectedKeys={[currentUrl]}
      defaultSelectedKeys={[currentUrl]}
      defaultOpenKeys={expandList}
      // inlineCollapsed={gState.collapsed}
    >
      {MenuItems}
    </Menu>
  );
}

export default React.memo(MenuComponent);
