import { useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import moment from 'moment';
import { StorageUtil, useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';
import { debounce, identity, cloneDeep } from 'lodash';
import { EquityPackageManageService } from '~/solution/model/services/equity-package-manage.service';
import { ReserveManageService } from '~/solution/model/services/reserve-manage.service';
import { CommonUtilService } from '~/solution/model/services/common-util.service';
import { IEquityPackageManageState, OrgData } from './equity-package-manage.interface';
import {
  EquityList,
  EquityListPackage,
  EquityPagedListParams,
  GetSubOrganizationResType,
  IAddEquity,
  IAddEquityResult,
  InsertEquityGroupParams,
  IResponseEquityListResult,
  IResponseEquityResult
} from '~/solution/model/dto/equity-package-manage.dto';
import { useGetDistributor } from '~/solution/model/services/common-hooks.service';
import { EQUITY_ENUM } from '~/solution/shared/enums/home.enum';
import { PERMISSIONS } from '~/solution/shared/enums/permissions.enum';
let currentEquity: IResponseEquityResult;
let currentEquityPackage: InsertEquityGroupParams;

export function useEquityPackageManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IEquityPackageManageState());
  const form = useForm();
  const form1 = useForm();
  const form2 = useForm();
  const equityPackageManageService: EquityPackageManageService = new EquityPackageManageService();
  const reserveManageService: ReserveManageService = new ReserveManageService();
  const Role = JSON.parse(StorageUtil.getLocalStorage('userInfoRole'));
  /** 检测是否非经销商 */
  const isBelonging = Role && !Role.privilegesCode?.some((item: string) => item.includes(PERMISSIONS.isDistributor));
  const commonUtilService = new CommonUtilService();
  const { data, refetch } = useGetDistributor();
  const userInfo = JSON.parse(StorageUtil.getLocalStorage('userInfoRole') || '{}');
  /** 下级机构源数据 */
  const treeData = useRef([]);
  /** 编辑时回显已选中的数据 */
  const selectedData = useRef([]);

  useEffect(() => {
    setStateWrap({
      isBelonging: isBelonging
    });
    handleGetEquity();
    handleSearch(); // 权益包
    handleSearchEquity(); // 权益
    getOrgList();
  }, []);

  /* useEffect(() => {
    form1.setSchema('selectionOrgs', schema => {
      schema.props.treeData = treeData.current;
      schema.props.value = selectedData.current;
    });
  }, [treeData.current, selectedData.current]); */

  useEffect(() => {
    const notDeleteEquityList = state.equityDropList
      ?.filter(item => item.status !== EQUITY_ENUM.Delete)
      .map(item => {
        const obj: any = {};
        obj.key = item.id;
        obj.label = item.name;
        obj.value = item.id;
        item.disable && (obj.disabled = item.disable);
        return obj;
      });

    form.setSchema('distributorId', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
      return schema;
    });
    form2.setSchema('distributor', schema => {
      schema.props.options = data;
      schema.props.onSearch = debounce((name: string) => {
        refetch({ name });
      }, 800);
      return schema;
    });
    form2.setSchema('equityList', schema => {
      schema.props.options = notDeleteEquityList;
      return schema;
    });
  }, [JSON.stringify(data), JSON.stringify(state.equityDropList)]);

  const watch2 = {
    distributor: (changedValues: any, values: any) => {
      if (changedValues?.key) {
        const isParentDistributor =
          state.orgCanOptions.filter((item: any) => item.id == changedValues.key && item.isPlatform)?.length > 0;
        handleGetDropEquity(changedValues.key, (res: IResponseEquityResult[]) => {
          const defaultEquityList: string[] = res.filter(item => item.disable).map(item => item.id);
          form2.setFieldsValue({
            equityList: defaultEquityList
          });
          form2.setSchema('isTest', schema => {
            schema.hidden = !isParentDistributor;
            return schema;
          });
        });
      }
    }
  };

  /** 处理已选中的机构数据回显 */
  const loopSelectedData = (arr: OrgData[]) => {
    if (Array.isArray(arr)) {
      arr.forEach((item: OrgData) => {
        if (item?.isSelect) {
          selectedData.current.push({ label: item.name, value: item.id });
        }
        if (Array.isArray(item?.children) && item.children.length) {
          loopSelectedData(item.children);
        }
      });
    }
  };

  /** 获取下级机构列表 */
  async function getInstitutionList(equityId = '') {
    treeData.current = [{ id: 'loading', name: '加载中,请稍候...', disabled: true, disableCheckbox: true }];
    selectedData.current = [];
    if (Array.isArray(userInfo?.organizationIds) && userInfo.organizationIds?.length) {
      /** 登录账号如果绑定多个机构,需要遍历获取全部下级机构 */
      userInfo.organizationIds.forEach(async (parent: any) => {
        if (parent?.organizationId) {
          /* equityPackageManageService
            .getSubOrganization({ parentId: parent?.organizationId, equityId })
            .subscribe(res => {
              if (Array.isArray(res) && res.length) {
                res.forEach(item => {
                  item.isLeaf = !item.isHasChildren;
                  item.children = item.isHasChildren ? [] : null;
                });
                treeData.current = [...treeData.current, ...res];
                setStateWrap({ treeData: treeData.current });
              }
            }); */
          equityPackageManageService
            .getSubOrganization({ parentId: parent.organizationId, equityId })
            .subscribe(res => {
              if (Array.isArray(res) && res.length) {
                /** 遍历获取已选中的机构 */
                loopSelectedData(res as OrgData[]);
                /* res.forEach(item => {
                  item.isLeaf = !item.isHasChildOrganization;
                }); */
                treeData.current = res;
                setStateWrap({ treeData: treeData.current });
              } else {
                treeData.current = [];
                setStateWrap({ treeData: treeData.current });
              }
              /** 设置源数据 */
              form1.setSchema('selectionOrgs', schema => {
                schema.props.treeData = treeData.current;
              });
              /** 设置回显值 */
              form1.setFieldsValue({ selectionOrgs: selectedData.current });
            });
        }
      });
    }
  }

  function handleFormChangeEvent(changedValues: any, values: any) {
    if (changedValues['distributor']?.key) {
      handleGetDropEquity(changedValues['distributor'].key, (res: IResponseEquityResult[]) => {
        const defaultEquityList: string[] = res.filter(item => item.disable).map(item => item.id);
        form2.setFieldsValue({
          equityList: defaultEquityList
        });
      });
    }
  }

  function handleGetDropEquity(id: string, callback?: Function) {
    equityPackageManageService.getDropEquity(id).subscribe(res => {
      setStateWrap({
        equityDropList: res.map(item => {
          item.disabled = item.disable;
          return item;
        })
      });
      callback && callback(res);
    });
  }

  function getOrgList() {
    reserveManageService
      .getOrganizationsParent({
        typeId: process.env.TYPE_ID
      })
      .subscribe(res => {
        const orgOptions = res;
        setStateWrap({ orgOptions });
      });
    commonUtilService.AddOrderOrgCanSelect().subscribe(res => {
      setStateWrap({ orgCanOptions: res });
    });
  }
  function handleGetEquity() {
    equityPackageManageService.getEquity().subscribe((res: IResponseEquityResult[]) => {
      setStateWrap({
        equityList: res
      });
    });
  }

  function handleGetEquityList(params: EquityPagedListParams) {
    setStateWrap({
      isLoading: true
    });
    equityPackageManageService.getEquityList(params).subscribe(
      (res: IResponseEquityListResult) => {
        setStateWrap({
          tableData: res.dataList,
          total: res.total
        });
        setStateWrap({
          isLoading: false
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }

  function handleSearchEquity(page = 1, size = 10) {
    setStateWrap({
      isLoadingEquity: true
    });
    equityPackageManageService
      .getEquityPage({
        size,
        index: page
      })
      .subscribe(
        res => {
          setStateWrap({
            tableDataEquityList: res.dataList,
            totalEquity: res.total,
            isLoadingEquity: false
          });
        },
        () => {
          setStateWrap({
            isLoadingEquity: false
          });
        }
      );
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchForm: {
        size: pageSize,
        index
      }
    });
    handleSearch(index, pageSize);
  }
  function changeTablePageIndexEquity(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchFormEquity: {
        size: pageSize,
        index
      }
    });
    handleSearchEquity(index, pageSize);
  }

  function handleSearch(page = 1, size = 10) {
    const formValues = form.getFieldsValue();
    console.log('formValues', formValues);
    const { dateRange } = formValues;
    const req = Object.assign({}, formValues, {
      size,
      index: page,
      beginTime: dateRange?.[0] && moment(moment(dateRange[0]).format('YYYY-MM-DD') + ' 00:00:00').valueOf(),
      endTime: dateRange?.[1] && moment(moment(dateRange[1]).format('YYYY-MM-DD') + ' 23:59:59').valueOf()
    });
    handleGetEquityList(req);
  }

  function handleResetSearch() {
    form.resetFields();
    handleSearch();
  }

  function tableAction(row: any, actionName: string) {
    console.log(row, actionName);
    if (actionName == '编辑') {
      handleContextMenuChangePackage(row);
      setStateWrap({
        disableFooter: false,
        equityPackageTitle: '编辑'
      });
    }
    if (actionName == '删除') {
      Modal.confirm({
        title: '删除提示',
        type: 'warning',
        content: '删除套餐包以后，将无法再使用请再次确定是否删除?',
        onOk: () => handleDeleteEquityPackage(row)
      });
    }
    if (actionName == '详情') {
      handleContextMenuChangePackage(row);
      setStateWrap({
        detail: row,
        disableFooter: true,
        equityPackageTitle: '详情'
      });
    }
  }

  function addOrder() {
    toggleModal2();
  }
  function toggleModal() {
    setStateWrap({
      visible: !state.visible
    });
  }
  /**
   * 新增权益
   */
  function handleOk() {
    const formValues = form1.getFieldsValue();
    form1.validateFields().then(res => {
      if (Array.isArray(formValues?.selectionOrgs)) {
        /** 处理数据结构，适配后端接口需求 */
        formValues.equityRequirSelectionOrgs = formValues?.selectionOrgs.map((item: any) => ({
          orgId: item.value,
          orgName: item.label,
          equityId: state.equityTitle !== '添加权益' ? currentEquity?.id : undefined
        }));
      } else {
        /** 后端接口需要该字段 */
        formValues.equityRequirSelectionOrgs = [];
      }
      const req: IAddEquity = Object.assign({}, formValues, {
        isProportion: (formValues.useType && !!~formValues.useType?.indexOf('1')) || false,
        isNumber: (formValues.useType && !!~formValues.useType?.indexOf('2')) || false,
        FEE_TYPE: state.equityTitle == '添加权益',
        id: state.equityTitle !== '添加权益' ? currentEquity?.id : undefined,
        isH5Path: formValues.typeConfig == 3,
        isSmallPath: formValues.typeConfig == 2,
        icon: formValues.icon?.[0]
      });
      setStateWrap({
        isLoadingModal1: true
      });
      equityPackageManageService.handleEquity(req).subscribe(
        (res: IAddEquityResult) => {
          message.info('操作成功');
          form1.resetFields();
          handleGetEquity();
          handleSearchEquity();
          toggleModal();
        },
        () => {
          setStateWrap({
            isLoadingModal1: false
          });
        },
        () => {
          setStateWrap({
            isLoadingModal1: false
          });
        }
      );
    });
  }
  function toggleModal2() {
    if (state.visibleAddPackage) {
      form2.resetFields();
      form2.setFieldsValue({
        equityList: []
      });
      form2.setSchema('isTest', schema => {
        schema.hidden = true;
        return schema;
      });
    }
    setStateWrap({
      visibleAddPackage: !state.visibleAddPackage
    });
  }
  function handleOk2() {
    const formValues = form2.getFieldsValue();
    const { equityDropList } = state;
    form2.validateFields().then(() => {
      const selectEquityList: IResponseEquityResult[] = formValues.equityList?.map((item: string) => {
        const _item = equityDropList.filter(it => item == it.id);
        return _item?.[0];
      });

      const req: InsertEquityGroupParams = Object.assign({}, formValues, {
        FEE_TYPE_PACKAGE: state.equityPackageTitle == '添加权益包',
        id: state.equityPackageTitle !== '添加权益包' ? currentEquityPackage?.id : undefined,
        distributorId: formValues.distributor.value,
        distributorName: formValues.distributor.label,
        price: formValues.price || 0,
        equityList: selectEquityList?.map((item: IResponseEquityResult) => {
          const _item = Object.assign({}, item, {
            equityId: item.id,
            proportion: formValues[`userConfigEquity.${item.id}.userConfigEquityProportion`],
            number: formValues[`userConfigEquity.${item.id}.userConfigEquityProportionNumber`],
            isProportion: formValues[`userConfigEquity.${item.id}.userConfigEquityProportion`] != undefined,
            isNumber: formValues[`userConfigEquity.${item.id}.userConfigEquityProportionNumber`] != undefined,
            month: formValues[`yearConfig.${item.id}`],
            oilSubsidy: formValues[`tuanYouConfig.${item.id}`]
          });
          return _item;
        })
      });
      setStateWrap({
        isLoadingModal2: true
      });

      equityPackageManageService.handleEquityPackage(req).subscribe(
        () => {
          message.info('操作成功');
          form1.resetFields();
          handleSearch();
          toggleModal2();
        },
        () => {
          setStateWrap({
            isLoadingModal2: false
          });
        },
        () => {
          setStateWrap({
            isLoadingModal2: false
          });
        }
      );
    });
  }

  /**
   * 修改权益
   */
  async function handleContextMenuChange(value: IResponseEquityResult) {
    currentEquity = value;
    /** 编辑时获取子机构 */
    await getInstitutionList(currentEquity?.id);
    let useType: string[] = [];

    if (value.isProportion) {
      useType = ['1'];
    }
    if (value.isNumber) {
      useType = ['2'];
    }
    if (value.isProportion && value.isNumber) {
      useType = ['1', '2'];
    }
    form1.setFieldsValue({
      ...value,
      useType,
      icon: [value.icon]
    });
    setStateWrap({
      equityTitle: '修改权益'
    });
    toggleModal();
  }
  /**
   * 新增权益显示
   */
  async function handleAddEquity() {
    form1.resetFields();
    /** 获取下级机构列表 */
    await getInstitutionList();
    setStateWrap({
      equityTitle: '添加权益'
    });
    toggleModal();
  }
  /**
   *
   * @param value 删除权益
   */
  function handleDeleteEquity(value: IResponseEquityResult) {
    equityPackageManageService.deleteEquity(value.id).subscribe(() => {
      message.info('删除成功');
      handleGetEquity();
      handleSearchEquity();
    });
  }

  /**
   * 修改权益包
   */
  function handleContextMenuChangePackage(value: InsertEquityGroupParams) {
    currentEquityPackage = value;
    let equityList: string[] = [];
    let _form: any[] = [];
    let _formObject = {};
    const distributor = {
      label: value.distributorName,
      value: value.distributorId,
      key: value.distributorId
    };
    equityList = value.equityList.map((item: EquityListPackage) => item.equityId);
    _form = value.equityList.map((item: EquityListPackage) => {
      console.log('item.oilSubsidy===>', item.oilSubsidy);
      const _item = {
        [`userConfigEquity.${item.equityId}.userConfigEquityProportion`]: item.proportion || undefined,
        [`userConfigEquity.${item.equityId}.userConfigEquityProportionNumber`]: item.number || undefined,
        [`yearConfig.${item.equityId}`]: item.month || undefined,
        [`tuanYouConfig.${item.equityId}`]: item.oilSubsidy || undefined
      };

      _formObject = { ..._formObject, ..._item };
      return _item;
    });
    handleGetDropEquity(value.distributorId);
    console.log('_formObject===>', _formObject);
    form2.setFieldsValue({
      ...value,
      distributor,
      equityList,
      ..._formObject
    });
    setStateWrap({
      equityPackageTitle: '修改权益包'
    });
    toggleModal2();
  }
  /**
   * 新增权益包显示
   */
  function handleAddEquityPackage() {
    form2.resetFields();
    form2.setFieldsValue({
      equityList: []
    });
    setStateWrap({
      equityPackageTitle: '添加权益包',
      disableFooter: false
    });
    toggleModal2();
  }
  /**
   *
   * @param value 删除权益包
   */
  function handleDeleteEquityPackage(value: EquityList) {
    equityPackageManageService.deleteEquityPackage(value.id).subscribe(() => {
      message.info('删除成功');
      handleSearch();
    });
  }

  return {
    state,
    handleSearch,
    form,
    form1,
    form2,
    tableAction,
    changeTablePageIndex,
    addOrder,
    toggleModal,
    handleOk,
    toggleModal2,
    handleOk2,
    handleContextMenuChange,
    handleAddEquity,
    currentEquity,
    handleDeleteEquity,
    handleResetSearch,
    handleContextMenuChangePackage,
    handleAddEquityPackage,
    handleDeleteEquityPackage,
    currentEquityPackage,
    setStateWrap,
    changeTablePageIndexEquity,
    handleFormChangeEvent,
    watch2
  };
}
