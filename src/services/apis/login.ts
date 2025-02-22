/**
 * This api end point is from channel partner module
 * sorted with each controller
 *
 * @author Saurabh Jadhav
 * @param @Request
 */

import {Request} from '../../model';
import url from '../urls';

const getLogingApi = ({get, post, put}: Request) => {
  const login = ({userName, password, rememberMe}: any) =>
    post({
      url: url.login.common.login,
      data: {userName, password, rememberMe},
    });
  return {
    login,
  };
};

export default getLogingApi;
