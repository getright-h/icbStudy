import { AppointConfigSpaceContent } from '~/solution/model/dto/reserve-manage.dto';
import { LEMAL_TIME_LIST } from '~/solution/shared/constant/time';

/**
 * @export state变量定义和初始化
 * @class IChooseTimePeriodState
 */
export class IChooseTimePeriodState {
  weekList: WeekDayDTO[] = [];
}

/**
 * @export props变量定义和初始化
 * @class IChooseTimePeriodProps
 */
export class IChooseTimePeriodProps {
  initData: AppointConfigSpaceContent[];
  getTimePeriod: (values: TimePeriodDTO[]) => void;
}

export const timeList = LEMAL_TIME_LIST;

export interface TimePeriodDTO {
  week: number;
  slots: Partial<TimePeriodSlotDTO>[];
}
export interface TimePeriodSlotDTO {
  slot: string;
  totalAmount: number;
  discountAmount: number;
  discount: number;
  discountType: number;
  checked: boolean;
  keyInfo: number;
  startTime: number;
  endTime: number;
}

export interface WeekDayDTO {
  keyInfo: number;
  day: string;
  checked: boolean;
  allChecked: boolean;
  children?: DetailTimeDTO[];
}

export interface DetailTimeDTO {
  keyInfo: number;
  startTime: number;
  endTime: number;
  checked: boolean;
  discountType: number;
  totalAmount: number;
  discountAmount: number;
  discount: number;
}
