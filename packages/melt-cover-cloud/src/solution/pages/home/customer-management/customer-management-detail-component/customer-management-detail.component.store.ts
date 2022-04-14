import { ICustomerManagementDetailState, TableType } from './customer-management-detail.interface';
import { useStateStore } from '@fch/fch-tool';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { CustomerManageService } from '~/solution/model/services/customer-manage.service';

export function useCustomerManagementDetailStore() {
  const { state, setStateWrap, getState } = useStateStore(new ICustomerManagementDetailState());
  const customerManageService = new CustomerManageService();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const orderId = useRef<string>('');
  const imgList = useRef<any[]>([]);

  useEffect(() => {
    orderId.current = params.id;
    getUserDetails();
    queryChargeBalance();
    getChargeTableData();
    getConsumeTableData();
  }, [params]);

  function goback() {
    history.goBack();
  }
  function changeTablePageIndex(index: number, size: number, formType: string) {
    setStateWrap({ [`${formType}SearchForm`]: { index, size } });
    switch (formType) {
      case TableType.CHARGE:
        getChargeTableData();
        break;
      case TableType.CONSUME:
        getConsumeTableData();
        break;
    }
  }

  function changeRaido(e: any) {
    console.log('e===>', e);
    setStateWrap({
      radio: e.target.value
    });
  }

  function toggleModal(curImgListType?: string) {
    curImgListType && (imgList.current = state[curImgListType]);
    setStateWrap({
      visible: !state.visible
    });
  }

  function getUserDetails() {
    customerManageService.getUserDetails(orderId.current).subscribe(res => {
      const idCardImages = [];
      res.certificateFront && idCardImages.push({ url: res.certificateFront, name: '身份证正面' });
      res.reverseSideOfCertificate && idCardImages.push({ url: res.reverseSideOfCertificate, name: '身份证反面' });
      const vehicleImages = res.vehicleImages
        .filter(img => img.status == 0)
        .map(img => {
          return { url: img.imageUrl, name: img.title, subType: img.subType };
        });
      setStateWrap({ detail: res, idCardImages, vehicleImages });
    });
  }

  function queryChargeBalance() {
    customerManageService.queryChargeBalance(orderId.current).subscribe(res => {
      setStateWrap({ chargeBalance: res });
    });
  }

  function getChargeTableData() {
    const params = {
      orderId: orderId.current,
      beginTime: 0,
      endTime: 0,
      ...getState().chargeSearchForm
    };
    customerManageService.queryChargeBalancePagedList(params).subscribe(res => {
      setStateWrap({ chargeTableData: res.dataList, chargeTotal: res.total });
    });
  }

  function getConsumeTableData() {
    const params = {
      orderId: orderId.current,
      status: 1,
      beginTime: 0,
      endTime: 0,
      ...getState().consumeSearchForm
    };
    customerManageService.queryConsumePagedList(params).subscribe(res => {
      setStateWrap({ consumeTableData: res.dataList, consumeTotal: res.total });
    });
  }
  return { state, imgList, goback, changeTablePageIndex, changeRaido, toggleModal };
}
