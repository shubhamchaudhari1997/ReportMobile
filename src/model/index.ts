import {AxiosPromise, AxiosRequestConfig} from 'axios';

type Request = {
  get: (config: AxiosRequestConfig) => AxiosPromise<any>;
  post: (config: AxiosRequestConfig) => AxiosPromise<any>;
  put: (config: AxiosRequestConfig) => AxiosPromise<any>;
};

type ToastStatus = 'primary' | 'success' | 'danger' | 'warning';
type IconFamily =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'ZocialIcon'
  | 'OcticonIcon'
  | 'MaterialIcon'
  | 'MaterialCommunityIcons'
  | 'SimpleLineIcon'
  | 'FontAwesome6'
  | 'Fontisto';

type DrawerScreens = {
  name: string;
  component: React.FC<any>;
  icon: string;
};

type ReduxModel = {
  userData: UserData | null;
  projectData:ProjectData[]
};

export type {Request, IconFamily, ToastStatus, DrawerScreens, ReduxModel};
