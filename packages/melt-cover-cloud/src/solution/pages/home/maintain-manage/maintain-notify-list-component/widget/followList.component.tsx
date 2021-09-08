import { Button, Modal } from 'antd';
import * as React from 'react';
import { IModalComponentProps } from '../maintain-notify-list.interface';
import { ITableComponent } from '@fch/fch-shop-web';
import { followModalListColumns } from '../demo-columns';

export default function FollowListComponent(props: IModalComponentProps & { changeTablePageIndex: Function }) {
  const { title, visible, handleCancel, handleOk, stateParent, changeTablePageIndex } = props;
  function renderTable() {
    return (
      <>
        <ITableComponent
          columns={followModalListColumns()}
          isLoading={stateParent.isFollowListModalLoading}
          pageIndex={stateParent.searchsFollowListModalForm.index}
          pageSize={stateParent.searchsFollowListModalForm.size}
          data={stateParent.tablesFollowListModalData}
          total={stateParent.totalsFollowListModal}
          rowKey={'id'}
          isPagination={true}
          changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
        ></ITableComponent>
      </>
    );
  }

  return (
    <React.Fragment>
      <Modal
        title={title}
        width={800}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <>
            {/* <Button type="primary" onClick={handleCancel}>
              取消
            </Button> */}
            <Button loading={stateParent.isFollowListModalLoading} type="primary" onClick={handleOk}>
              确定
            </Button>
          </>
        }
      >
        {renderTable()}
      </Modal>
    </React.Fragment>
  );
}
