import Snackbar from 'react-native-snackbar';
import {COLORS, FONTS} from '../theme';

const showSnackbar = (message: string, status?: string) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: COLORS.primaryColor,
    // fontFamily: FONTS.regular,
    backgroundColor: status === 'warning' ? COLORS.danger : status==="success"?COLORS.greenLightShade: COLORS.accentColor,  });
};

const hideSnackbar = () => {
  Snackbar.dismiss();
};

export {showSnackbar, hideSnackbar};
