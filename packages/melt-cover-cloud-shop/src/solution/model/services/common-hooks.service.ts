import useFetch from '~/framework/hooks/useFetch';
import { IDistributorData, IEquityGroupData } from '../dto/common-hooks.dto';

const AddOrderOrgCanSelectPath = 'order/manager/GetInputOrderOrgList'; // 获取所属机构
const GET_EQUITY_GROUP_LIST = 'order/manager/GetEquityGroupList'; // 获取购买套餐包

export function useGetDistributor(name?: string): any {
  const { data, refetch } = useFetch({
    method: 'get',
    url: AddOrderOrgCanSelectPath,
    params: { name }
  });
  const options = data?.map((item: IDistributorData) => {
    return {
      label: item.name,
      value: item.id
    };
  });
  return { data: options, refetch };
}

// 获取购买套餐包
export function useGetEquityGroup(name?: string): any {
  const { data, refetch } = useFetch({
    method: 'get',
    url: GET_EQUITY_GROUP_LIST,
    params: { name }
  });
  const options = data?.map((item: IEquityGroupData) => {
    return {
      label: item.name,
      value: item.id
    };
  });
  return { equityGroupData: options, searchEquityGroup: refetch };
}
