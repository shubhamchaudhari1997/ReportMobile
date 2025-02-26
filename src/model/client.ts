type postSortByMYDataDataParam = {
  Template: number
};


type drAgeingTemplateParam = {
  tempid: number
};

type ViewReportModal = {
  TempID: number
};

type MonthlyData = {
  closed: number[];
  leads: number[];
  leadsFree: number[];
  monthLabels: string[];
  potential: number[];
}

type WeeklyData = {
  closed: number[];
  leads: number[];
  leadsFree: number[];
  potential: number[];
  allCol: string[][];
  weekLabels: string[];
}

type OperationalDataResponse = {
  monthlyData: MonthlyData;
  weeklyData: WeeklyData;
}

type OperationalDataProps = {
  selectedFileId: string;
  selectedMonthId: string;
}

