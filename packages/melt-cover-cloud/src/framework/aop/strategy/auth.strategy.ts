import { StorageUtil } from '~/framework/util/storage';
import { Strategy } from './base.strategy';

export class AuthStrategy extends Strategy {
  constructor() {
    super();
  }
  canActive() {
    const token = StorageUtil.getLocalStorage('token');
    if (!!token) return true;
    return '/login';
  }
}
