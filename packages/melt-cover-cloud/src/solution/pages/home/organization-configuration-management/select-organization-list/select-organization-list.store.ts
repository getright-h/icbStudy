import { useStateStore } from '@fch/fch-tool';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { GetSubOrganizationResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { EquityPackageManageService } from '~/solution/model/services/equity-package-manage.service';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { SelectOrganizationListProps, SelectOrganizationListState } from './select-organization-list.interface';

export function useOrganizationListStore(props: SelectOrganizationListProps) {
  const { state, setStateWrap, getState } = useStateStore(new SelectOrganizationListState());
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // form.validateFields().then(values => {
    setStateWrap({ isLoading: true });
    fundsOrganizitonOtherService.getSubOrganization({ parentId: '' }).subscribe(
      (res: any) => {
        // 预先给每个一级机构加个空数组 方便后续如果有下属的二级机构 就直接加进来
        const tableData = cloneDeep(
          res.map((item: any) => {
            item.children = [];
            return item;
          })
        );
        setStateWrap({ tableData, total: res?.length, isLoading: false });
        selectFn(tableData);
        // 首次渲染的时候 不能默认把一级机构的id传递给右侧的查询表单函数 因为需要一个空的parentid来查询全部一级机构
        // selectFn(tableData?.[0]);
      },
      () => {
        setStateWrap({ isLoading: false });
      }
    );
  }

  /** 点击展开后 查询下级列表 并加入到children中 */
  function onExpand(expanded: any, record: any) {
    if (!expanded) {
      return;
    }
    setStateWrap({ isLoading: true });
    fundsOrganizitonOtherService
      .getSubOrganization({
        parentId: record['id']
      })
      .subscribe(
        (res: any) => {
          // 点击下级图标 查询的下级列表 找到之前创建的空的父级数组，并插入进去
          const tableData = state.tableData.map((item: any) => {
            if (item.id === record['id']) {
              // item.children = res.map((o: any) => ({ ...o, isLeaf: true }));
              item.children = res.map((o: any) => ({ ...o }));
            }
            return item;
          });
          setStateWrap({ tableData, isLoading: false });
        },
        () => {
          setStateWrap({ isLoading: false });
        }
      );
  }

  // function changeTablePageIndex(pageIndex: number, pageSize: number) {
  //   setStateWrap({ pageIndex, pageSize });
  //   getTableData();
  // }

  /** 获取左侧当前行的信息 并传递给右侧获取表单的函数(主要时当前点击行的id) */
  function selectFn(record: GetSubOrganizationResType) {
    console.log('selectFn', record);

    // record = { ...record, index: 1, size: 10 };
    setStateWrap({ currentData: record });
    props?.selectEvent?.(record);
  }

  return { state, onExpand, selectFn };
}
