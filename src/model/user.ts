type UserData = {
  length: number;
  UserId: string;
  UserEmail: string;
  UserType: string;
  EntityId: string;
  Firstname: string;
  LastName: string;
  ProfilePic: string;
  Role: any;
  Level: string;
  MobileNo: string;
  Exception: string;
  SwitchRole: string;
  TenantId: number;
  VendorType: string;
  token: string;
  AssignedSiteId: null;
  Consultant_LoginPopup: string;
  EmpModule: string;
  EngagementType: 'OnDemand' | 'Full Time';
  version: string;
  OneSignalId: string;
  EmployeeCode: number;
  ForcedLogout?: boolean;
};

type NotificationUserDetail = {
  UserId: string;
  UserEmail?: string;
  OneSignalId: string;
};

type EmployeeInfo = {
  Approved_Relieving_Date: null;
  Department: string;
  DepartmentId: number;
  Designation: string;
  ECode: string;
  EmailId: string;
  EmployeeCode: string;
  EmployeeId: number;
  EmployeeType: string;
  FirstName: string;
  IsActive: boolean;
  JobCode: string;
  LastName: string;
  Level: null;
  LocationId: null;
  LocationName: null;
  MiddelName: string;
  Role: number;
  RoleName: string;
  UserId: null;
  WeeklyOff: string;
};
type UserParamsType = {
  UserId?: number;
  EntityId?: number;
  UserType?: string;
  TenantId?: number;
};
