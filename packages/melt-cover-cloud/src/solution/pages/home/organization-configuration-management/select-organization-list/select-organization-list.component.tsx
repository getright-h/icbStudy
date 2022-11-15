import { ITableComponent } from '@fch/fch-shop-web';
import React from 'react';
import { MenuProvider } from 'react-contexify';
import { ITablePlus } from '~/framework/components/component.module';
import { channelColumns } from './select-organization-list.columns';
import { SelectOrganizationListProps } from './select-organization-list.interface';
import style from './select-organization-list.module.less';
import { useOrganizationListStore } from './select-organization-list.store';

export function SelectOrganizationList(props: SelectOrganizationListProps) {
  const { state, selectFn, onExpand } = useOrganizationListStore(props);
  const { isLoading, pageIndex, pageSize, tableData, total, currentData } = state;
  return (
    <div className={style.addEquity}>
      <h3>
        <span>渠道列表</span>
      </h3>
      <MenuProvider
        id="menu_id"
        onContextMenu={(event: any) => {
          event.preventDefault();
          event.persist();
        }}
      >
        <ITablePlus
          columns={channelColumns()}
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={pageSize}
          data={tableData}
          total={total}
          isPagination={false}
          expandable={{
            rowExpandable: (record: any) => !!record.children,
            onExpand
          }}
          onRow={record => {
            return {
              onClick: () => selectFn(record),
              style: {
                cursor: 'pointer',
                background: currentData?.id === record?.id ? '#FFF4F0' : ''
              }
            };
          }}
        />
      </MenuProvider>
    </div>
  );
}
