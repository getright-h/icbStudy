import { IOrderManagementListState } from './pre-order-list.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm, ISelectType } from '@fch/fch-shop-web';
import { useHistory } from 'react-router';
import moment from 'moment';
import { QueryPaginOrderParams, QueryPaginOrderReturn } from '~/solution/model/dto/order-manage.dto';
import { OrderManageService } from '~/solution/model/services/order-manage.service';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';
import { useEffect } from 'react';

export function useOrderManagementListStore() {
  const { state, setStateWrap } = useStateStore(new IOrderManagementListState());
  const formRef = useForm();
  const history = useHistory();
  const orderManageService: OrderManageService = new OrderManageService();
  const customerManageService: CustomerManageService = new CustomerManageService();
  useEffect(() => {
    handleSearch();
    getOrgList();
    GetEquityGroupList();
  }, []);
  function handleSearch(page = 1, size = 10) {
    const formValues = formRef.getFieldsValue();
    const { dateRange } = formValues;
    const req = Object.assign({}, formValues, {
      size,
      index: page,
      beginTime: dateRange?.[0] && moment(dateRange[0]).set({ hours: 0, minutes: 0, seconds: 0 }),
      endTime: dateRange?.[1] && moment(dateRange[1]).set({ hours: 23, minutes: 59, seconds: 59 })
    });
    handleGetOrderList(req);
  }
  function handleGetOrderList(params: QueryPaginOrderParams) {
    setStateWrap({
      isLoading: true
    });
    orderManageService.getQuickOrderList(params).subscribe(
      (res: QueryPaginOrderReturn) => {
        setStateWrap({
          tableData: res.dataList,
          total: res.total
        });
        setStateWrap({
          isLoading: false
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }
  function tableAction(row: any, actionName: string) {
    if (actionName == '详情') {
      history.push('/home/orderManagement/orderDetail?id=' + row.id);
    }
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchForm: {
        size: pageSize,
        index
      }
    });
    handleSearch(index, pageSize);
  }
  function addOrder() {
    history.push('addOrder');
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

  function handleSearchReset() {
    formRef.resetFields();
    handleSearch();
  }

  return { state, handleSearch, formRef, tableAction, changeTablePageIndex, addOrder, handleSearchReset };
}
