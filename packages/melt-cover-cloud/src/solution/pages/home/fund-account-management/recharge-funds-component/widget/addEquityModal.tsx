import * as React from 'react';
import { Button, Modal, TreeSelect } from 'antd';
import { IFormBaseComponentsUnion, IFormComponent, TypeUseForm } from '@fch/fch-shop-web';
import { IUploadImgComponent } from '~/framework/components/component.module';
import { uuid } from '~/framework/util/common/tool';
import { EQYITY_TYPE, EQYITY_USE_TYPE } from '~/solution/shared/enums/home.enum';
import { IEquityPackageManageState } from '../equity-package-manage.interface';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: IEquityPackageManageState;
}

/**req 获取机构下拉框选项 */
let data: { label: any; value: any }[] = [];
const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();

function handleChange() {
  console.log(1);

  // value 是输入值
  const params = {
    index: 1,
    size: 10,
    state: 0,
    bagSearch: ''
  };

  fundsOrganizitonOtherService.pagedList(params).subscribe(res => {
    const { dataList } = res;
    data = dataList.map((item: any) => ({
      label: item[0],
      value: item[0]
    }));

    // callback(data);
  });
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
        key: 'bagId',
        type: 'SelectLoading',
        formItemProps: {
          label: '账户名',
          required: true
        },
        props: {
          reqUrl: 'currency/manage/currency/bag/pagedList',
          placeholder: '请输入账户名',
          onChange: handleChange(),
          options: (data || []).map(d => ({
            value: d.value,
            label: d.label
          }))
        }
      },
      {
        key: 'type',
        type: 'Select',
        formItemProps: {
          label: '支付类型',
          required: true
        },
        props: {
          placeholder: '请选择',
          options: [{ label: '其他', value: 1 }]
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
          label: '备注',
          required: true
        },
        props: {
          placeholder: '填写备注'
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
