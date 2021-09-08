import { Button, Modal } from 'antd';
import * as React from 'react';
import { IModalComponentProps } from '../maintain-notify-list.interface';
import { ITableComponent } from '@fch/fch-shop-web';
import { notifyModalListColumns } from '../demo-columns';

export default function NotifyListComponent(props: IModalComponentProps & { changeTablePageIndex: Function }) {
  const { title, visible, handleCancel, handleOk, stateParent, changeTablePageIndex } = props;
  function renderTable() {
    return (
      <>
        <ITableComponent
          columns={notifyModalListColumns()}
          isLoading={stateParent.isNotifyListModalLoading}
          pageIndex={stateParent.searchsNotifyListModalForm.index}
          pageSize={stateParent.searchsNotifyListModalForm.size}
          data={stateParent.tablesNotifyListModalData}
          total={stateParent.totalsNotifyListModal}
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
        width={800}
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <>
            {/* <Button type="primary" onClick={handleCancel}>
              取消
            </Button> */}
            <Button loading={stateParent.isLoadingModalNotify} type="primary" onClick={handleOk}>
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
