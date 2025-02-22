import axios from 'axios';
import {MARKETING_ACCESS} from '../../constant/URLs';

export const getAccess = async () =>
  await axios.get(MARKETING_ACCESS).then(response => response.data.tenants);
