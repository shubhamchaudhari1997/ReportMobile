import {DrawerRouterOptions} from '@react-navigation/native';
import * as SCREENS from './screens';

import {Component} from 'react';
import DashboardStacks, { AgeingStacks, KPIStacks, OperationalStacks, QualityReportStacks, ReportsStacks } from './Stacks';
import DeleteAccount from '../screens/common/DeleteAccount';
import { Platform } from 'react-native';

const appStacks = {
 // Auth Stack
  login: {
    initialRouteName: 'StartUp',
    stacksArr: [
      {
        name: 'StartUp',
        key: 'startup',
        component: SCREENS.StartUp,
        options: {headerShown: false},
      },
      {
        name: 'Login',
        key: 'login',
        component: SCREENS.Login,
        options: {headerShown: false},
      },
      // {
      //   name: 'Signup',
      //   key: 'signup',
      //   component: SCREENS.SignUp,
      //   options: {headerShown: false},
      // },
    ],
  },

  // Main Stack

  dashboard: {
    initialRouteName: 'Dashboard',
    stacksArr: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        component: SCREENS.Dashboard,
        icon: 'home',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],
  },


  operationalStacks: {
    initialRouteName: 'Operational',
    stacksArr: [
      {
        name: 'Operational',
        key: 'operational',
        component: SCREENS.Operational,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'OperationalData',
        key: 'operationalData',
        component: SCREENS.OperationalData,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],
  },
  reportsStacks: {
    initialRouteName: 'DetailReports',
    stacksArr: [
      {
        name: 'DetailReports',
        key: 'detailReports',
        component: SCREENS.DetailReports,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'ViewByMonthYear',
        key: 'viewByMonthYear',
        component: SCREENS.ViewByMonthYear,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'ViewKPI',
        key: 'viewKPI',
        component: SCREENS.ViewKPI,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'ViewKPIDetails',
        key: 'viewKPIDetails',
        component: SCREENS.ViewKPIDetails,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'DetailReportsView',
        key: 'detailReportsView',
        component: SCREENS.DetailReportsView,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'DetailsReportViewDr',
        key: 'detailsReportViewDr',
        component: SCREENS.DetailsReportViewDr,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'DetailsReportViewCommon',
        key: 'detailsReportViewCommon',
        component: SCREENS.DetailsReportViewCommon,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],
  },
  kpiStacks: {
    initialRouteName: 'KpiScreen',
    stacksArr: [
      {
        name: 'KpiScreen',
        key: 'kpiScreen',
        component: SCREENS.KpiScreen,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'PLScreen',
        key: 'pLScreen',
        component: SCREENS.PLScreen,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'BSScreen',
        key: 'bsScreen',
        component: SCREENS.BSScreen,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'Customer',
        key: 'customer',
        component: SCREENS.Customer,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'Employee',
        key: 'employee',
        component: SCREENS.Employee,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'Other',
        key: 'other',
        component: SCREENS.Other,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],
  },

  ageingStacks: {
    initialRouteName: 'Ageing',
    stacksArr: [
      {
        name: 'Ageing',
        key: 'ageing',
        component: SCREENS.index,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],

    
  },
  qualityReportStacks: {
    initialRouteName: 'SLA',
    stacksArr: [
      {
        name: 'SLA',
        key: 'sla',
        component: SCREENS.SLA,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
      {
        name: 'ViewSLA',
        key: 'viewSLA',
        component: SCREENS.ViewSLA,
        icon: 'reader',
        type: 'Ionicons',
        options: {headerShown: false},
      },
    ],

    
  },

};

const appBottomTabs = {
  homeTabs: {
    tabsArr: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        component: SCREENS.Dashboard,
        icon: 'home',
      },
    ],
  },
};

type AppDrawerTabType = {drawerTabsArr: Array<any>} & DrawerRouterOptions;

const appDrawerTabs: AppDrawerTabType = {
  initialRouteName: 'Home',
  drawerTabsArr: [
    {
      name: 'Home',
      key: 'home',
      component: DashboardStacks,
      icon: 'home',
      type: 'Ionicons',
    },
    {
      name: 'Operational Reports',
      key: 'operationalReports',
      component: OperationalStacks,
      icon: 'reader',
      type: 'Ionicons',
    },
    {
      name: 'Detail Report',
      key: 'detailsReport',
      component: ReportsStacks,
      icon: 'list',
      type: 'Ionicons',
    },
    {
      name: 'KPI',
      key: 'kpi',
      component: KPIStacks,
      icon: 'laptop-outline',
      type: 'Ionicons',
    },  
    {
      name: 'Ageing',
      key: 'ageing',
      component: AgeingStacks,
      icon: 'library-outline',
      type: 'Ionicons',
    },  
    {
      name: 'SLA & Deliverables',
      key: 'sLA&Deliverables',
      component: QualityReportStacks,
      icon: 'layers-outline',
      type: 'Ionicons',
    },  
   Platform.OS==='ios' &&{
      name: 'Delete Account',
      key: 'sLA&Deliverables',
      component: DeleteAccount,
      icon: 'deleteuser',
      type: 'AntDesign',
    }, 
  ].filter(Boolean),
};

const appTopTabs: any = [];

export {appStacks, appBottomTabs, appTopTabs, appDrawerTabs};
