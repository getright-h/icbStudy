import * as React from 'react';
import { Button, Modal } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import {
  ISelectAccount,
  ISelectCard,
  IUploadStableComponent,
  ISelectAccountFilter
} from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';
import { PayOptions, PAY_ENUM } from '~/solution/shared/constant/currency.const';
import { options } from '~/framework/components/i-home-header-component/i-home-header.module.less';
import IUploadComponent from '~/framework/components/i-upload-component/i-upload.component';
import { useRef } from 'react';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: any;
}
//

/**req 获取机构下拉框选项 */
export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  const schema: IFormBaseComponentsUnion[] = [
    {
      key: 'container',
      type: 'Layout',
      children: [
        {
          key: 'bagId',
          type: 'ISelectAccountFilter',
          formItemProps: {
            label: '充值账户',
            required: true
          },
          props: {
            isPreload: true,
            isSendObj: true,
            onChange: bagChange
          }
        },
        {
          type: 'Select',
          key: 'businessId',
          formItemProps: {
            label: '充值卡券',
            required: true
          },
          props: {
            options: [],
            placeholder: '请选择卡券'
          }
        },
        /* {
          type: 'ISelectCard',
          key: 'businessId',
          formItemProps: {
            label: '充值卡券',
            required: true
          },
          props: {
            isPreload: true
          }
        }, */
        {
          key: 'type',
          type: 'Select',
          formItemProps: {
            label: '支付类型',
            required: true,
            initialValue: PAY_ENUM.other,
            wrapperCol: { span: 10 }
          },
          props: {
            options: PayOptions
          }
        },
        {
          key: 'number',
          type: 'Input',
          formItemProps: {
            label: '充值金额(虚拟货币)',
            required: true
          },
          props: {
            placeholder: '填写充值金额(虚拟货币)',
            addonAfter: '虚拟货币'
          }
        },
        {
          key: 'remark',
          type: 'Input',
          formItemProps: {
            label: '备注'
          },
          props: {
            placeholder: '填写备注'
          }
        },
        {
          type: 'IUploadStableComponent',
          key: 'receiptImage',
          formItemProps: {
            label: '附件凭证',
            valuePropName: 'fileList'
          },
          props: {
            listType: 'picture-card'
          }
        }
      ],
      props: {
        cols: 1
      }
    }
  ];
  function bagChange(value: string, data: any) {
    form.setSchema('businessId', (schema: any) => {
      schema.props.options = data?.info?.bagRelations?.map((m: any) => {
        console.log('wuhu', m);
        return {
          value: m?.businessId,
          label: m?.businessName
        };
      });
    });
    form.setFieldsValue({ businessId: undefined });
    console.log('cardSets data', data);
    // console.log('cardSets foo.current', foo);
  }
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
        widget={{
          IUploadStableComponent,
          ISelectAccount: ISelectAccount,
          ISelectCard: ISelectCard,
          ISelectAccountFilter
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
