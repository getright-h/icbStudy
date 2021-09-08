import { FormRenderItem, IFormComponent } from '@fch/fch-shop-web';
import { Col, Modal, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import * as React from 'react';
import { StandardFormComponent } from '~/framework/components/component.module';
import CheckBoxButtonComponent from '~/framework/components/form-base-components/check-box-button-component/check-box-button.component';
import FormRenderComponent from '~/framework/components/form-render-component';
import { IItem } from '~/framework/components/standard-form-component/standard-form.interface';
import { AppointmentTypeConst } from '~/solution/shared/enums/reserve.enum';
import ChooseTimePeriodComponent from '../choose-time-period-component/choose-time-period.component';
import { getConfigStore } from './edit-reserve-setting.component.config.store';
import { useEditReserveSettingStore } from './edit-reserve-setting.component.store';
import { IEditReserveSettingProps, IFormProps, schema } from './edit-reserve-setting.interface';

export default function EditReserveSettingComponent(props: IEditReserveSettingProps) {
  const { state, formRef, handleFormChange, changeSelectTags, getTimePeriod, submitForm } = useEditReserveSettingStore(
    props
  );
  const { selectedTags, loading } = state;
  const { visible, initData, close } = props;
  // const { itemsConfigOne, itemsConfigTwo } = getConfigStore();
  function renderForm() {
    return (
      <IFormComponent
        form={formRef}
        schema={schema}
        slot={renderContent}
        props={{
          labelCol: { span: 6 },
          wrapperCol: { span: 18 }
        }}
      ></IFormComponent>
    );
    // return (
    //   <StandardFormComponent
    //     handleFormChangeEvent={handleFormChange}
    //     form={formRef}
    //     items={[]}
    //     columns={1}
    //     labelCol={{ span: 6 }}
    //     wrapperCol={{ span: 16 }}
    //     slotFormComponent={renderContent}
    //   />
    // );
  }
  function renderContent(props: any) {
    const { renderItem } = props;
    return (
      <div>
        {schema.map(renderItem)}
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          {/* <Col xs={24}>
            <FormRenderItem
              name="bitwise"
              label="预约类型"
              required
              rules={[{ required: true, message: '预约类型不能为空' }]}
            >
              <React.Fragment>
                {AppointmentTypeConst.map(tag => (
                  <CheckableTag
                    key={'tag-' + tag.value}
                    checked={selectedTags.indexOf(tag.value) > -1}
                    onChange={checked => changeSelectTags(tag.value, checked)}
                  >
                    {tag.label}
                  </CheckableTag>
                ))}
              </React.Fragment>
            </FormRenderItem>
          </Col> */}
          <Col xs={24}>
            {/* <FormItem label="预约时段设置" style={{ margin: 0 }}></FormItem> */}
            <FormRenderItem
              name="space"
              label="预约时段设置："
              labelCol={{ offset: 4, span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: '预约时段设置不能为空' }]}
            >
              <ChooseTimePeriodComponent getTimePeriod={getTimePeriod} initData={initData?.spaceContent} />
            </FormRenderItem>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <Modal
      title={initData?.id ? '编辑预约设置' : '添加预约设置'}
      width={1200}
      visible={visible}
      onCancel={() => close()}
      onOk={() => {
        formRef.validateFields().then(v => {
          submitForm(v);
        });
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={loading}
    >
      {renderForm()}
    </Modal>
  );
}
