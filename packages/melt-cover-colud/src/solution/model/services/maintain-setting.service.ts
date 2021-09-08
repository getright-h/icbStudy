import {
  MaintainSettingDTO,
  ExampleRequestParam,
  ExampleResponseResult,
  QueryReqType,
  QueryResType,
  QueryVehicleBrandResType,
  QueryVehicleFactoryResType,
  QueryVehicleVersionResType,
  QueryVehicleConfigResType,
  InsertReqType,
  EditReqType
} from '../dto/maintain-setting.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';

/**
 * 真实开发中，请将示例代码移除
 */
const EXAMPLE_API_PATH = 'your-http-request-path';
const QUERY_VEHICLE_BRAND = 'vehicleComponent/app/queryVehicleBrand'; // 模糊匹配品牌
const QUERY_VEHICLE_FACTORY = 'vehicleComponent/app/queryVehicleFactory'; // 搜索厂商
const QUERY_VEHICLE_VERSION = 'vehicleComponent/app/queryVehicleVersion'; // 搜索车系
const QUERY_VEHICLE_CONFIG = 'vehicleComponent/app/queryVehicleConfig'; // 搜索车型配置
const QUERY = 'maintain/ConfigTemplate/Query'; //获取保养配置模板
const INSERT = 'maintain/ConfigTemplate/Insert'; //插入保养配置模板
const DELETE = 'maintain/ConfigTemplate/Delete'; //删除保养配置模板
const EDIT = 'maintain/ConfigTemplate/Edit'; //编辑保养配置模板

@DepUtil.Injectable()
export class MaintainSettingService extends MaintainSettingDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  example(params: ExampleRequestParam): Observable<ExampleResponseResult> {
    return this.requestService.get(EXAMPLE_API_PATH, params);
  }
  // 模糊匹配品牌
  queryVehicleBrand(params: {
    name?: string;
    parentId?: string;
    bitwise?: number;
  }): Observable<QueryVehicleBrandResType[]> {
    return this.requestService.get(QUERY_VEHICLE_BRAND, params);
  }
  // 搜索厂商
  queryVehicleFactory(params: { name?: string; parentId: string }): Observable<QueryVehicleFactoryResType[]> {
    return this.requestService.get(QUERY_VEHICLE_FACTORY, params);
  }
  // 搜索车系
  queryVehicleVersion(params: { name?: string; parentId: string }): Observable<QueryVehicleVersionResType[]> {
    return this.requestService.get(QUERY_VEHICLE_VERSION, params);
  }
  // 搜索车型配置
  queryVehicleConfig(params: { id: string }): Observable<QueryVehicleConfigResType[]> {
    return this.requestService.get(QUERY_VEHICLE_CONFIG, params);
  }
  // 获取保养配置模板
  query(params: QueryReqType): Observable<{ total: number; dataList: QueryResType[] }> {
    return this.requestService.post(QUERY, params);
  }
  // 插入保养配置模板
  insert(params: InsertReqType): Observable<{}> {
    return this.requestService.post(INSERT, params);
  }
  // 删除保养配置模板
  delete(params: { id: string }): Observable<{}> {
    return this.requestService.delete(DELETE, params);
  }
  // 编辑保养配置模板
  edit(params: EditReqType): Observable<{}> {
    return this.requestService.put(EDIT, params);
  }
}
