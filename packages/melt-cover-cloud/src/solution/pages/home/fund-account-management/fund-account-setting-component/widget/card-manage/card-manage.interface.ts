import { BagDetailResType, PagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { ACTION_TYPE } from '../../fund-account-setting.interface';

export interface ICardManageProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  initData?: PagedListResType;
}

export class ICardManageState {
  detailData: BagDetailResType;
}
