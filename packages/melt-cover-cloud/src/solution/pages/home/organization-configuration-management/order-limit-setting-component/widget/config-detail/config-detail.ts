import { OrganizationPagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';

export interface IConfigDetailProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  initData?: OrganizationPagedListResType;
}
