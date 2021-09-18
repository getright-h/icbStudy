import { Tooltip } from 'antd';
import * as React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { uuid } from '~/framework/util/common/tool';

function RenderToolTip() {
  const [visible, setVisible] = React.useState(false);
  function renderToolTipTitle() {
    return (
      <div>
        <p key={uuid(7, 10)}>非散户：用户基于此单权益将只能在录单门店消费权益</p>
        <p key={uuid(7, 10)}>散户：用户基于此单权益将可在平台任意门店消费权益</p>
      </div>
    );
  }
  return (
    <div>
      <Tooltip title={renderToolTipTitle()} visible={visible} onVisibleChange={console.log}>
        <div
          onMouseEnter={() => {
            console.log(1);
            setVisible(true);
          }}
          onMouseLeave={() => {
            console.log(2);
            setVisible(false);
          }}
        >
          是否散户
          <QuestionCircleOutlined />
        </div>
      </Tooltip>
    </div>
  );
}
export default React.memo(() => RenderToolTip());
