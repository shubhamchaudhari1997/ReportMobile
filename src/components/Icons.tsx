import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TextStyle} from 'react-native';
import {IconProps as IconType} from 'react-native-vector-icons/Icon';
import {IconFamily} from '../model';

export type IconProps = {
  type: IconFamily;
} & IconType;

export const Icon: React.FC<IconProps> = ({type: family, ...props}) => {
  switch (family) {
    case 'ZocialIcon':
      return <ZocialIcon {...props} />;
    case 'OcticonIcon':
      return <OcticonIcon {...props} />;
    case 'MaterialIcon':
      return <MaterialIcon {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcon {...props} />;
    case 'Ionicons':
      return <Ionicon {...props} />;
    case 'Foundation':
      return <FoundationIcon {...props} />;
    case 'EvilIcons':
      return <EvilIcon {...props} />;
    case 'Entypo':
      return <EntypoIcon {...props} />;
    case 'FontAwesome':
      return <FAIcon {...props} />;
    case 'FontAwesome5':
      return <FA5Icon {...props} />;
    case 'SimpleLineIcon':
      return <SimpleLineIcon {...props} />;
    case 'Feather':
      return <FeatherIcon {...props} />;
    case 'AntDesign':
      return <AntIcon {...props} />;
    case 'Fontisto':
      return <Fontisto {...props} />;
    case 'FontAwesome6':
      return <FontAwesome6 {...props} />;
    default:
      return <Ionicon {...props} />;
  }
};

export default Icon;
