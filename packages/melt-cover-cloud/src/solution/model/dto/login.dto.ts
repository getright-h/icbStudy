import { Observable } from 'rxjs';

export abstract class LoginDTO {
  abstract login(params: LoginParam): Observable<any>;
  abstract getVerificationCode(codeKey: string): Observable<VCodeInfo>;
}

// 登录
export interface LoginParam {
  account: string;
  password: string;
  verificationCodeInfo: VerificationCodeInfo;
  systemCode?: string;
  systemId?: string;
}

export interface VerificationCodeInfo {
  sessionId: string;
  codeStrValue: string;
}

// 登录响应
// export interface LoginResult<any>{}

export interface VCodeInfo {
  sessionId: string;
  codeStrValue: string;
  codeImgBase64: string;
}
