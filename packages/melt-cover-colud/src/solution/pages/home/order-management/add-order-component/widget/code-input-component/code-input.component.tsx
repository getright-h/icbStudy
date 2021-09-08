import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import * as React from 'react';
import style from './code-input.component.less';
import { useCodeInputStore } from './code-input.component.store';

interface IComponentValue {
  code: any;
  requestId: string;
}

type IProps = {
  value: any;
  phone: string;
  onChange?: (props: IComponentValue) => void;
} & InputProps;

const CodeInputComponent: React.FC<InputProps> = React.memo((props: IProps) => {
  console.log(1111);

  const { value, onChange, phone } = props;
  const { state, changePhone, getVerificationCode } = useCodeInputStore();
  const triggerChange = (changedValue: any) => {
    const value = changedValue
      ? {
          code: changedValue,
          requestId: state.requestId
        }
      : undefined;
    onChange?.(value);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e===>', e);
    changePhone(e.target.value);
    triggerChange(e.target.value);
  };

  return (
    <span className={style.codeInput}>
      <Input {...props} value={value?.code} onChange={onChangeInput} style={{ width: 100 }} />
      &nbsp;
      {state.waitTime == 60 ? (
        <span
          onClick={() => {
            getVerificationCode(phone);
          }}
        >
          获取验证码
        </span>
      ) : (
        <span>{state.waitTime}s</span>
      )}
    </span>
  );
});
export default CodeInputComponent;
