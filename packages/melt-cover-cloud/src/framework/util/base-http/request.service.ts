import { StorageUtil } from '~/framework/util/storage';
import { createHashHistory } from 'history';
import { ShowNotification } from '~/framework/util/common';
import { DepUtil } from '~/framework/aop/inject';
import { BaseRequestService } from '@fch/fch-tool';
const history = createHashHistory();
function getRootUrl(url: string) {
  let returnInfo = process.env.MAIN;
  if (!!~url.indexOf('/VerifyCode') || !!~url.indexOf('/Login')) {
    returnInfo = process.env.LOGIN;
  } else if (!!~url.indexOf('Appointment')) {
    returnInfo = process.env.APPOINT;
  } else if (!!~url.indexOf('order/') || !!~url.indexOf('OcrScan/')) {
    returnInfo = process.env.ORDER;
  } else if (!!~url.indexOf('prvilege/')) {
    returnInfo = process.env.PRIVILEGE;
  } else if (!!~url.indexOf('vehicleComponent')) {
    returnInfo = process.env.VIN;
  } else if (!!~url.indexOf('maintain/')) {
    returnInfo = process.env.MAINTAINCONFIG;
  } else if (!!~url.indexOf('GetUpLoadImageTemplate') || url.includes('Image/aliyun')) {
    returnInfo = process.env.TEMPLATE;
  } else if (url.includes('double/constitution')) {
    returnInfo = process.env.OPEN;
  } else {
    returnInfo = process.env.MAIN;
  }
  return returnInfo;
}

function createAuthHeaders() {
  const headers: any = { token: '' };
  const token = StorageUtil.getLocalStorage('TOKENINFO');
  if (token) {
    headers.token = token;
  }
  /** 7309开放接口需要该参数,已取消 */
  // headers.AppKey = 'c809f8299759double';

  return headers;
}

function backLoginFunction() {
  StorageUtil.removeLocalStorage('TOKENINFO');
  history.push('/login');
}

function errorMessageFunction(error: string) {
  ShowNotification.error(error);
}

@DepUtil.Injectable()
export class RequestService extends BaseRequestService {
  constructor() {
    super(getRootUrl, createAuthHeaders(), backLoginFunction, errorMessageFunction);
  }
}
