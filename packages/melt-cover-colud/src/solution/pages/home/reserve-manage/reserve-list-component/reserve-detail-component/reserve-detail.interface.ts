import { AppointPagedListData } from '~/solution/model/dto/reserve-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IReserveDetailState
 */
export class IReserveDetailState {}

/**
 * @export props变量定义和初始化
 * @class IReserveDetailProps
 */
export class IReserveDetailProps {
  visible: boolean;
  data: AppointPagedListData;
  close: () => void;
}

export const DetailKeys = [
  { title: '预约编号', key: 'number' },
  { title: '车主姓名', key: 'userName' },
  { title: '联系电话', key: 'userMobile' },
  { title: '车型', key: 'vehicleVersionName' },
  { title: '车牌号', key: 'vehiclePlate' },
  { title: '车架号', key: 'vehicleVin' },
  { title: '当前里程', key: 'mileage' },
  { title: '预约时间', key: 'time' },
  { title: '类型', key: 'typeText' },
  { title: '预约经销商', key: 'distributorName' },
  { title: '活动', key: 'activityDescFormat' },
  { title: '备注', key: 'remark' }
];
