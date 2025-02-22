const DeviceInfo = require('react-native-device-info');

export const getDeviceInfo = () => {
  try {
    let AppName = DeviceInfo.getApplicationName();
    let DeviceBrand = DeviceInfo.getBrand();
    let OS = DeviceInfo.getSystemName();
    let SystemVersion = DeviceInfo.getSystemVersion();
    let AppVersion = DeviceInfo.getVersion();
    return {
      AppName,
      DeviceBrand,
      OS,
      SystemVersion,
      Module: 'MobileApp-Phase1',
      AppVersion,
    };
  } catch (e) {
    return {
      AppName: 'Tru Realty',
      Module: 'MobileApp-Phase1',
    };
  }
};

//testing related stuff
// "avdName": "Pixel_3a_API_30_x86"
// "emulator": {
//     "type": "android.attached",
//     "device": {
//       "adbName": "705b9bf19807"
//     }
//   }

// "avdName": "Pixel_XL_API_31"
