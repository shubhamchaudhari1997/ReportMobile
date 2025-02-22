/**
 * This api end point is from channel partner module
 * sorted with each controller
 *
 * @author Parikshat Meena
 * @param @Request
 */
import {Request} from '../../model';
import url from '../urls';

const getClientApi = ({get, post, put}: Request) => {
  const getHomeData = () =>
    get({url: url.client.getHomeDetails.getHomeDetails});

  const getOperationalData = () =>
    get({url: url.client.getOperationalDetails.getOperationalDetails});

  //KPI tab
  const getWeeklyData = ({tempId, month}: any) =>
    post({
      url: url.client.getWeeklyDetails.getWeeklyDetails,
      params: {tempId, month},
    });
  const getBSData = () => get({url: url.client.getKPIDetails.getBSDetails});
  const getCustomerData = () =>
    get({url: url.client.getKPIDetails.getCustomerDetails});
  const getEmployeeData = () =>
    get({url: url.client.getKPIDetails.getEmployeeDetails});
  const getOtherData = () =>
    get({url: url.client.getKPIDetails.getOtherDetails});
  const getPLData = () => get({url: url.client.getKPIDetails.getPLDetails});

  //Ageing tab
  const getAgeingData = () =>
    get({url: url.client.getAgeingDetails.getAgeingData});
  const getAgeingTemplate = ({tempid}: drAgeingTemplateParam) =>
    post({
      url: url.client.getAgeingDetails.getAgeingData,
      data: tempid,
    });

  //debetors
  const getDrAgeingData = () =>
    get({url: url.client.getAgeingDetails.getDrAgeingChartData});
  const getDrAgeingTemplate = ({tempid}: drAgeingTemplateParam) =>
    post({
      url: url.client.getAgeingDetails.getDrAgeingChartData,
      data: tempid,
    });

  // details report tab
  const getsortByMYData = () =>
    get({url: url.client.getReportDetails.getsortByMYDetails});

  const postSortByMYData = ({template}: any) =>
    post({
      url: url.client.getReportDetails.getsortByMYDetails,
      data: {template},
    });
  const getReportsData = () =>
    get({url: url.client.getReportDetails.getReportsData});
  const getKpiData = () => get({url: url.client.getReportDetails.getKpiData});
  const getKPIDetails = () =>
    get({url: url.client.getReportDetails.getKpiData});

  //SLA tab
  const getSLADetails = () =>
    get({url: url.client.getQualityReportDetails.getViewSLADetails});
  const getViewSLADetails = () =>
    get({url: url.client.getQualityReportDetails.getViewSLADetailsById});

  return {
    getHomeData,
    getOperationalData,
    getWeeklyData,
    getBSData,
    getCustomerData,
    getEmployeeData,
    getOtherData,
    getPLData,
    getAgeingData,
    getAgeingTemplate,
    getDrAgeingData,
    getDrAgeingTemplate,
    getsortByMYData,
    postSortByMYData,
    getKpiData,
    getKPIDetails,
    getSLADetails,
    getViewSLADetails,
    getReportsData,
  };
};
export default getClientApi;
