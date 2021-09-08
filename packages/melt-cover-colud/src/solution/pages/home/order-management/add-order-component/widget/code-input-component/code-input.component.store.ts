import { useEffect, useRef } from 'react';
import { useStateStore } from '@fch/fch-tool';
import { ICodeInputState } from './code-input.interface';
import { CommonUtilService } from '~/solution/model/services/common-util.service';

export function useCodeInputStore() {
  const { state, setStateWrap } = useStateStore(new ICodeInputState());
  const commonUtilService: CommonUtilService = new CommonUtilService();
  const clickFlag = useRef(false);
  useEffect(() => {
    clickFlag.current = false;
  }, []);

  function changePhone(value: any) {
    setStateWrap({
      code: value
    });
  }
  // 获取验证码
  function getVerificationCode(phone: string) {
    if (!clickFlag.current) {
      clickFlag.current = true;
      commonUtilService.getCode(phone).subscribe(
        res => {
          handleWaitTime();
          setStateWrap({ requestId: res.requestId });
        },
        () => {
          clickFlag.current = false;
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
        clickFlag.current = false;
        setStateWrap({ waitTime: 60 });
      }
    }, 1000);
  }
  return { state, changePhone, getVerificationCode };
}
