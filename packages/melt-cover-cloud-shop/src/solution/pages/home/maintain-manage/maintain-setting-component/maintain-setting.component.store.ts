import { useEffect } from 'react';
import { useStateStore } from '@fch/fch-tool';
import { useForm, ISelectType, FchMessage } from '@fch/fch-shop-web';
import {
  useQueryVehicleBrand,
  useQueryVehicleFactory,
  useQueryVehicleVersion,
  useQueryVehicleConfig,
  usePostMaintainList,
  useInsert,
  useEdit,
  useDel,
  useQueryTempList,
  useBatchInsert
} from '@/solution/model/services/maintain-setting.service';
import { IMaintainSettingState } from './maintain-setting.interface';

let currRow: any = null;
export function useMaintainSettingStore() {
  const { state, setStateWrap } = useStateStore(new IMaintainSettingState());
  const { selectedRowKeys } = state;

  const optionsList = ['brandId', 'factoryId', 'versionId', 'configId'];
  const form = useForm();
  const formDetail = useForm();
  const { refetch: getMaintainList, maintainData, isLoading, currParams } = usePostMaintainList();
  const brandIdList = useQueryVehicleBrand();
  const factoryIdList = useQueryVehicleFactory();
  const versionIdList = useQueryVehicleVersion();
  const configIdList = useQueryVehicleConfig();
  const brandIdDetail = useQueryVehicleBrand();
  const factoryIdDetail = useQueryVehicleFactory();
  const versionIdDetail = useQueryVehicleVersion();
  const configIdDetail = useQueryVehicleConfig();
  const { refetch: insert, isLoading: insertLoading } = useInsert();
  const { refetch: edit, isLoading: editLoading } = useEdit();
  const { refetch: del, isLoading: delLoading } = useDel();
  const {
    refetch: getMaintainTemp,
    tempMaintainData,
    isLoading: tempLoading,
    currParams: tempParams
  } = useQueryTempList();
  const { refetch: batchInsert, isLoading: batchLoading } = useBatchInsert();
  useEffect(() => {}, []);
  // 动态渲染主页面下拉框
  useEffect(() => {
    form.setSchemas({
      brandId: schema => {
        schema.props.options = brandIdList.options;
      },
      factoryId: schema => {
        schema.props.options = factoryIdList.options;
      },
      versionId: schema => {
        schema.props.options = versionIdList.options;
      },
      configId: schema => {
        schema.props.options = configIdList.options;
      }
    });
    bindOnChange();
  }, [
    JSON.stringify(brandIdList),
    JSON.stringify(factoryIdList),
    JSON.stringify(versionIdList),
    JSON.stringify(configIdList)
  ]);
  // 动态渲染详情页面下拉框
  useEffect(() => {
    formDetail.setSchemas({
      brandId: schema => {
        schema.props.options = brandIdDetail.options;
      },
      factoryId: schema => {
        schema.props.options = factoryIdDetail.options;
      },
      versionId: schema => {
        schema.props.options = versionIdDetail.options;
      },
      configId: schema => {
        schema.props.options = configIdDetail.options;
      }
    });
    bindOnChange();
  }, [
    JSON.stringify(brandIdDetail),
    JSON.stringify(factoryIdDetail),
    JSON.stringify(versionIdDetail),
    JSON.stringify(configIdDetail)
  ]);

  // 给级联下拉搜索框绑定onChange事件
  function bindOnChange() {
    [form, formDetail].map(formName => {
      optionsList.map(keys => {
        formName.setSchema(keys, (schema: ISelectType) => {
          schema.props.onChange = (value: { label: string; value: string }) => changeItem(keys, formName, value);
        });
      });
    });
  }

  // 级联搜索框onChange事件匹配
  function changeItem(keys: string, formName: any, value?: { label: string; value: string }) {
    switch (keys) {
      // 父级改变后，更改子级的内容
      case 'brandId':
        changeValue(
          'factoryId',
          formName,
          () => (formName === form ? factoryIdList : factoryIdDetail).refetch({ parentId: value.value }),
          value && true
        );
        changeItem('factoryId', formName);
        break;
      case 'factoryId':
        changeValue(
          'versionId',
          formName,
          () => (formName === form ? versionIdList : versionIdDetail).refetch({ parentId: value.value }),
          value && true
        );
        changeItem('versionId', formName);
        break;
      case 'versionId':
        changeValue(
          'configId',
          formName,
          () => (formName === form ? configIdList : configIdDetail).refetch({ id: value.value }),
          value && true
        );
        break;

      default:
        break;
    }
  }
  // 级联搜索框onChange事件触发
  function changeValue(keys: string, formName: any, getFn: (...params: any) => void, hasVal?: boolean) {
    // 清空value值
    formName.resetFields([keys]);
    // 父级value有值，获取子级options；父级无值，清空子级options
    hasVal
      ? getFn()
      : formName.setSchema(keys, (schema: ISelectType) => {
          schema.props.options = [];
        });
  }

  // 获取select.value模板
  function getSelectVal(formName: any, keyArr: string[]) {
    let tempData = {};
    keyArr.map(key => {
      tempData = Object.assign(tempData, {
        [key + 'Id']: formName.getFieldValue(key + 'Id')?.value,
        [key + 'Name']: formName.getFieldValue(key + 'Id')?.label
      });
    });
    return tempData;
  }

  // 点击查询按钮获取保养配置列表
  function handleSearch() {
    getMaintainList({
      index: 1,
      size: maintainData.size,
      ...getSelectVal(form, ['brand', 'factory', 'version', 'config'])
    });
  }

  // 操作table中选项
  function tableAction(row: any, actionName: string) {
    switch (actionName) {
      case '编辑':
        // 获取弹出框下拉菜单的默认options
        changeValue('factoryId', formDetail, () => factoryIdDetail.refetch({ parentId: row.brandId }), true);
        changeValue('versionId', formDetail, () => versionIdDetail.refetch({ parentId: row.factoryId }), true);
        changeValue('configId', formDetail, () => configIdDetail.refetch({ id: row.versionId }), true);
        currRow = row;
        setStateWrap({
          isNewConfig: false
        });
        // 设置保养详情页面数据为当前选中行
        formDetail.setFieldsValue({
          brandId: { label: row.brandName, value: row.brandId },
          factoryId: { label: row.factoryName, value: row.factoryId },
          versionId: { label: row.versionName, value: row.versionId },
          configId: { label: row.configName, value: row.configId },
          timeInterval: row.timeInterval,
          mileageInterval: row.mileageInterval,
          firstMaintainMileage: row.firstMaintainMileage,
          firstMaintainTime: row.firstMaintainTime,
          remindMileage: row.remindMileage,
          remindMonth: row.remindMonth,
          assurancePeriod: row.assurancePeriod
        });
        toggleModal('isVisibleModalDetail');
        break;

      case '删除':
        currRow = row;
        break;
      default:
        break;
    }
  }

  // 确认删除数据
  function delConfirm() {
    del(
      { id: currRow.id },
      {
        successFn: () => {
          currRow = null;
          // 如果当前table页面只有一条数据，那么删除后请求的是前一页的数据
          getMaintainList({
            ...currParams,
            index: maintainData.tableData.length === 1 ? maintainData.index - 1 : maintainData.index
          });
        }
      }
    );
  }
  // 取消删除数据
  function delCancel(e: any) {
    currRow = null;
    return;
  }

  // 改变主页面页码
  function changeTablePageIndex(index: number, size: number) {
    // 根据上次传的params变更页码
    getMaintainList({ ...currParams, index, size });
  }
  // 改变规则页面页码
  function changeRulesTablePageIndex(index: number, size: number) {
    getMaintainTemp({ ...tempParams, index, size });
  }

  // 弹出框显示/隐藏
  function toggleModal(key: string, fn?: any) {
    setStateWrap(
      {
        [key]: !state[key]
      },
      fn
    );
  }

  // 新增保养配置
  function addMaintainConfig() {
    // 初始化formDetail数据
    formDetail.resetFields();
    // 初始化select的options
    formDetail.setSchemas({
      factoryId: schema => {
        schema.props.options = [];
      },
      versionId: schema => {
        schema.props.options = [];
      },
      configId: schema => {
        schema.props.options = [];
      }
    });
    setStateWrap({
      isNewConfig: true
    });
    toggleModal('isVisibleModalDetail');
  }

  // formDetail验证
  function handleSubmit(formData: any, rowData?: any) {
    formData
      .validateFields()
      .then(() => {
        handleOk(rowData);
      })
      .catch();
  }
  // 弹出框确认
  function handleOk(row?: any) {
    const params: any = {
      ...formDetail.getFieldsValue(),
      ...getSelectVal(formDetail, ['brand', 'factory', 'version', 'config'])
    };
    if (state.isNewConfig) {
      // 新增配置
      insert(params, {
        successFn: () => {
          toggleModal('isVisibleModalDetail');
          getMaintainList({ ...currParams });
        }
      });
    } else {
      // 编辑配置
      edit(
        { ...row, ...params },
        {
          successFn: () => {
            currRow = null;
            toggleModal('isVisibleModalDetail');
            getMaintainList({ ...currParams });
          }
        }
      );
    }
  }

  // 弹出框取消
  function handleCancel(row?: any) {
    currRow = null;
    toggleModal('isVisibleModalDetail');
  }

  // 更改规则模板table选中项
  function onSelectChange(selectedRowKeys: any) {
    setStateWrap({ selectedRowKeys });
  }

  // 获取当前url的search
  function getSearch() {
    const index = window.location.hash.lastIndexOf('source=');
    const source = window.location.hash.slice(index + 7);
    return source === '007';
  }
  // 获取规则模板
  function searchTemplate() {
    getMaintainTemp({
      index: 1,
      size: tempMaintainData.size,
      ...getSelectVal(form, ['brand', 'factory', 'version', 'config'])
    });
  }

  // 启用规则
  function enableRule() {
    if (selectedRowKeys.length === 0) {
      FchMessage.error('请先勾选列表规则');
    } else {
      batchInsert(
        { maintainConfigIds: selectedRowKeys },
        {
          successFn: () => {
            window.location.hash = '/home/maintain/maintainSetting';
          }
        }
      );
    }
  }

  return {
    state,
    form,
    formDetail,
    maintainData,
    isLoading,
    insertLoading,
    editLoading,
    delLoading,
    tempMaintainData,
    tempLoading,
    batchLoading,
    currRow,
    changeTablePageIndex,
    changeRulesTablePageIndex,
    tableAction,
    handleSubmit,
    handleCancel,
    handleSearch,
    getMaintainList,
    addMaintainConfig,
    delConfirm,
    delCancel,
    onSelectChange,
    getSearch,
    searchTemplate,
    enableRule
  };
}
