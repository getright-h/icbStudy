import { Button, Input, Modal, Typography } from 'antd';
import * as React from 'react';
import { IFormBaseComponentsUnion, TypeUseForm, IFormComponent, FormRenderItem } from '@fch/fch-shop-web';
import { IWidget } from '@fch/fch-shop-web/dist/src/IFormRenderComponent/form-render.interface';
import { IResponseEquityResult } from '~/solution/model/dto/equity-package-manage.dto';
// import { IEquityPackageManageState } from '../fund-account-setting.interface';
import style from '../recharge-funds.component';
import { EQYITY_USE_TYPE, PAY_METHOD_TYPES } from '~/solution/shared/enums/home.enum';

interface IAddEquityProps {
  title: string;
  form: TypeUseForm;
  handleOk: () => void;
  handleCancel: () => void;
  visible: boolean;
  stateParent: any;
  // stateParent: IEquityPackageManageState;
  handleFormChangeEvent?: Function;
  watch2?: IWidget;
}

export default function AddPackageModalComponent(props: IAddEquityProps) {
  const { title, form, handleOk, handleCancel, visible, stateParent, watch2 } = props;
  const { disableFooter } = stateParent;
  const footer: any = disableFooter ? null : (
    <>
      <Button type="primary" onClick={handleCancel}>
        取消
      </Button>
      <Button loading={stateParent.isLoadingModal2} type="primary" onClick={handleOk}>
        确定
      </Button>
    </>
  );
  const renderContent = (props: any) => {
    const { renderItem } = props;
    const formValues = form.getFieldsValue();
    const { equityList } = formValues;
    const { equityDropList } = stateParent;
    let isUserConfig = false;
    const tuanYouList: IResponseEquityResult[] = [],
      serverMonth: IResponseEquityResult[] = [];
    const list = equityDropList;
    // 如果选了基础套餐才展示权限使用配置
    equityList?.map((item: string) => {
      const equity: IResponseEquityResult = list?.find(it => it.id === item);
      if (equity?.type != EQYITY_USE_TYPE.OILGET) {
        equity && serverMonth.push(equity);
      }
      if (equity?.typeConfig == 1) {
        isUserConfig = true;
      }
      if (equity?.type == EQYITY_USE_TYPE.OILGET) {
        tuanYouList.push(equity);
      }
    });
    console.log('equityList===>', equityList, equityDropList);
    function requireValidator(rule: any, value: any, callback: Function, name1: string, name2: string) {
      if (!form.getFieldValue(name1) && !form.getFieldValue(name2)) {
        callback('订单比列和使用次数至少填一个');
      } else {
        callback();
      }
    }
    return (
      <div>
        <div>{schema.map(renderItem)}</div>
        <div>
          {isUserConfig && <FormRenderItem label="权限使用配置" colon={false}></FormRenderItem>}
          {equityList?.map((item: string) => {
            const equity: IResponseEquityResult = list?.find(it => it.id == item);
            return (
              equity?.typeConfig == 1 && (
                <FormRenderItem
                  name={`userConfigEquity.${equity.id}`}
                  key={equity.id}
                  label={
                    <span>
                      <span className={style.red}>*</span>
                      {equity.name}
                    </span>
                  }
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 20 }}
                >
                  <div className={style.flex}>
                    {equity.isProportion && (
                      <FormRenderItem
                        key={`userConfigEquity.${equity.id}.userConfigEquityProportion`}
                        name={`userConfigEquity.${equity.id}.userConfigEquityProportion`}
                        required={true}
                        rules={[
                          {
                            validator: (rule: any, value: any, callback: Function) => {
                              requireValidator(
                                rule,
                                value,
                                callback,
                                `userConfigEquity.${equity.id}.userConfigEquityProportion`,
                                `userConfigEquity.${equity.id}.userConfigEquityProportionNumber`
                              );
                            }
                          }
                        ]}
                      >
                        <Input placeholder="请输入抵扣订单比列" addonAfter="%"></Input>
                      </FormRenderItem>
                    )}
                    {equity.isNumber && (
                      <FormRenderItem
                        className="ml20"
                        key={`userConfigEquity.${equity.id}.userConfigEquityProportionNumber`}
                        name={`userConfigEquity.${equity.id}.userConfigEquityProportionNumber`}
                        required={true}
                        rules={[
                          {
                            validator: (rule: any, value: any, callback: Function) => {
                              requireValidator(
                                rule,
                                value,
                                callback,
                                `userConfigEquity.${equity.id}.userConfigEquityProportion`,
                                `userConfigEquity.${equity.id}.userConfigEquityProportionNumber`
                              );
                            }
                          }
                        ]}
                      >
                        <Input placeholder="请输入使用次数" addonAfter="次"></Input>
                      </FormRenderItem>
                    )}
                  </div>
                </FormRenderItem>
              )
            );
          })}
        </div>
        <div>
          {equityList?.length > 0 && <FormRenderItem colon={false} label="权限服务年限配置"></FormRenderItem>}
          {serverMonth?.map((item: IResponseEquityResult) => {
            return (
              <FormRenderItem
                key={item.id}
                name={`yearConfig.${item.id}`}
                label={item.name}
                wrapperCol={{ span: 10 }}
                required={true}
                rules={[{ required: true, message: '权限服务年限配置必填' }]}
              >
                <Input placeholder={`请输入${item.name}`} addonAfter={'月'}></Input>
              </FormRenderItem>
            );
          })}
        </div>
        <div>
          {tuanYouList?.length > 0 && <FormRenderItem label="加油补贴价格" colon={false}></FormRenderItem>}
          {tuanYouList?.map((item: IResponseEquityResult) => {
            return (
              item && (
                <FormRenderItem
                  key={`tuanYouConfig.${item.id}`}
                  name={`tuanYouConfig.${item.id}`}
                  label={item.name}
                  required={true}
                  wrapperCol={{ span: 10 }}
                  rules={[{ required: true, message: '加油补贴价格必填' }]}
                >
                  <Input placeholder={`请输入${item.name}`} addonAfter={'元'}></Input>
                </FormRenderItem>
              )
            );
          })}
        </div>
      </div>
    );
  };
  function renderForm() {
    return (
      <IFormComponent
        form={form}
        watch={watch2}
        schema={schema}
        slot={renderContent}
        // schema type text
        widget={{
          Text: Typography.Text
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
        width={700}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        visible={visible}
        okText={<Button loading={stateParent.isLoadingModal2}>确定</Button>}
        footer={footer}
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
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户名称',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户号',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户累计充值总额',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '账户资金余额',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '充值金额',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '创建时间',
          required: true,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '支付类型',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      },
      {
        key: 'isTest',
        type: 'Text',
        formItemProps: {
          valuePropName: 'children',
          label: '备注',
          required: true,
          initialValue: 1,
          wrapperCol: { span: 10 }
        }
      }
    ],
    props: {
      cols: 1
    }
  }
];
