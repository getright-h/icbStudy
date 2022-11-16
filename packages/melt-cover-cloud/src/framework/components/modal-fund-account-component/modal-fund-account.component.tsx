// 自定义modal组件 暂时没有引用
import { Modal } from 'antd';
import * as React from 'react';
import style from './modal-fund-account.module.less';
import { IModalFundAccountProps } from './modal-fund-account.interface';
export default function ModalFundAccountStateComponent(props: IModalFundAccountProps) {
  const { title, handleClose, handleOk, visible } = props;
  function renderModal() {
    return (
      <Modal title={title} visible={visible} closable={true} onCancel={handleClose} onOk={handleOk}>
        <div>modal!!!</div>
      </Modal>
    );
  }
  return <div>{renderModal()}</div>;
}
