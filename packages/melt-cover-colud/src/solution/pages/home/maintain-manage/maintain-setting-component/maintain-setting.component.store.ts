import { IMaintainSettingState } from './maintain-setting.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm, ISelectType } from '@fch/fch-shop-web';
import { MaintainSettingService } from '~/solution/model/services/maintain-setting.service';
import { QueryReqType } from '~/solution/model/dto/maintain-setting.dto';
import { useEffect } from 'react';
import { message } from 'antd';

export function useMaintainSettingStore() {
  const { state, setStateWrap } = useStateStore(new IMaintainSettingState());
  const { currRow, searchForm } = state;
  let ST: any = null;
  let isUnmounted = false;
  const optionsList = ['brandId', 'factoryId', 'versionId', 'configId'];
  const selectArr: any = [
    ['brandId', brandId],
    ['factoryId', factoryId],
    ['versionId', versionId]
  ];
  const form = useForm();
  const formDetail = useForm();
  const maintainSettingService: MaintainSettingService = new MaintainSettingService();
  useEffect(() => {
    initBind();
    return () => {
      isUnmounted = true;
    };
  }, []);

  // 初始化数据
  function initBind() {
    handleSearch();
    getBrand(form);
    getBrand(formDetail);
    optionsList.map(val => {
      bindFilter(form, val);
      bindFilter(formDetail, val);
    });
    bindOnChange();
  }
  // 给选择框添加filter功能
  function filterOption(input: string, option: any) {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  function bindFilter(formName: any, typeName: string) {
    formName.setSchema(typeName, (schema: ISelectType) => {
      schema.props.filterOption = filterOption;
      return schema;
    });
  }
  // select级联搜索,通过onChange事件联动
  function bindOnChange() {
    selectArr.map((val: [string, Function, Function]) => {
      form.setSchema(val[0], (schema: ISelectType) => {
        schema.props.onChange = (value: { label: string; value: string }) => val[1](value, form);
        return schema;
      });
      formDetail.setSchema(val[0], (schema: ISelectType) => {
        schema.props.onChange = (value: { label: string; value: string }) => val[1](value, formDetail);
        return schema;
      });
    });
  }
  // 品牌onChange事件
  function brandId(value: { label: string; value: string }, formName: any) {
    formName.setFieldsValue({ factoryId: undefined });
    value
      ? getFactory(value.value, formName)
      : formName.setSchema('factoryId', (schema: ISelectType) => {
          schema.props.options = [];
          return schema;
        });
    factoryId(undefined, formName);
  }
  // 厂商onChange事件
  function factoryId(value: { label: string; value: string }, formName: any) {
    formName.setFieldsValue({ versionId: undefined });
    value
      ? getVersion(value.value, formName)
      : formName.setSchema('versionId', (schema: ISelectType) => {
          schema.props.options = [];
          return schema;
        });
    versionId(undefined, formName);
  }
  // 车系onChange事件
  function versionId(value: { label: string; value: string }, formName: any) {
    formName.setFieldsValue({ configId: undefined });
    value
      ? getConfig(value.value, formName)
      : formName.setSchema('configId', (schema: ISelectType) => {
          schema.props.options = [];
          return schema;
        });
  }

  // 拉取品牌数据
  function getBrand(formName: any, name = '') {
    maintainSettingService.queryVehicleBrand({ name }).subscribe(res => {
      let brandOptions: any = [];
      res?.map(key => {
        brandOptions = brandOptions.concat(
          key.items.map(brand => {
            return {
              title: brand.value,
              label: brand.value,
              value: brand.key
            };
          })
        );
      });
      // 检测页面是否被卸载，卸载后不改变数据
      isUnmounted ||
        formName.setSchema('brandId', (schema: ISelectType) => {
          schema.props.options = brandOptions;
          return schema;
        });
    });
  }
  // 拉取厂商数据
  function getFactory(parentId: string, formName: any) {
    maintainSettingService.queryVehicleFactory({ parentId }).subscribe(res => {
      const factoryOptions = res?.map(key => {
        return {
          title: key.value,
          label: key.value,
          value: key.key
        };
      });
      formName.setSchema('factoryId', (schema: ISelectType) => {
        schema.props.options = factoryOptions;
        return schema;
      });
    });
  }
  // 拉取车系数据
  function getVersion(parentId: string, formName: any) {
    maintainSettingService.queryVehicleVersion({ parentId }).subscribe(res => {
      const versionOptions = res?.map(key => {
        return {
          title: key.value,
          label: key.value,
          value: key.key
        };
      });
      formName.setSchema('versionId', (schema: ISelectType) => {
        schema.props.options = versionOptions;
        return schema;
      });
    });
  }
  // 拉取车型配置数据
  function getConfig(id: string, formName: any) {
    maintainSettingService.queryVehicleConfig({ id }).subscribe(res => {
      const configOptions = res?.map(key => {
        return {
          title: key.value,
          label: key.value,
          value: key.key
        };
      });
      formName.setSchema('configId', (schema: ISelectType) => {
        schema.props.options = configOptions;
        return schema;
      });
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

  // 查询保养配置列表
  function handleSearch(index = 1, size = searchForm.size, withParams = false) {
    const params: QueryReqType = withParams
      ? {
          size,
          index,
          ...getSelectVal(form, ['brand', 'factory', 'version', 'config'])
        }
      : { size, index };
    maintainSettingService.query(params).subscribe(res => {
      console.log('res---', params, '保养配置模板列表---', res);
      setStateWrap({
        tableData: res.dataList,
        total: res.total,
        isLoading: false,
        searchForm: {
          index,
          size
        }
      });
    });
  }

  // 操作table中选项
  function tableAction(row: any, actionName: string) {
    switch (actionName) {
      case '编辑':
        setStateWrap({
          currRow: row,
          isLoadingBtn: false,
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
        // 获取当前select的option
        getFactory(row.brandId, formDetail);
        getVersion(row.factoryId, formDetail);
        getConfig(row.versionId, formDetail);
        toggleModal('isVisibleModalDetail');
        break;

      case '删除':
        setStateWrap({
          currRow: row
        });
        break;
      default:
        break;
    }
  }

  // 确认删除数据
  function delConfirm(e: any) {
    maintainSettingService.delete({ id: currRow.id }).subscribe(res => {
      setStateWrap({
        currRow: null
      });
      // 如果当前table页面只有一条数据，那么删除后请求的是前一页的数据
      handleSearch(state.tableData.length === 1 ? searchForm.index - 1 : searchForm.index);
      message.success('删除完成');
    });
  }
  // 取消删除数据
  function delCancel(e: any) {
    setStateWrap({
      currRow: null
    });
    return;
  }

  // 改变页码
  function changeTablePageIndex(index: number, pageSize: number) {
    setStateWrap({
      isLoading: true,
      searchForm: {
        size: pageSize,
        index
      }
    });
    handleSearch(index, pageSize);
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

  // 新增保养配置模板
  function addMaintainConfig() {
    // 初始化formDetail数据
    formDetail.resetFields();
    // 初始化select的options
    ['factoryId', 'versionId', 'configId'].map(val => {
      formDetail.setSchema(val, (schema: ISelectType) => {
        schema.props.options = [];
        return schema;
      });
    });
    setStateWrap({
      isNewConfig: true,
      isLoadingBtn: false
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
    setStateWrap({
      isLoadingBtn: true
    });
    ST = setTimeout(() => {
      message.error('请求超时,请稍后重试');
      setStateWrap({
        isLoadingBtn: false
      });
    }, 5000);
    const params: any = {
      ...formDetail.getFieldsValue(),
      ...getSelectVal(formDetail, ['brand', 'factory', 'version', 'config'])
    };
    if (state.isNewConfig) {
      // 新增配置
      maintainSettingService.insert(params).subscribe(res => {
        clearTimeout(ST);
        setStateWrap({
          isLoadingBtn: false,
          searchForm: {
            index: 1,
            size: searchForm.size
          }
        });
        toggleModal('isVisibleModalDetail');
        handleSearch();
      });
    } else {
      // 编辑配置
      maintainSettingService.edit({ ...row, ...params }).subscribe(res => {
        clearTimeout(ST);
        setStateWrap({
          currRow: null,
          isLoadingBtn: false
        });
        toggleModal('isVisibleModalDetail');
        handleSearch(searchForm.index);
      });
    }
  }

  // 弹出框取消
  function handleCancel(row?: any) {
    setStateWrap({
      currRow: null
    });
    toggleModal('isVisibleModalDetail');
  }

  return {
    state,
    form,
    formDetail,
    changeTablePageIndex,
    tableAction,
    handleSubmit,
    handleCancel,
    handleSearch,
    addMaintainConfig,
    delConfirm,
    delCancel
  };
}
