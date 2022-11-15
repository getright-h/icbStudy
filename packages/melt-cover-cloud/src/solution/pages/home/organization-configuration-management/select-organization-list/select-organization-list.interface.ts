import { GetSubOrganizationResType } from '~/solution/model/dto/funds-organiziton-other.dto';

export class SelectOrganizationListState {
  isLoading = false;
  pageIndex = 1;
  pageSize = 10;
  tableData: GetSubOrganizationResType[] = [];
  currentData: GetSubOrganizationResType;
  total = 0;
}
export interface SelectOrganizationListProps {
  selectEvent: (organization: GetSubOrganizationResType) => void;
}
