import { BaseRequestService } from '@fch/fch-tool';
import { notification } from 'antd';
function getRootUrl() {
  return '';
}

function errorMessageFunction(info: string) {
  notification.error({
    message: '错误',
    description: info
  });
}

export class RequestService extends BaseRequestService {
  constructor(createAuthHeaders: () => any, backLoginFunction: () => void) {
    super(getRootUrl, createAuthHeaders(), backLoginFunction, errorMessageFunction);
  }
}
