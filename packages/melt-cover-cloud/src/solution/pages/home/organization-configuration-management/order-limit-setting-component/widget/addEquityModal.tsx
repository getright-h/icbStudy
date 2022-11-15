import * as React from 'react';
import { Button, Modal, TreeSelect } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { IUploadImgComponent } from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';
import { EQYITY_TYPE, EQYITY_USE_TYPE } from '~/solution/shared/enums/home.enum';
import { IOrderLimitSettingState } from '../order-limit-setting.interface';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IOrderLimitSettingState;
}

export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
        widget={{
          IUploadImgComponent: IUploadImgComponent
        }}
        props={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          style: { width: '100%' }
        }}
      />
    );
  }

  return (
    <div>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <>
            <Button type="primary" onClick={handleCancel}>
              取消
            </Button>
            <Button loading={stateParent.isLoadingModal1} type="primary" onClick={handleOk}>
              确定
            </Button>
          </>
        }
      >
        {renderForm()}
      </Modal>
    </div>
  );
}

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'typeConfig',
        type: 'Select',
        formItemProps: {
          label: '权益展示配置',
          required: true
        },
        props: {
          placeholder: '请选择权益展示配置',
          allowClear: true,
          options: [
            { label: '基础版', value: EQYITY_TYPE.BASE },
            { label: '小程序', value: EQYITY_TYPE.MINIPROGRAME },
            { label: 'H5', value: EQYITY_TYPE.H5 }
          ]
        }
      },
      {
        key: 'useType',
        type: 'CheckboxGroup',
        hidden: '{{formData.typeConfig!==' + EQYITY_TYPE.BASE + '}}',
        formItemProps: {
          label: '基础版使用方式',
          initialValue: ['1'],
          required: true
        },
        props: {
          placeholder: '请选择权益展示配置',
          options: [
            { label: '按订单金额百分比', value: '1' },
            { label: '按次数使用', value: '2' }
          ]
        }
      },
      {
        key: 'path',
        type: 'Input',
        hidden: '{{formData.typeConfig!==' + EQYITY_TYPE.MINIPROGRAME + '}}',
        formItemProps: {
          label: '小程序地址配置',
          required: true
        },
        props: {
          placeholder: '请输入小程序地址配置',
          allowClear: true
        }
      },
      {
        key: 'path',
        type: 'Input',
        hidden: '{{formData.typeConfig!==' + EQYITY_TYPE.H5 + '}}',
        formItemProps: {
          label: 'h5地址配置',
          required: true
        },
        props: {
          placeholder: '请输入h5地址配置',
          allowClear: true
        }
      },
      {
        key: 'isParentSelected',
        type: 'RadioGroup',
        formItemProps: {
          label: '下级机构是否必选',
          required: true,
          initialValue: true
        },
        props: {
          placeholder: '请选择下级机构',
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        }
      },
      {
        key: 'selectionOrgs',
        type: 'TreeSelect',
        hidden: '{{!formData.isParentSelected}}',
        formItemProps: {
          label: '必选的机构',
          required: true
        },
        props: {
          placeholder: '请选择下级机构',
          allowClear: true,
          treeCheckable: true,
          maxTagCount: 3,
          treeCheckStrictly: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
          dropdownStyle: { maxHeight: 600, overflow: 'auto' },
          fieldNames: { label: 'name', value: 'id' },
          treeData: []
        }
      },
      {
        type: 'Select',
        key: 'type',
        hidden: '{{formData.typeConfig==' + EQYITY_TYPE.BASE + '}}',
        formItemProps: {
          label: '权益类型',
          required: true
        },
        props: {
          placeholder: '请选择权益类型',
          options: [
            { label: '无', value: EQYITY_USE_TYPE.NO },
            { label: '小修宝', value: EQYITY_USE_TYPE.XIAOXIUBAO }
          ]
        }
      },
      {
        key: 'name',
        type: 'Input',
        formItemProps: {
          label: '权益名',
          required: true
        },
        props: {
          placeholder: '权益最多不超过10个字',
          allowClear: true
        }
      },
      {
        key: 'profile',
        type: 'Input',
        formItemProps: {
          label: '权益简介',
          required: true
        },
        props: {
          placeholder: '权益简介最多不超过40个字',
          allowClear: true
        }
      },
      {
        key: 'description',
        type: 'TextArea',
        hidden: '{{formData.typeConfig != 1}}',
        formItemProps: {
          label: '权益说明',
          required: true
        },
        props: {
          placeholder: '字数限制不超过500字',
          allowClear: true,
          rows: 5
        }
      },
      {
        key: 'remark',
        type: 'TextArea',
        hidden: '{{formData.typeConfig != 1}}',
        formItemProps: {
          label: '权益使用',
          required: true
        },
        props: {
          placeholder: '字数限制不超过500字',
          allowClear: true,
          rows: 5
        }
      },
      {
        type: 'IUploadImgComponent',
        key: 'icon',
        formItemProps: {
          label: '权益图标',
          required: true
        },
        props: {
          defaultFileList: `{{formData.icon?.[0]&&[{uid: ${uuid(9, 10)},name: '权益图标',url: formData.icon?.[0]}]}}`
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
