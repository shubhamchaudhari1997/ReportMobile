
/**
 * This is all urls end point we are using for api calls separated by each module
 *
 * @author Parikshat Meena
 */

import clientController from "./client";
import loginController from "./login";

const url = {
  login: loginController(),
  client: clientController(),
};
//Add  ! to __DEV__ flag for release Build with Dev Environment(url).
//For release build in Production Environment(url) do not add ! to __DEV__ flag.
//In production by defualt this flag will be false so for aab bundle do not add ! for __DEV__.
const LOCAL = false;
const BASE_URL = __DEV__
  ? !LOCAL
    ? {
        // Development
        // CUSTOMER: 'https://ynprodapi.azurewebsites.net/',
        CLIENT: 'https://apireposrtsystem-gmadfrdfb0cphham.centralindia-01.azurewebsites.net',
      }
    : {
        // local
        CLIENT: 'https://apireposrtsystem-gmadfrdfb0cphham.centralindia-01.azurewebsites.net',
      }
  : {
      // Production
      CLIENT: 'https://apireposrtsystem-gmadfrdfb0cphham.centralindia-01.azurewebsites.net',
    };

export {BASE_URL};

export default url;
