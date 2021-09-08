import { IFormBaseComponentsUnion, TypeUseForm } from '@fch/fch-shop-web';
import { FormLayout } from 'antd/lib/form/Form';
import moment from 'moment';
import React from 'react';
import { IRenderFormItem } from '~/framework/components/standard-form-component/standard-form.interface';
import { uuid } from '~/framework/util/common/tool';
import { RegExpRuleArray } from '~/framework/util/rules';
import { GetUpLoadImageTemplateReturnDatum } from '~/solution/model/dto/common-util.dto';
import { DataList } from '~/solution/model/dto/equity-package-manage.dto';
import { certificateList } from '~/solution/shared/constant/select.const';
import { renderToolTip } from './add-order.component';

/**
 * @export state变量定义和初始化
 * @class IAddOrderState
 */
export class IAddOrderState {
  count: 0;
  equityOptions: DataList[];
  newCarListTemplate: GetUpLoadImageTemplateReturnDatum[];
  carListTemplate: GetUpLoadImageTemplateReturnDatum[];
  isLoading = false;
  equityDropList: DataList[] = [];
  isXiaoXiu = false;
  isNew = true;
}

export interface IProps {
  callback: (params: IRenderFormItem) => React.ReactNode;
  layout: FormLayout;
  columns: number;
}

export interface IConfigProps {
  formRef?: TypeUseForm;
  renderToolTip?: Function;
  stateParent?: IAddOrderState;
  handleUploadFile?: Function;
}

export interface IOptions {
  label: string;
  value: string;
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'container1',
        type: 'Layout',
        children: [
          {
            key: 'userBaseInfo',
            type: 'h3',
            children: [
              {
                key: 'userBaseInfoTitle',
                type: 'strong',
                children: '客户基本信息'
              }
            ],
            props: {
              style: {
                gridColumn: '1 / 3'
              }
            }
          },
          {
            key: 'distributor',
            type: 'Select',
            formItemProps: {
              label: '创建机构',
              required: true
            },
            props: {
              placeholder: '请选择创建机构',
              allowClear: true,
              labelInValue: true,
              filterOption: false,
              options: [],
              showSearch: true
            }
          },
          {
            key: 'equityGroupId',
            type: 'Select',
            formItemProps: {
              label: '套餐包',
              required: true
            },
            props: {
              placeholder: '请选择套餐包',
              allowClear: true,
              options: []
            }
          },
          {
            key: 'ownerType',
            type: 'RadioGroup',
            formItemProps: {
              required: true,
              initialValue: 1,
              label: '车主类型'
            },
            props: {
              optionType: 'button',
              buttonStyle: 'solid',
              allowClear: true,
              options: [
                { label: '个人', value: 1 },
                { label: '企业', value: 2 }
              ]
            }
          },
          {
            key: 'certificateType',
            type: 'Select',
            formItemProps: {
              label: '证件类型',
              required: true
            },
            props: {
              placeholder: '请选择证件类型',
              allowClear: true,
              options: `{{formData.ownerType == 1 ? ${JSON.stringify(certificateList[0])} : ${JSON.stringify(
                certificateList[1]
              )}}}`
            }
          },
          {
            key: 'certificateNumber',
            type: 'Input',
            formItemProps: {
              label: '证件号码',
              required: true,
              rules: []
            },
            props: {
              placeholder: '请输入证件号码',
              allowClear: true
            }
          },
          {
            key: 'ownerName',
            type: 'Input',
            formItemProps: {
              label: '车主姓名',
              required: true
            },
            props: {
              placeholder: '请输入车主姓名',
              allowClear: true
            }
          },
          {
            key: '{{formData.ownerType == 1 ? "ownerMobile" : "companyMobile"}}',
            type: 'Input',
            formItemProps: {
              label: '{{formData.ownerType == 1 ? "车主手机号" : "公司电话"}}',
              required: true
            },
            props: {
              placeholder: '{{formData.ownerType == 1 ? "请输入车主手机号" : "请输入公司电话"}}',
              allowClear: true
            }
          },
          {
            key: 'ownerMobile',
            type: 'Input',
            hidden: '{{formData.ownerType == 1}}',
            formItemProps: {
              label: '车辆使用人电话',
              required: true,
              rules: [RegExpRuleArray[2]]
            },
            props: {
              placeholder: '请输入车辆使用人电话',
              allowClear: true
            }
          },
          {
            key: 'code',
            type: 'CodeInputComponent',
            hidden: true,
            formItemProps: {
              label: '手机验证码',
              required: true
            },
            props: {
              phone: '{{formData.ownerMobile}}',
              placeholder: '验证码',
              allowClear: true
            }
          },
          {
            key: 'carBaseInfo',
            type: 'h3',
            children: [
              {
                key: 'carBaseInfoTitle',
                type: 'strong',
                children: '车辆信息'
              }
            ],
            props: {
              style: {
                gridColumn: '1 / 3'
              }
            }
          },
          {
            key: 'isNewVehicle',
            type: 'RadioGroup',
            formItemProps: {
              initialValue: true,
              required: true,
              label: '是否在用车'
            },
            props: {
              optionType: 'button',
              buttonStyle: 'solid',
              allowClear: true,
              options: [
                { label: '新车', value: true },
                { label: '在用车', value: false }
              ]
            }
          },
          {
            key: 'purchaseTime',
            type: 'DatePicker',
            hidden: '{{formData.isNewVehicle}}',
            formItemProps: {
              required: true,
              label: '购车时间'
            },
            props: {
              placeholder: '请选择购车时间',
              allowClear: true,
              disabledDate: date => {
                return date > moment().subtract(15, 'days') || date < moment().subtract(8, 'year');
              }
            }
          },
          {
            key: 'purchaseTime',
            type: 'DatePicker',
            hidden: '{{!formData.isNewVehicle}}',
            formItemProps: {
              required: true,
              label: '购车时间'
            },
            props: {
              placeholder: '请选择购车时间',
              allowClear: true,
              disabledDate: date => {
                return date > moment() || date <= moment().subtract(15, 'days');
              }
            }
          },
          {
            key: 'ownerVinNo',
            type: 'Input',
            formItemProps: {
              label: '车架号',
              required: true,
              rules: [RegExpRuleArray[3]]
            },
            props: {
              placeholder: '请输入车架号',
              allowClear: true
            }
          },
          {
            key: 'ownerPlateNo',
            type: 'Input',
            formItemProps: {
              label: '车牌号',
              required: '{{!formData.isNewVehicle}}',
              rules: [RegExpRuleArray[4], { min: 7, message: '车牌号至少七位' }]
            },
            props: {
              placeholder: '请输入车牌号',
              allowClear: true
            }
          },
          {
            key: 'viche',
            type: 'LazyOptionosCascaderComponent',
            formItemProps: {
              label: '车型',
              required: true
            },
            props: {
              placeholder: '请选择车型',
              allowClear: true
            }
          },
          {
            key: 'orderBaseInfo',
            type: 'h3',
            children: [
              {
                key: 'orderBaseInfoTitle',
                type: 'strong',
                children: '订单信息'
              }
            ],
            props: {
              style: {
                gridColumn: '1 / 3'
              }
            }
          },
          {
            key: 'amount',
            type: 'Input',
            formItemProps: {
              label: '套餐包金额'
            },
            props: {
              disabled: true
            }
          },
          {
            key: 'isScatteredUser',
            type: 'RadioGroup',
            formItemProps: {
              initialValue: false,
              required: true,
              label: renderToolTip()
            },
            props: {
              optionType: 'button',
              buttonStyle: 'solid',
              allowClear: true,
              options: [
                { label: '非散户', value: false },
                { label: '散户', value: true }
              ]
            }
          },
          {
            key: 'remark',
            type: 'Input',
            formItemProps: {
              label: '订单备注'
            },
            props: {
              placeholder: '请输入订单备注',
              allowClear: true
            }
          }
        ],
        props: {
          style: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(12, minmax(0, 55px))'
          }
        }
      },
      {
        key: 'container2',
        type: 'Layout',
        children: [
          {
            type: 'IUploadImgComponent',
            key: 'certificateFront',
            hidden: '{{formData.ownerType == 2}}',
            formItemProps: {
              labelCol: { span: 24 },
              wrapperCol: { span: 24 },
              label: '车主证件照(正面)'
            },
            props: {
              defaultFileList: `{{formData.certificateFront?.[0]&&[{uid: ${uuid(
                9,
                10
              )},name: '车主证件照(正面)',url: formData.certificateFront?.[0]}]}}`
            }
          },
          {
            type: 'IUploadImgComponent',
            key: 'reverseSideOfCertificate',
            hidden: '{{formData.ownerType == 2}}',
            formItemProps: {
              labelCol: { span: 24 },
              wrapperCol: { span: 24 },
              label: '车主证件照(反面)'
            },
            props: {
              defaultFileList: `{{formData.reverseSideOfCertificate?.[0]&&[{uid: ${uuid(
                9,
                10
              )},name: '车主证件照(反面)',url: formData.reverseSideOfCertificate?.[0]}]}}`
            }
          },
          {
            type: 'IUploadImgComponent',
            key: 'certificateFront',
            hidden: '{{formData.ownerType != 2}}',
            formItemProps: {
              labelCol: { span: 24 },
              wrapperCol: { span: 24 },
              label: '企业执照副本'
            },
            props: {
              defaultFileList: `{{formData.reverseSideOfCertificate?.[0]&&[{uid: ${uuid(
                9,
                10
              )},name: '企业执照副本',url: formData.reverseSideOfCertificate?.[0]}]}}`
            }
          },
          {
            type: 'IUploadImgComponent',
            key: 'additionalImages',
            formItemProps: {
              labelCol: { span: 24 },
              wrapperCol: { span: 24 },
              label: '附加图片'
            },
            props: {
              maxImgNumber: 5,
              style: {
                gridColumn: '1 / 5'
              }
            }
          },
          {
            type: 'div',
            key: 'otherImages',
            children: [],
            props: {
              style: {
                gridColumn: '1 / 5',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(2, minmax(0, 170px))'
              }
            }
          }
        ],
        props: {
          style: {
            padding: '46px',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(2, minmax(0, 170px))'
          }
        }
      }
    ],
    props: {
      style: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
      }
    }
  }
];
