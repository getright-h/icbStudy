import { ICodeInputState } from './code-input.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { CommonUtilService } from '~/solution/model/services/common-util.service';
import { useEffect } from 'react';
let clickFlag = false;
export function useCodeInputStore() {
  const { state, setStateWrap } = useStateStore(new ICodeInputState());
  const commonUtilService: CommonUtilService = new CommonUtilService();

  useEffect(() => {
    clickFlag = false;
  }, []);

  function changePhone(value: any) {
    setStateWrap({
      code: value
    });
  }
  // 获取验证码
  function getVerificationCode(phone: string) {
    console.log('clickFlag===>', clickFlag);
    if (!clickFlag) {
      clickFlag = true;
      commonUtilService.getCode(phone).subscribe(
        res => {
          handleWaitTime();
          setStateWrap({ requestId: res.requestId });
          console.log('rescode===>', res);
        },
        () => {
          clickFlag = false;
        }
      );
    }
  }
  function handleWaitTime() {
    let waitTime = 60;
    const TimeId = setInterval(function() {
      setStateWrap({ waitTime: waitTime - 1 });
      waitTime--;
      if (waitTime < 1) {
        clearInterval(TimeId);
        clickFlag = false;
        setStateWrap({ waitTime: 60 });
      }
    }, 1000);
  }
  return { state, changePhone, getVerificationCode };
}
