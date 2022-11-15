import { useStateStore } from '@fch/fch-tool';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { EquityPackageManageService } from '~/solution/model/services/equity-package-manage.service';
import { SelectOrganizationListState } from './select-organization-list.interface';

export function useOrganizationListStore() {
  const { state, setStateWrap, getState } = useStateStore(new SelectOrganizationListState());
  const equityPackageManageService: EquityPackageManageService = new EquityPackageManageService();
  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // form.validateFields().then(values => {
    setStateWrap({ isLoading: true });
    equityPackageManageService
      .getPackageClassifylist({
        // ...values,
        // coursePackageClassifyId: values?.coursePackageClassifyId?.[0],
        // state: STATE_ENUM.Enable
      })
      .subscribe(
        (res: any) => {
          const tableData = cloneDeep(
            res.map((item: any) => {
              item.children = [];
              return item;
            })
          );
          setStateWrap({ tableData, total: res?.length, isLoading: false });
        },
        () => {
          setStateWrap({ isLoading: false });
        }
      );
    // });
  }

  function onExpand(expanded: any, record: any) {
    if (!expanded) {
      return;
    }
    setStateWrap({ isLoading: true });
    teachingService
      .getPackageClassifylist({
        parentId: record['id']
        // state: STATE_ENUM.Enable
      })
      .subscribe(
        (res: any) => {
          const tableData = state.tableData.map((item: any) => {
            if (item.id === record['id']) {
              item.children = res.map((o: any) => ({ ...o, isLeaf: true }));
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

  function changeTablePageIndex(pageIndex: number, pageSize: number) {
    setStateWrap({ pageIndex, pageSize });
    getTableData();
  }

  return { state, changeTablePageIndex, onExpand };
}
