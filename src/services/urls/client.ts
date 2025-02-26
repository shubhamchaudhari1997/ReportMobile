const DEFAULT_URL = 'UserId,EntityId,UserType';
const clientController = () => {
  const getCommonData = (url: string) => {
    return `/Client/${url}`;
  };

  const getHomeDetails = {
    getHomeDetails: getCommonData(`Index`),
  };
  const getOperationalDetails = {
    getOperationalDetails: getCommonData(`operational`),
  };
  const getWeeklyDetails = {
    getWeeklyDetails: getCommonData(`getWeeklyData`),
  };
  const getKPIDetails = {
    getBSDetails: getCommonData(`BsChart`),
    getCustomerDetails: getCommonData(`OTChart`),
    getEmployeeDetails: getCommonData(`OTChart1`),
    getOtherDetails: getCommonData(`OTChart2`),
    getPLDetails: getCommonData(`PlChart`),
  };
  const getAgeingDetails = {
    getAgeingData: getCommonData(`AgeingChart`),
    getDrAgeingChartData: getCommonData(`DrAgeingChart`),
  };

  const getReportDetails = {
    getReportsData: getCommonData(`GetReports`),
    getsortByMYDetails: getCommonData(`sortByMY`),
    getKpiData: getCommonData(`ViewKPI`),
    getKPIDetails: getCommonData(`getKPIDetails/13`),
    getViewReportAgeing: getCommonData(`ViewReportAgeing`),
  };

  const getQualityReportDetails = {
    getViewSLADetails: getCommonData(`ViewSLA`),
    getViewSLADetailsById : getCommonData(`ViewSLA`),
  };

  return {
    getHomeDetails,
    getOperationalDetails,
    getWeeklyDetails,
    getKPIDetails,
    getAgeingDetails,
    getReportDetails,
    getQualityReportDetails,
  };
};
export default clientController;
