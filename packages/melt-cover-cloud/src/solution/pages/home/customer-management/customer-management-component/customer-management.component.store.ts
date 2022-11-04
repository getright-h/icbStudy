import { ActionType, ICustomerManagementState } from './customer-management.interface';
import { CommonUtil, useStateStore } from '@fch/fch-tool';
import { useForm, ISelectType, ShowNotification } from '@fch/fch-shop-web';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export function useCustomerManagementStore() {
  const { state, setStateWrap, getState } = useStateStore(new ICustomerManagementState());
  const formRef = useForm();
  const customerManageService = new CustomerManageService();
  const history = useHistory();

  useEffect(() => {
    handleSearch(true);
    getOrgList();
    GetEquityGroupList();
  }, []);

  function handleSearch(isSearch = false) {
    isSearch && setStateWrap({ searchForm: { ...state.searchForm, page: 1 } });
    const v = formRef.getFieldsValue(true);
    const params = {
      ...v,
      beginTime: v.time && v.time[0] ? moment(v.time[0]).set({ hours: 0, minutes: 0, seconds: 0 }) : '',
      endTime: v.time && v.time[1] ? moment(v.time[1]).set({ hours: 23, minutes: 59, seconds: 59 }) : '',
      ...getState().searchForm
    };
    setStateWrap({ isLoading: true });
    customerManageService.queryCustomerList(params).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total });
      },
      () => {},
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }
  /** 导出 */
  function handleExport() {
    const v = formRef.getFieldsValue(true);
    const params = {
      ...v,
      beginTime: v.time && v.time[0] ? moment(v.time[0]).set({ hours: 0, minutes: 0, seconds: 0 }) : '',
      endTime: v.time && v.time[1] ? moment(v.time[1]).set({ hours: 23, minutes: 59, seconds: 59 }) : '',
      ...getState().searchForm
    };
    setStateWrap({ isLoading: true });
    customerManageService.exportList(params).subscribe(
      res => {
        CommonUtil.downFile(res, `客户管理列表${moment(new Date()).format('YYYY-MM-DD')}.xlsx`);
        ShowNotification.success('导出成功');
        setStateWrap({ isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
  }
  function tableAction(row: any, actionName: number) {
    switch (actionName) {
      case ActionType.DETAIL:
        history.push('./customerManagementDetail/' + row.id);
        break;
    }
  }
  function changeTablePageIndex(page: number, size: number) {
    setStateWrap({ searchForm: { page, size } });
    handleSearch();
  }

  // 获取所属机构列表
  function getOrgList() {
    customerManageService.getOrgList().subscribe(res => {
      const orgOptions = res?.map(org => {
        return {
          label: org.name,
          value: org.id
        };
      });
      formRef.setSchema('distributorId', (schema: ISelectType) => {
        schema.props.options = orgOptions;
        return schema;
      });
    });
  }
  // 获取套餐包列表
  function GetEquityGroupList() {
    customerManageService.getEquityGroupList().subscribe(res => {
      const equityOptions = res?.map(equity => {
        return {
          label: equity.name,
          value: equity.id
        };
      });
      formRef.setSchema('equityGroupId', (schema: ISelectType) => {
        schema.props.options = equityOptions;
        return schema;
      });
    });
  }

  return { state, handleSearch, formRef, tableAction, changeTablePageIndex, handleExport };
}
