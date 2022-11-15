import { IFormComponent, useForm } from '@fch/fch-shop-web';
import { Modal } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { ITablePlus } from '~/framework/components/component.module';
import { useTable } from '~/framework/hooks/useTable';
import { FundsOrganizitonOtherService } from '~/solution/model/services/funds-organiziton-other.service';
import { Columns, ILogPageProps } from './log-page.interface';

export default function LogPageComponent(props: ILogPageProps) {
  const fundsOrganizitonOtherService: FundsOrganizitonOtherService = new FundsOrganizitonOtherService();
  const { initData, close, visible } = props;
  const form = useForm();
  const table = useTable({
    form,
    require: fundsOrganizitonOtherService.logPageList,
    isPreload: false,
    customParamsFn() {
      return { organizationSetId: initData?.id };
    }
  });

  useEffect(() => {
    if (visible) {
      table.getTableData();
    }
  }, [visible]);

  return (
    <div>
      <Modal width={700} title={'日志'} visible={visible} onCancel={() => close()} footer={null}>
        <ITablePlus table={table} columns={Columns} />;
      </Modal>
    </div>
  );
}
