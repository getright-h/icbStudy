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
        const tableData = cloneDeep(
          res.map((item: any) => {
            item.children = [];
            return item;
          })
        );
        setStateWrap({ tableData, total: res?.length, isLoading: false });
        selectFn(tableData?.[0]);
      },
      () => {
        setStateWrap({ isLoading: false });
      }
    );
  }

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

  function selectFn(record: GetSubOrganizationResType) {
    setStateWrap({ currentData: record });
    props?.selectEvent?.(record);
  }

  return { state, onExpand, selectFn };
}
