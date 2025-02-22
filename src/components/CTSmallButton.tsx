import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../theme';
import {fontsProxima} from '../theme/typography';
import CDText from './core/CDText';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  active: boolean;
  disabled?: boolean;
};

const CTSmallButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  active,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        styles.button,
        {
          backgroundColor: active ? COLORS.new : COLORS.primaryColor,
        },
      ]}
      onPress={onPress}>
      <CDText
        style={[
          styles.title,
          {
            color: active ? COLORS.primaryColor : COLORS.secondaryColor,
            opacity: active ? 1 : 0.8,
            fontSize: active ? 15 : 14,
          },
        ]}>
        {title}
      </CDText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 0,
  },
  title: {
    //    fontSize: 14,
    fontFamily: fontsProxima.semi_bold,
  },
});

export default CTSmallButton;
