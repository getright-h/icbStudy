import {
  ReserveManageDTO,
  AppointPagedListParams,
  AppointConfigListParams,
  ResponseListData,
  AppointPagedListData,
  AppointConfigListData,
  PutAppointmentConfigParam,
  SetAppointmentStateParams,
  GetOrganizationsParam,
  OrganizationData
} from '../dto/reserve-manage.dto';
import { RequestService } from '~/framework/util/base-http/request.service';
import { Observable } from 'rxjs';
import { DepUtil } from '~/framework/aop/inject';
import { map } from 'rxjs/operators';
import { AppSourceEnum } from '~/solution/shared/enums/reserve.enum';

/**
 * 真实开发中，请将示例代码移除
 */

const APPOINT_PAGED_LIST = 'Appointment/manager/appointPagedList';
const SET_APPOINT_MENTSTATE = 'Appointment/manager/set_state';
const GET_APPOINTMENT_CONFIGLIST = 'Appointment/config/manager';
const DELETEAPPOINTMENT = 'Appointment/config/manager/del';
const GET_ORGANIZATIONS = 'prvilege/GetOrganizationsByName';
const GET_ORGANIZATIONS_PATH = 'equity/manage/getOrganizationsByName';

@DepUtil.Injectable()
export class ReserveManageService extends ReserveManageDTO {
  @DepUtil.Inject(RequestService)
  private readonly requestService: RequestService;
  constructor() {
    super();
  }

  appointPagedList(params: Partial<AppointPagedListParams>): Observable<ResponseListData<AppointPagedListData>> {
    return this.requestService.post(APPOINT_PAGED_LIST, params).pipe(
      map(data => {
        for (const item of data.dataList) {
          const parseVal = item.activityDesc && JSON.parse(item.activityDesc);
          parseVal &&
            Object.keys(parseVal).length &&
            (parseVal.DiscountType == 0
              ? (item.activityDescFormat = '无折扣')
              : parseVal.DiscountType == 1
              ? (item.activityDescFormat = parseVal.Discount + '折')
              : (item.activityDescFormat = '满' + parseVal.TotalAmount + '减' + parseVal.DiscountAmount));
        }
        return data;
      })
    );
  }

  setAppointmentState(params: SetAppointmentStateParams): Observable<boolean> {
    return this.requestService.post(SET_APPOINT_MENTSTATE, params);
  }

  getAppointmentConfigList(
    params: Partial<AppointConfigListParams>
  ): Observable<ResponseListData<AppointConfigListData>> {
    return this.requestService.get(GET_APPOINTMENT_CONFIGLIST, params);
  }

  putAppointmentConfigList(params: Partial<PutAppointmentConfigParam>): Observable<boolean> {
    return this.requestService.put(GET_APPOINTMENT_CONFIGLIST, params);
  }

  setAppointmentConfigList(params: Partial<PutAppointmentConfigParam>): Observable<boolean> {
    return this.requestService.post(GET_APPOINTMENT_CONFIGLIST, params);
  }

  deleteAppointment(distributorIds: string[]): Observable<boolean> {
    return this.requestService.delete(DELETEAPPOINTMENT, { distributorIds });
  }

  getOrganizations(params: GetOrganizationsParam): Observable<OrganizationData[]> {
    return this.requestService.get(GET_ORGANIZATIONS, params);
  }

  getOrganizationsParent(params: GetOrganizationsParam): Observable<OrganizationData[]> {
    return this.requestService.get(GET_ORGANIZATIONS_PATH, params);
  }
}
