import { BackGroundReqType, RecordReqType, DistributorReqType } from '../dto/maintain-logs.dto';
import useFetch from '~/framework/hooks/useFetch';
import useMutation from '~/framework/hooks/useMutation';

const DISTRIBUTOR = 'maintain/Record/Query/Distributor'; //经销商获取保养记录列表
const EXPORT_DISTRIBUTOR = 'maintain/Record/Query/Distributor/Export'; //经销商平台导出保养记录列表
const DISTRIBUTOR_GROUND = 'maintain/User/VehicleList/Distributor'; //经销商获取用户名下车辆
const DISTRIBUTOR_CUSTOM_ITEM = 'maintain/Record/Content/Query/Distributor'; // 经销商获取自定义保养项目
const INSERT_CUSTOM_ITEM = 'maintain/Record/Content/Insert/Distributor'; // 经销商新增自定义保养项目
const ADD_RECORD = 'maintain/Maintain/Record'; // 保养登记,新增保养记录

//经销商获取保养记录列表
export function usePostDistributor(params?: DistributorReqType) {
  const { refetch, data, isLoading, currParams } = useMutation({
    method: 'post',
    url: DISTRIBUTOR,
    params: {
      index: 1,
      size: 10,
      ...params
    }
  });
  const maintainLogData = {
    tableData: data?.dataList,
    index: currParams?.index,
    size: currParams?.size,
    total: data?.total
  };
  return { refetch, maintainLogData, isLoading, currParams };
}
//经销商平台导出保养记录列表
export function useExportLog(params?: DistributorReqType) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'postDownload',
      url: EXPORT_DISTRIBUTOR,
      params,
      message: '导出保养记录'
    },
    false
  );
  return { refetch, isLoading };
}
//经销商获取用户名下车辆
export function useGetVehicle(params?: BackGroundReqType) {
  const { refetch, data } = useFetch(
    {
      method: 'post',
      url: DISTRIBUTOR_GROUND,
      params: {
        index: 1,
        size: 10,
        ...params
      }
    },
    false
  );
  const options = data?.dataList.map((org: any) => {
    return {
      label: org.vehiclePlateNumber,
      value: org.vehicleId
    };
  });
  return { refetch, options };
}
// 经销商获取自定义保养项目
export function useDistributorCustomItem(params?: { distributorId: string }) {
  const { refetch, data } = useMutation({
    method: 'post',
    url: DISTRIBUTOR_CUSTOM_ITEM,
    params
  });
  return { data, refetch };
}
// 经销商新增自定义保养项目
export function useInsertCustomItem(params?: { item: string }) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'post',
      url: INSERT_CUSTOM_ITEM,
      params,
      message: '新增自定义保养项目'
    },
    false
  );
  return { refetch, isLoading };
}
// 新增保养记录
export function useRecord(params?: RecordReqType) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'post',
      url: ADD_RECORD,
      params,
      message: '新增保养记录'
    },
    false
  );
  return { refetch, isLoading };
}
