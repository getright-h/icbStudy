import { notification } from 'antd';
// const PreFix = 'RongBaoYun-notification';
export class ShowNotification {
  static success(info: string) {
    notification.success({
      message: '成功',
      description: info
      // prefixCls: PreFix
    });
  }
  static info(info: string) {
    notification.info({
      message: '提示',
      description: info
      // prefixCls: PreFix
    });
  }
  static warning(info: string) {
    notification.warning({
      message: '警告',
      description: info
      // prefixCls: PreFix
    });
  }
  static error(info: string) {
    notification.error({
      message: '错误',
      description: info
      // prefixCls: PreFix
    });
  }
}
