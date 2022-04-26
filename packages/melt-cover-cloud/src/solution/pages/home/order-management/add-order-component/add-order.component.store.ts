import { useEffect } from 'react';
import { ShowNotification, useForm } from '@fch/fch-shop-web';
import { useStateStore } from '@fch/fch-tool';
import { message, Modal } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router';
import { debounce } from 'lodash';
import { EquityPackageManageService } from '~/solution/model/services/equity-package-manage.service';
import { CommonUtilService } from '~/solution/model/services/common-util.service';
import { GetUpLoadImageTemplateReturnDatum } from '~/solution/model/dto/common-util.dto';
import { OrderManageService } from '~/solution/model/services/order-manage.service';

import { DataList } from '~/solution/model/dto/equity-package-manage.dto';
import {
  ADD_ORDER_CERTIFICATE_TYPE_ENUM,
  ADD_ORDER_CERTIFICATE_TYPE_ENUM_KEY
} from '~/solution/shared/enums/home.enum';
import { IAddOrderState } from './add-order.interface';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';
import { uuid } from '~/framework/util/common/tool';
import { RegExpRuleArray } from '~/framework/util/rules';

export function useAddOrderStore() {
  const { state, setStateWrap } = useStateStore(new IAddOrderState());
  const formRef = useForm();
  const equityPackageManageService: EquityPackageManageService = new EquityPackageManageService();
  const commonUtilService: CommonUtilService = new CommonUtilService();
  const orderManageService: OrderManageService = new OrderManageService();
  const { equityOptions } = state;
  const history = useHistory();
  const formValue = formRef.getFieldsValue();
  const { data, refetch } = useGetDistributor();

  useEffect(() => {
    getEquityList();
    getImageTemplateList();
    formRef.resetFields();
  }, []);

  useEffect(() => {
    formRef.setSchema('distributor', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
      return schema;
    });
  }, [JSON.stringify(data)]);

  useEffect(() => {
    formRef.setSchemas({
      code: schema => {
        schema.hidden = !state.containsXiaoxiu;
      },
      equityGroupId: schema => {
        schema.props.options = state.equityDropList;
      }
    });
  }, [JSON.stringify(state.isXiaoXiu), JSON.stringify(state.equityDropList), JSON.stringify(state.containsXiaoxiu)]);

  useEffect(() => {
    if (state.isXiaoXiu) {
      formRef.setSchema('otherImages', schema => {
        const templateList = formValue.isNewVehicle ? state.newCarListTemplate : state.carListTemplate;
        const template = templateList.sort((a, b) => {
          return b.subType - a.subType;
        });
        const schemaImage: any[] = [];
        template.map((item, index) => {
          schemaImage[index] = {
            type: 'IUploadImgComponent',
            key: `template${item.id}`,
            formItemProps: {
              labelCol: { span: 24 },
              wrapperCol: { span: 24 },
              required: formValue.isNewVehicle || index < 2,
              label: item.title
            },
            props: {
              templateUrl: item.imageUrl,
              describe: item.describe,
              type: item.subType !== 2 ? 'image' : 'video',
              getFileList: (url: any) => {
                if (index == 0 && formValue.isNewVehicle) {
                  handleUploadFile(url?.[0], 'template3', item);
                  return;
                }
                if (index == 1 && !formValue.isNewVehicle) {
                  handleUploadFile(url?.[0], 'template1', item);
                  return;
                }
              },
              defaultFileList: formValue[`template${item.id}`] && [
                {
                  uid: uuid(9, 10),
                  name: item.title,
                  url: formValue[`template${item.id}`]?.[0]
                }
              ]
            }
          };
          return item;
        });
        schema.children = schemaImage || [];
        return schema;
      });
    }
  }, [JSON.stringify(formValue.isNewVehicle), JSON.stringify(state.isXiaoXiu)]);

  useEffect(() => {
    formRef.setSchema('certificateNumber', schema => {
      schema.formItemProps.rules = formValue.certificateType == 1 ? [RegExpRuleArray[0]] : [RegExpRuleArray[1]];
      return schema;
    });
  }, [formValue.certificateType]);

  const watch = {
    distributor: (val: any) => {
      handleGetDropEquity(val.key);
      CheckIsUploadVehicleImages(val.key);
    },
    equityGroupId: (val: string) => {
      const equityContainsXiaoxiu = equityOptions.find(item => item.id == val);
      const contains = equityContainsXiaoxiu.equityList.find(it => it.type == 1);
      console.log('===>contains', contains, !!contains);
      setStateWrap({
        containsXiaoxiu: !!contains
      });
      formRef.setSchema('amount', schema => {
        schema.props.disabled = !equityContainsXiaoxiu.customPrice;
      });
      formRef.setFieldsValue({
        amount: equityContainsXiaoxiu?.price || 0
      });
    },
    ownerType: () => {
      formRef.resetFields(['certificateNumber', 'certificateType', 'ownerName', 'purchaseTime']);
    },
    isNewVehicle: (val: boolean) => {
      setStateWrap({
        isNew: val
      });
      return false;
    },
    certificateType: (val: number) => {
      formRef.setSchema('certificateNumber', schema => {
        schema.formItemProps.rules = val == 1 ? [RegExpRuleArray[0]] : [RegExpRuleArray[1]];
        return schema;
      });
      return false;
    },
    certificateFront: (val: string[]) => {
      const formValue = formRef.getFieldsValue();
      val?.[0] && handleUploadFile(val?.[0], formValue.ownerType == 1 ? 'certificateFront' : 'certificateFrontCompany');
    }
  };

  function CheckIsUploadVehicleImages(orgId = formValue['distributor']?.key, isNewVehicle = formValue.isNewVehicle) {
    commonUtilService.CheckIsUploadVehicleImages({ orgId, isNewVehicle }).subscribe(res => {
      setStateWrap({
        isXiaoXiu: res
      });
    });
  }

  function handleGetDropEquity(id: string, callback?: Function) {
    equityPackageManageService
      .getEquityNoPageChildList({ distributorId: id, status: 1, isTest: false })
      .subscribe(res => {
        const list = res?.map(item => {
          const obj: any = {};
          obj.label = item.name;
          obj.value = item.id;
          return obj;
        });
        setStateWrap({
          equityDropList: list
        });
        formRef.resetFields(['equityGroupId']);
        callback && callback(res);
      });
  }

  function getEquityList() {
    const req: any = {};
    equityPackageManageService.getEquityNoPageList(req).subscribe(res => {
      setStateWrap({ equityOptions: res });
    });
  }

  function getImageTemplateList() {
    commonUtilService.GetUpLoadImageTemplate(0).subscribe(res => {
      setStateWrap({
        carListTemplate: res
      });
    });
    commonUtilService.GetUpLoadImageTemplate(3).subscribe(res => {
      setStateWrap({
        newCarListTemplate: res
      });
    });
  }

  function handleSubmit() {
    const formValues = formRef.getFieldsValue();
    formRef.validateFields().then(() => {
      const { newCarListTemplate, carListTemplate, equityOptions } = state;
      const tempNew = JSON.parse(JSON.stringify(newCarListTemplate));
      const tempOld = JSON.parse(JSON.stringify(carListTemplate));
      const inputCode = formValues?.code && JSON.parse(JSON.stringify(formValues.code));
      console.log(formValues);
      let isXiaoXiuFlag = false;
      equityOptions.length > 0 &&
        equityOptions.map((item: DataList) => {
          if (item.id == formValues.equityGroupId) {
            item.equityList.map(it => {
              it.type == 1 ? (isXiaoXiuFlag = true) : '';
            });
          }
        });
      console.log('isXiaoXiuFlag===>', isXiaoXiuFlag);
      const req: any = Object.assign({}, formValues, {
        purchaseTime: moment(formValues.purchaseTime).format('YYYY-MM-DD'),
        certificateFront: formValues.certificateFront?.[0],
        reverseSideOfCertificate: formValues.reverseSideOfCertificate?.[0],
        distributorId: formValues.distributor?.value,
        distributorName: formValues.distributor?.label,
        currentImageTemplt: formValues.isNewVehicle ? state.newCarListTemplate : state.carListTemplate,
        images: (formValues.isNewVehicle ? tempNew : tempOld).map(
          (item: { status: number; imageUrl: any; id: any }) => {
            if (formValues[`template${item.id}`]) {
              //
              item.status = 0;
              item.imageUrl = formValues[`template${item.id}`]?.[0];
            }
            return item;
          }
        ),
        brandId: formValues?.viche[0]?.id,
        brandName: formValues?.viche[0]?.name,
        factoryId: formValues?.viche[1]?.id,
        factoryName: formValues?.viche[1]?.name,
        versionId: formValues?.viche[2]?.id,
        versionName: formValues?.viche[2]?.name,
        code: inputCode?.code,
        requestId: inputCode?.requestId,
        ImageTemplateKey: process.env.IMAGE_TEMPLATE_KEY
      });
      Modal.confirm({
        title: '操作提示',
        content: '提交订单后，将无法修改变更，请再次确认订单信息',
        onOk: () => {
          setStateWrap({
            isLoading: true
          });
          orderManageService.addOrder(req).subscribe(
            () => {
              message.info('添加订单成功');
              history.goBack();
            },
            () => {
              setStateWrap({
                isLoading: false
              });
            },
            () => {
              setStateWrap({
                isLoading: false
              });
            }
          );
        }
      });
    });
  }

  function goBack() {
    history.goBack();
  }

  function reset() {}

  function handleUploadFile(url: string, type?: string, item?: GetUpLoadImageTemplateReturnDatum) {
    switch (type) {
      case 'certificateFront':
        handleOcr(url, type);
        break;
      case 'certificateFrontCompany':
        handleOcr(url, type);
        break;
      case 'template3':
        handleOcr(url, type, item);
        break;
      case 'template1':
        handleOcr(url, type, item);
        break;
    }
  }

  // 图片识别
  function handleOcr(url: string, type: string, item?: GetUpLoadImageTemplateReturnDatum) {
    const orcType = ADD_ORDER_CERTIFICATE_TYPE_ENUM_KEY[type];
    commonUtilService
      .OcrScan({ path: url, type: (ADD_ORDER_CERTIFICATE_TYPE_ENUM[orcType] as unknown) as number })
      .subscribe(res => {
        switch (type) {
          case 'certificateFront':
            formRef.setFieldsValue({
              ownerName: res?.name,
              certificateNumber: res?.idNumber
            });
            break;
          case 'certificateFrontCompany':
            formRef.setFieldsValue({
              certificateNumber: res?.socialCreditCode,
              ownerName: res?.unitName
            });
            break;
          case 'template3':
            if (moment(res?.words_result?.invoiceDate).isValid()) {
              if (
                moment(res?.words_result?.invoiceDate) < moment() &&
                moment(res?.words_result?.invoiceDate) > moment().subtract(15, 'days')
              ) {
                formRef.setFieldsValue({
                  purchaseTime: moment(res?.words_result?.invoiceDate),
                  ownerVinNo: res?.words_result?.vinNum
                });
              } else {
                ShowNotification.error('请上传新车购车发票');
              }
            } else {
              ShowNotification.info('发票时间识别失败,请手动选择时间');
              formRef.setFieldsValue({
                ownerVinNo: res?.words_result?.vinNum
              });
            }
            break;
          case 'template1':
            if (moment(res?.dateOfRegistration).isValid()) {
              if (
                moment(res?.dateOfRegistration) < moment().subtract(15, 'days') &&
                moment(res?.dateOfRegistration) > moment().subtract(8, 'year')
              ) {
                formRef.setFieldsValue({
                  purchaseTime: moment(res?.dateOfRegistration),
                  ownerVinNo: res?.vehicleIdentificationNumber,
                  ownerPlateNo: res?.plateNumber
                });
              } else {
                ShowNotification.error('请上传在用车行驶证（大于八年，小于当前时间15天）');
              }
            } else {
              ShowNotification.info('行驶证时间识别失败,请手动选择时间');
              formRef.setFieldsValue({
                ownerVinNo: res?.vehicleIdentificationNumber,
                ownerPlateNo: res?.plateNumber
              });
            }
            break;
        }
      });
  }
  return { state, formRef, handleSubmit, goBack, reset, handleUploadFile, watch };
}
