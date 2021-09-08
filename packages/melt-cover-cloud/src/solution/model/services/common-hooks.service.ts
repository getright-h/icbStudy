import useFetch from '~/framework/hooks/useFetch';

const AddOrderOrgCanSelectPath = 'order/manager/GetInputOrderOrgList';

export interface IDistributor {
  data: IDistributorData[];
  refetch: (params?: any) => void;
}

export interface IDistributorData {
  id: string;
  name: string;
}

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
