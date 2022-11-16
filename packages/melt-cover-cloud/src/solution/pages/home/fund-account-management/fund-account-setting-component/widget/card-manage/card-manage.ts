import { OrganizationPagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';
import { ACTION_TYPE } from '../../fund-account-setting.interface';

export interface ICardManageProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  action: (type: ACTION_TYPE, data: any) => void;
  initData?: OrganizationPagedListResType;
}
