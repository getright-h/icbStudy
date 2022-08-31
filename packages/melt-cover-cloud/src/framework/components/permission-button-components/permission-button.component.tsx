import { StorageUtil } from '~/framework/util/storage';

/**
 * @description 带权限判断的组件
 * @param {{ id: string }} props id属性必传，判断当前登录用户是否包含该权限
 * @return {*} 返回组件中包含的内容
 */
const PermissionButton = (props: { id: string; children: any }): any => {
  let btnList: string[] = [];
  try {
    const userInfo = JSON.parse(StorageUtil.getLocalStorage('userInfoRole') || '{}');
    btnList = userInfo?.privilegesCode || [];
  } catch (e) {
    btnList = [];
  }

  const { id, children } = props;
  if (btnList?.includes(id)) return children;
  return null;
};
export default PermissionButton;
