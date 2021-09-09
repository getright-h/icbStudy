import useFetch from '~/framework/hooks/useFetch';
import useMutation from '~/framework/hooks/useMutation';
import {
  QueryReqType,
  BatchInsertReqType,
  QueryTempReqType,
  InsertReqType,
  EditReqType
} from '../dto/maintain-setting.dto';

/**
 * 真实开发中，请将示例代码移除
 */
const QUERY_TEMP = 'maintain/ConfigTemplate/Query'; //获取保养配置模板
const QUERY_VEHICLE_BRAND = 'vehicleComponent/app/queryVehicleBrand'; // 模糊匹配品牌
const QUERY_VEHICLE_FACTORY = 'vehicleComponent/app/queryVehicleFactory'; // 搜索厂商
const QUERY_VEHICLE_VERSION = 'vehicleComponent/app/queryVehicleVersion'; // 搜索车系
const QUERY_VEHICLE_CONFIG = 'vehicleComponent/app/queryVehicleConfig'; // 搜索车型配置
const QUERY = 'maintain/Config/Query'; // 获取保养配置
const DELETE = 'maintain/Config/Delete'; // 删除保养配置
const INSERT = 'maintain/Config/Insert'; // 插入保养配置
const EDIT = 'maintain/Config/Edit'; // 编辑保养配置
const BATCH_INSERT = 'maintain/Config/BatchInsert'; // 批量插入保养配置

// 模糊匹配品牌
export function useQueryVehicleBrand(params?: { name: string }): any {
  const { data, refetch } = useFetch({
    method: 'get',
    url: QUERY_VEHICLE_BRAND,
    params
  });
  let options: any[] = [];
  data?.map((key: any) => {
    options = options.concat(
      key.items.map((brand: any) => {
        return {
          title: brand.value,
          label: brand.value,
          value: brand.key
        };
      })
    );
  });
  return { options, refetch };
}
// 搜索厂商
export function useQueryVehicleFactory(params?: { parentId: string }): any {
  const { data, refetch } = useFetch(
    {
      method: 'get',
      url: QUERY_VEHICLE_FACTORY,
      params
    },
    false
  );
  const options = data?.map((key: any) => {
    return {
      title: key.value,
      label: key.value,
      value: key.key
    };
  });
  return { options, refetch };
}
// 搜索车系
export function useQueryVehicleVersion(params?: { parentId: string }) {
  const { data, refetch } = useFetch(
    {
      method: 'get',
      url: QUERY_VEHICLE_VERSION,
      params
    },
    false
  );
  const options = data?.map((key: any) => {
    return {
      title: key.value,
      label: key.value,
      value: key.key
    };
  });
  return { options, refetch };
}
// 搜索车型配置
export function useQueryVehicleConfig(params?: { id: string }) {
  const { data, refetch } = useFetch(
    {
      method: 'get',
      url: QUERY_VEHICLE_CONFIG,
      params
    },
    false
  );
  const options = data?.map((key: any) => {
    return {
      title: key.value,
      label: key.value,
      value: key.key
    };
  });
  return { options, refetch };
}
// 插入保养配置
export function useInsert(params?: InsertReqType) {
  const { refetch, isLoading } = useMutation(
    {
      url: INSERT,
      method: 'post',
      params,
      message: '新增保养配置'
    },
    false
  );
  return { refetch, isLoading };
}
// 删除保养配置
export function useDel(params?: { id: string }) {
  const { refetch, isLoading } = useMutation(
    {
      url: DELETE,
      method: 'delete',
      params,
      message: '删除保养配置'
    },
    false
  );
  return { refetch, isLoading };
}
// 编辑保养配置
export function useEdit(params?: EditReqType) {
  const { refetch, isLoading } = useMutation(
    {
      url: EDIT,
      method: 'put',
      params,
      message: '编辑保养配置'
    },
    false
  );
  return { refetch, isLoading };
}
// 获取保养配置
export function usePostMaintainList(params?: QueryReqType) {
  const { data, refetch, isLoading, currParams } = useMutation({
    method: 'post',
    url: QUERY,
    params: {
      index: 1,
      size: 10,
      ...params
    }
  });
  const maintainData = {
    tableData: data?.dataList,
    index: currParams?.index,
    size: currParams?.size,
    total: data?.total
  };
  return { refetch, maintainData, isLoading, currParams };
}
// 获取保养配置模板
export function useQueryTempList(params?: QueryTempReqType) {
  const { data, refetch, isLoading, currParams } = useMutation({
    method: 'post',
    url: QUERY_TEMP,
    params: {
      index: 1,
      size: 10,
      ...params
    }
  });
  const tempMaintainData = {
    tableData: data?.dataList,
    index: currParams?.index,
    size: currParams?.size,
    total: data?.total
  };
  return { refetch, tempMaintainData, isLoading, currParams };
}
// 批量插入配置模板
export function useBatchInsert(params?: BatchInsertReqType) {
  const { refetch, isLoading } = useMutation(
    {
      method: 'post',
      url: BATCH_INSERT,
      params,
      message: '启用规则'
    },
    false
  );
  return { refetch, isLoading };
}
