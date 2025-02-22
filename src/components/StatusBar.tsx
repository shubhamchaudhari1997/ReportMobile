import React, { useContext, useEffect } from 'react';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import context from '../context';


type StatusBarIProps = {
  backgroundColor?: string;
  type?: 'dark' | 'light';
} & StatusBarProps;

const StatusBar: React.FC<StatusBarIProps> = ({
  backgroundColor,
  type,
  ...props
}) => {
  const isFocused = useIsFocused();
  const statusBarIOS = useContext(context.statusBarIOS);

  useEffect(() => {
    if (isFocused) {
      statusBarIOS.setBackgroundColor(backgroundColor);
    }
  }, [isFocused]);

  if (isFocused) {
    statusBarIOS.setBackgroundColor(backgroundColor);
    return (
      <RNStatusBar
        backgroundColor={backgroundColor}
        {...props}
        barStyle={type === 'dark' ? 'dark-content' : 'light-content'}
      />
    );
  }

  return null;
};

export default StatusBar;
