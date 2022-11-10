import { IOrganizationConfigurationState } from './organization-configuration.interface';
import { useStateStore } from '@fch/fch-tool';
import { useForm } from '@fch/fch-shop-web';

export function useOrganizationConfigurationStore() {
  const { state, setStateWrap } = useStateStore(new IOrganizationConfigurationState());

  // 左侧表单
  const form1 = useForm();

  //
  function tableAction(row: any, actionName: string) {
    console.log(row, actionName);
    if (actionName == '配置') {
      //
    }
    if (actionName == '设置额度') {
      //
    }
    if (actionName == '日志') {
      //
    }
  }

  // 左侧页面页码
  function changeTablePageLeft(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchFormOrgConfig: {
        size: pageSize,
        index
      }
    });
    handleSearchLeft(index, pageSize);
  }
  // 主页面页码
  function changeTablePageMain(index: number, pageSize: number) {
    console.log(index, pageSize);
    setStateWrap({
      searchForm: {
        size: pageSize,
        index
      }
    });
    handleSearchMain(index, pageSize);
  }

  // 左侧列表查询请求
  function handleSearchLeft(page = 1, size = 10) {
    setStateWrap({
      isLoadingOrgConfig: true
    });
    // todo 网络请求
    /* equityPackageManageService
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
      ); */
  }

  // 主体查询表单
  function handleSearchMain(page = 1, size = 10) {
    setStateWrap({
      isLoading: true
    });
    // todo 网络请求
    /* equityPackageManageService.getEquityList(params).subscribe(
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
    ); */
  }

  // todo 参数dto等后端配置
  function handleSearch() {
    setStateWrap({
      isLoading: true
    });
    // todo 发送请求
    /* equityPackageManageService.getEquityList(params).subscribe(
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
    ); */
  }

  return {
    state,
    changeTablePageLeft,
    changeTablePageMain,
    form1,
    tableAction,
    handleSearchMain,
    handleSearch
  };
}
