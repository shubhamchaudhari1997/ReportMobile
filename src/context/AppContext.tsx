import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {COLORS, FONTS} from '../theme';

const theme = {
  colors: {...COLORS},
  fonts: {...FONTS},
  mode: 'light',
  changeTheme: (mode: 'dark' | 'light') => {
    theme.mode = mode;
  },
};

const AppContext = createContext({theme});

type MainContextProps = PropsWithChildren & {};

const MainContext: React.FC<MainContextProps> = ({children}) => {
  return <AppContext.Provider value={{theme}}>{children}</AppContext.Provider>;
};

export {MainContext, AppContext};
