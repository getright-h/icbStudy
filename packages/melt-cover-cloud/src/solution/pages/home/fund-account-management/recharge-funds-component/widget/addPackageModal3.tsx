import { Modal, Typography } from 'antd';
import * as React from 'react';
import {
  IFormBaseComponentsUnion,
  TypeUseForm,
  IFormComponent,
  FormRenderItem,
  IPreviewImgComponent
} from '@fch/fch-shop-web';
import { IWidget } from '@fch/fch-shop-web/dist/src/IFormRenderComponent/form-render.interface';
import { IRechargeFundsState } from '../recharge-funds.interface';
import { RechargePagedListResType } from '~/solution/model/dto/funds-organiziton-other.dto';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk?: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IRechargeFundsState;
  handleFormChangeEvent?: Function;
  watch2?: IWidget;
}

export default function AddPackageModalComponent3(props: IAddEquityProps) {
  const { title, form, handleCancel, visible, stateParent, watch2 } = props;

  const renderContent = (props: any) => {
    const { renderItem } = props;
    return <div>{schema.map(renderItem)}</div>;
  };
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        watch={watch2}
        schema={schema}
        widget={{ Text: Typography.Text, Img: IPreviewImgComponent }}
        slot={renderContent}
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
      <Modal width={700} footer={null} title={title} onCancel={handleCancel} visible={visible}>
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
        key: 'bagNumber',
        type: 'Text',
        formItemProps: {
          label: '账户名',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'bagName',
        type: 'Text',
        formItemProps: {
          label: '账户号',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'totalInCome',
        type: 'Text',
        formItemProps: {
          label: '账户累计充值总额',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'balance',
        type: 'Text',
        formItemProps: {
          label: '账户资金余额',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'number',
        type: 'Text',
        formItemProps: {
          label: '充值金额',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'createTime',
        type: 'Text',
        formItemProps: {
          label: '创建时间',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'bagTypeText',
        type: 'Text',
        formItemProps: {
          label: '支付类型',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'remark',
        type: 'Text',
        formItemProps: {
          label: '充值备注',
          required: true,
          valuePropName: 'children'
        }
      },
      {
        key: 'remark',
        type: 'Img',
        formItemProps: {
          valuePropName: 'children',
          label: '附件图片',
          // style: { width: '50px' },
          wrapperCol: { span: 10 }
        },
        props: {
          src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          // style: { width: '50px' }
        }
      },
      {
        key: 'auditStateText',
        type: 'Text',
        formItemProps: {
          label: '审核结果',
          required: true
        }
      },
      {
        key: 'auditRemark',
        type: 'Text',
        formItemProps: {
          label: '审核备注'
        }
      },
      {
        key: 'auditRemark',
        type: 'Text',
        formItemProps: {
          label: '审核原因'
        },
        // todo 待审核 -1 就不显示原因
        render: (text: string, row: RechargePagedListResType) => {
          return row?.auditState == -1 ? '-' : row?.yuanyin;
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
