import * as React from 'react';
import { Button, Modal } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { ISelectAccount, ISelectCard, IUploadStableComponent } from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';
import { PayOptions, PAY_ENUM } from '~/solution/shared/constant/currency.const';
import { options } from '~/framework/components/i-home-header-component/i-home-header.module.less';
import IUploadComponent from '~/framework/components/i-upload-component/i-upload.component';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: any;
}

/**req 获取机构下拉框选项 */
export default function AddEquityModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent } = props;
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        schema={schema}
        widget={{
          IUploadStableComponent,
          ISelectAccount: ISelectAccount,
          ISelectCard: ISelectCard
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
        key: 'bagId',
        type: 'ISelectAccount',
        formItemProps: {
          label: '充值账户',
          required: true
        },
        props: {
          isPreload: true
        }
      },
      {
        type: 'ISelectCard',
        key: 'businessId',
        formItemProps: {
          label: '充值卡券',
          required: true
        },
        props: {
          isPreload: true
        }
      },
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
          label: '充值金额',
          required: true
        },
        props: {
          placeholder: '填写充值金额'
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
