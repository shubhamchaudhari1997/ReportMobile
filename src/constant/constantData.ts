export const graphNameList = [
  {key: '0', Name: 'Channels | Enquiry'},
  {key: '1', Name: 'Campaigns | Enquiry'},
  {key: '2', Name: 'AdSet  | Enquiry'},
  {key: '3', Name: 'Ad | Enquiry'},
  {key: '4', Name: 'Cost Per Lead'},
  {key: '5', Name: 'Cost Per SiteVisit'},
  {key: '6', Name: 'Cost Per SiteVisit Conduct'},
  {key: '7', Name: 'Cost Per Booking'},
];

export const sourceTypeList = [
  {key: '0', Name: 'Source'},
  {key: '1', Name: 'Campaign'},
];

export const FunnelType = [
  { key: '0', Name: 'Prospect' },
  { key: '1', Name: 'Hot'},
  { key: '2', Name: 'Incoming' },
  { key: '3', Name: 'Warm' },
  { key: '4', Name: 'Evaluation' },
  { key: '', Name: 'Booking' },
  { key: '7', Name: 'Total' },
];
// export const FunnelType = [
//   { key: '0', Name: 'Prospect',subName:'Interest' },
//   { key: '1', Name: 'Hot',subName:'Intent'},
//   { key: '2', Name: 'Incoming',subName:'Awareness' },
//   { key: '3', Name: 'Warm',subName:'Consideration' },
//   { key: '4', Name: 'Evaluation', subName:'Loyalty' },
//   { key: '5', Name: 'Booking',subName:'Booking' },
//   { key: '7', Name: 'Total',subName:'Total' },
// ];

export const schedulerPlatform = [
  {key: '0', Name: 'Email'},
  {key: '1', Name: 'Instagram'},
  {key: '2', Name: 'Facebook'},
  {key: '3', Name: 'linkedin'},
];

export const stackholderType = [
  {type: 'Broker', key: 'CRO', value: 'CRO', IsProject: false},
  {type: 'Broker', key: 'ChannelPartner', value: 'CP', IsProject: false},
  {type: 'Lead', key: 'Customer', value: 'Customer', IsProject: true},
  {type: 'Lead', key: 'Enquiry', value: 'Enquiry', IsProject: true},
  {type: 'Lead', key: 'Referral', value: 'Lead', IsProject: true},
  {
    type: 'VendorMaster',
    key: 'VendorMaster',
    value: 'Consultant',
    IsProject: false,
  },
  {type: 'ByFile', key: 'ByFile', value: 'By File', IsProject: false},
  {type: 'SmartList', key: 'SmartList', value: 'Smart List', IsProject: false},
];

export const MediaType=[
    {key: '0', Name: 'Image'},
    {key: '1', Name: 'content'},
]


export const TargetAudience=[
  {
    key:'0',Name:'Customer'
  },
  {
    key:'1',Name:'Enquiry'
  },
  {
    key:'2',Name:' Lead '
  }
]

export const Relation=[
  {
    key:'0',Name:'Equal to'
  },
  {
    key:'1',Name:'Not Equal to'
  }
]
export const Operator=[
  {
    key:'0',Name:'AND'
  },
  {
    key:'1',Name:'OR'
  }
]

export const effortDataOption=[
  {
    key:'0',Name:'Lead'
  },
  {
    key:'1',Name:'Enquiry'
  },
  {
    key:'2',Name:'Customer'
  },
   {
    key:'3',Name:'ChannelPartner'
  }
]

