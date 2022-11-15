import { useStateStore } from '@fch/fch-tool';
import { SelectOrganizationListState } from './select-organization-list.interface';

export function useOrganizationListStore() {
  const { state, setStateWrap, getState } = useStateStore(new SelectOrganizationListState());
  return { state };
}
