export default function NullHandler(str: any, isNumber?: boolean) {
    return str && str !== null && str !== '' ? str + '' : isNumber ? '0' : 'NA';
  }
  

