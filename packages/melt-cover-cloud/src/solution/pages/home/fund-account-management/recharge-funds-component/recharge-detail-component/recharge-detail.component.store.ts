import { IRechargeDetailState, TableType } from './recharge-detail.interface';
import { useStateStore, getQueryString } from '@fch/fch-tool';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '@fch/fch-shop-web';
import { useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';

export function useRechargeDetailStore() {
  const { state, setStateWrap } = useStateStore(new IRechargeDetailState());
  const id = getQueryString('id');
  // 是否为充值审核
  const isExamine = !!getQueryString('examine');
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

  const history = useHistory();

  useEffect(() => {
    getDetail();
  }, []);

  function getDetail() {
    fundsOrganizitonOtherService.assetsDetail({ recordId: id }).subscribe(res => setStateWrap({ info: res }));
  }

  function goback() {
    history.goBack();
  }

  function examineFn() {
    form.validateFields().then((values: any) => {
      fundsOrganizitonOtherService.audit({ recordId: id, ...values }).subscribe(_ => {
        message.success('审核成功');
        goback();
      });
    });
  }

  const [form] = Form.useForm();

  // 交易明细切换 显示
  function changeRaido(e: any) {
    console.log('e===>', e);
    setStateWrap({
      radio: e.target.value
    });
  }

  // 交易明细切换 获取表单数据
  function changeTablePageIndex(index: number, size: number, formType: string) {
    setStateWrap({ [`${formType}SearchForm`]: { index, size } });
    switch (formType) {
      case TableType.INCOME:
        getIncomeTableData();
        break;
      case TableType.SPENDING:
        getSpendingTableData();
        break;
    }
  }

  // 提交充值审核 subRecharge
  function subRecharge() {}

  // 获取收入数据
  function getIncomeTableData() {
    console.log('获取收入数据');
    // todo req
  }
  // 获取支出数据
  function getSpendingTableData() {
    console.log('获取支出数据');
    // todo req
  }
  return { state, id, goback, changeRaido, changeTablePageIndex, examineFn, form, isExamine, subRecharge };
}
