import moment from 'moment';
import NullHandler from './nullHandler';

const getFormatedDate = (date: any, format?: string) => {
  let formatDate;
  if (NullHandler(date) === 'NA') {
    return 'NA';
  }
  formatDate = moment(date).format(format ? format : 'DD, MMMM YYYY');
  return formatDate;
};

export const getTimeDifference = (startTime: any, endTime: any) => {
  if (!startTime || startTime == null) {
    return '';
  }
  if (!endTime || endTime == null) {
    return '';
  }

  const startTimeForm = moment(
    moment(startTime).format('kk:mm:ss'),
    'kk:mm:ss',
  );
  const endTimeForm = moment(moment(endTime).format('kk:mm:ss'), 'kk:mm:ss');

  const duration = moment.duration(endTimeForm.diff(startTimeForm));

  // duration in hours
  let hours = duration.hours();
  if (hours < 0) {
    hours = 24 + hours;
  }
  if (hours < 10) {
    hours = Number('0' + hours);
  }

  // duration in minutes
  let minutes = duration.minutes();
  if (minutes < 0) {
    minutes = 24 + minutes;
  }
  if (minutes < 10) {
    minutes = Number(0 + '' + minutes);
  }

  let sec = duration.seconds();
  if (sec < 0) {
    sec = 24 + sec;
  }
  if (sec < 10) {
    sec = Number(0 + '' + sec);
  }

  return hours + ':' + minutes + ':' + sec;
};

export const getDateDifference = (
  startDate: string,
  endDate: string | Date,
) => {
  return moment(endDate).diff(moment(startDate), 'days');
};

export const getSubstratedDays = (date: Date, days?: string) => {
  return moment(date).subtract(days, 'days').format('YYYY-MM-DD');
};
export const getDateDifferenceByDay = (
  startDate: string,
  endDate: string | Date,
) => {
  const start = moment(startDate).startOf('day');
  const end = moment(endDate).startOf('day');

  // Calculate the difference in days
  return end.diff(start, 'days');
};

export const isFutureOrToday = (date:any, time:any) => {
  const formattedDate = moment(`${date} ${time}`, 'DD/MM/YYYY HH:mm').isSameOrAfter(moment(), 'minute');
  return formattedDate;
};


export default getFormatedDate;
