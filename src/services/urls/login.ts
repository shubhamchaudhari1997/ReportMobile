import url from ".";

const DEFAULT_URL = 'UserId,EntityId,UserType';
const loginController = () => {
  const common = {
    login: '/Login/login',
  };
  const getCampaign = (url: string) => {
    return `/Campaign/${url}`;
  };


  const campaign = {
    getPlanMaster: getCampaign(`PlanMasterSearchSelect/${DEFAULT_URL}`),
  };

  return {
    common,
    campaign,
  };
};
export default loginController;
