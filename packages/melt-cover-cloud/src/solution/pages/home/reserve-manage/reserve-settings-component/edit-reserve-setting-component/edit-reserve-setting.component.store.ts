import { useEffect } from 'react';
import { useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { debounce } from 'lodash';
import { IEditReserveSettingProps, IEditReserveSettingState } from './edit-reserve-setting.interface';
import { AppointmentTypeConst } from '~/solution/shared/enums/reserve.enum';
import { AppointConfigListData } from '~/solution/model/dto/reserve-manage.dto';
import { ShowNotification } from '~/framework/util/common';
import { ReserveManageService } from '~/solution/model/services/reserve-manage.service';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';

export function useEditReserveSettingStore(props: IEditReserveSettingProps) {
  const { state, setStateWrap } = useStateStore(new IEditReserveSettingState());
  const reserveManageService = new ReserveManageService();
  const formRef = useForm();
  const { refetch, data } = useGetDistributor();
  useEffect(() => {
    props.initData && initFormValues(props.initData);
  }, [props.initData]);

  useEffect(() => {
    formRef.setSchema('bitwise', schema => {
      schema.props.options = AppointmentTypeConst;
      return schema;
    });
    formRef.setSchema('distributorId', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
      return schema;
    });
  }, [JSON.stringify(data)]);

  function initFormValues(data: AppointConfigListData) {
    formRef.setFieldsValue({ ...props.initData });
    let selectedTags: any[] = [];
    let bitwiseContents: any[] = [];
    // if (data.bitwiseContent) {
    //   bitwiseContents = data.bitwiseContent.split(',');
    //   selectedTags = AppointmentTypeConst.filter(tag => {
    //     return ~bitwiseContents.indexOf(tag.label);
    //   }).map(tag => tag.value);
    // }
    if (data.bitwiseContent) {
      bitwiseContents = data.bitwiseContent.split(',');
      selectedTags = AppointmentTypeConst.filter(tag => {
        return ~bitwiseContents.indexOf(tag.label);
      }).map(tag => tag);
    }
    // formRef.setSchema('bitwise', schema => {
    //   schema.props.value = selectedTags;
    //   return schema;
    // });
    formRef.setFieldsValue({
      bitwise: selectedTags
    });
    setStateWrap({ selectedTags });
  }

  function handleFormChange(values: any) {
    console.log(values);
  }

  function changeSelectTags(tagKey: number, checked: boolean) {
    let { selectedTags } = state;
    if (checked) {
      selectedTags.push(tagKey);
    } else {
      selectedTags = selectedTags.filter(t => t !== tagKey);
    }
    let bitwise = 0;
    selectedTags.forEach(element => {
      bitwise += element;
    });
    formRef.setFieldsValue({ bitwise });
    setStateWrap({ selectedTags });
  }

  function getTimePeriod(values: any) {
    formRef.setFieldsValue({ space: values });
  }

  function submitForm(v: any) {
    console.log('formRef Val===>', v);
    let bitwise = 0;
    setStateWrap({ loading: true });
    v.bitwise.forEach((element: any) => {
      bitwise += element.value;
    });
    const params = {
      ...v,
      id: props.initData?.id,
      bitwise
      // distributorName: v.distributor?.name
    };
    const url: string = !!props.initData?.id ? 'putAppointmentConfigList' : 'setAppointmentConfigList';
    reserveManageService[url](params).subscribe(
      () => {
        ShowNotification.success('预约设置成功');
        setStateWrap({ loading: false });
        props?.close(true);
      },
      () => {
        setStateWrap({ loading: false });
      }
    );
  }
  return { state, formRef, handleFormChange, changeSelectTags, getTimePeriod, submitForm };
}
