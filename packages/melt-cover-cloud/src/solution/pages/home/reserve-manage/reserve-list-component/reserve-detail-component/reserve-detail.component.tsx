import { Modal } from 'antd';
import * as React from 'react';
import style from './reserve-detail.module.less';
import { useReserveDetailStore } from './reserve-detail.component.store';
import { DetailKeys, IReserveDetailProps } from './reserve-detail.interface';

export default function ReserveDetailComponent(props: IReserveDetailProps) {
  const { state } = useReserveDetailStore(props);
  const { visible, data, close } = props;
  function renderDetails() {
    return (
      <div className={style.detailWrap}>
        {DetailKeys.map(item => (
          <div className={style.detailItem} key={item.key}>
            <span>
              {item.title}：{data[item.key] || '-'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <Modal title="预约详情" width={600} visible={visible} onCancel={() => close()} destroyOnClose={true} footer={null}>
      {renderDetails()}
    </Modal>
  );
}
