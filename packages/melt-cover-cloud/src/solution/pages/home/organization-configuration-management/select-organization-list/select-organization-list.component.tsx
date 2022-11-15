import { ITableComponent } from '@fch/fch-shop-web';
import React from 'react';
import { MenuProvider } from 'react-contexify';
import { channelColumns } from './select-organization-list.columns';
import { SelectOrganizationListProps } from './select-organization-list.interface';
import style from './select-organization-list.less';
import { useOrganizationListStore } from './select-organization-list.store';

export function SelectOrganizationList(props: SelectOrganizationListProps) {
  const { state, changeTablePageIndex } = useOrganizationListStore();
  const { isLoading, pageIndex, pageSize, tableData, total } = state;
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
          console.log(1);
        }}
      >
        <ITableComponent
          columns={channelColumns()}
          isLoading={isLoading}
          pageIndex={pageIndex}
          pageSize={pageSize}
          data={tableData}
          total={total}
          onRow={record => {
            return {
              onClick: e => {
                // todo 点击显示右侧对应的列表
                console.log('1');
              }
              /* onContextMenu: (event: any) => {
                  console.log(11111, record);
                  currentEquity = record;
                  if (!currentEquity.isEdit) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                } */
            };
          }}
          changeTablePageIndex={changeTablePageIndex}
        ></ITableComponent>
      </MenuProvider>
    </div>
  );
}
