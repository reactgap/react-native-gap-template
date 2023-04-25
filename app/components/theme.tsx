import React, { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle, Dimensions, RegisteredStyle } from 'react-native';
import {
  createTheme,
  createText,
  createBox,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from '@shopify/restyle';
import { useSelector } from 'react-redux';
import { selectDark } from '../redux/reducers/appearance';
import { moderateScale, StringifiedStyles } from 'react-native-size-matters';

export const pallette = {
  white: '#ffffff',
  secondary: '#0C0D34',
  danger: '#ff1c49',
  orange: '#FE5E33',
  blue: '#02b1ff',
  green: '#27BB66',
  greenDark: '#4F9F7C',
  greenLight: '#F6FFF3',
  darkGrey2: '#73797f',
  darkGrey3: '#777A7A',
  darkGrey4: '#cccccc',
  grey: '#505259',
  darkGrey: '#26252b',
  dark: '#36383f',
  transparent: 'transparent',
  lightGrey: '#f1f5f6',
  lightGrey2: '#9aa0a5',
  lightGrey3: '#EBEBEB',
  black: '#000000',
};

export const theme = createTheme({
  colors: {
    primary: pallette.blue,
    primaryLight: pallette.greenLight,
    orange: pallette.orange,
    greenDark: pallette.greenDark,
    secondary: pallette.secondary,
    danger: pallette.danger,
    border: pallette.darkGrey3,
    text: pallette.dark,
    textPrimary: pallette.green,
    backgroundTab: pallette.black,
    background: pallette.white,
    backgroundCard: pallette.white,
    btnBgNormal: pallette.darkGrey4,
    textBntNormal: pallette.black,
    dark: pallette.black,
    white: pallette.white,
    tabBarText: pallette.black,
    tabBarIcon: pallette.black,
    tabBarCircle: pallette.darkGrey2,
    line: pallette.darkGrey3,
    segment: pallette.lightGrey3,
    icon: pallette.black,
  },
  widthSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  spacing: {
    zero: moderateScale(0),
    n: moderateScale(4),
    s: moderateScale(8),
    m: moderateScale(16),
    mx2: moderateScale(32),
    l: moderateScale(24),
    xl: moderateScale(40),
    xxl: moderateScale(60),
  },
  button: {
    s: moderateScale(20),
    m: moderateScale(32),
    l: moderateScale(48),
    xl: moderateScale(60),
  },
  borderRadii: {
    z: moderateScale(0),
    s: moderateScale(4),
    sm: moderateScale(8),
    m: moderateScale(10),
    l: moderateScale(25),
    ml: moderateScale(50),
    xl: moderateScale(75),
    xxl: moderateScale(100),
  },
  textVariants: {
    defaults: {},
    fontFamily: {
      fontFamily: 'Roboto-Regular',
    },
    textLarge: {
      color: 'text',
      fontSize: moderateScale(18),
      fontFamily: 'Roboto-Regular',
      fontWeight: '600',
    },
    textLargeBold: {
      color: 'text',
      fontSize: moderateScale(18),
      fontFamily: 'Roboto-Bold',
    },
    textLargeSemiBold: {
      color: 'text',
      fontSize: moderateScale(18),
      fontFamily: 'Roboto-Medium',
    },
    textPrimary: {
      color: 'textPrimary',
      fontFamily: 'Roboto-Regular',
    },
    textDisable: {
      color: 'text',
      fontFamily: 'Roboto-Regular',
    },
    textSecondary: {
      color: 'secondary',
      fontFamily: 'Roboto-Regular',
    },
    textBold: {
      color: 'text',
      fontFamily: 'Roboto-Bold',
    },
    textSemiBold: {
      color: 'tabBarText',
      fontFamily: 'Roboto-Medium',
    },
    textRegular: {
      fontWeight: '400',
      fontFamily: 'Roboto-Regular',
      color: 'text',
    },
    hero: {
      fontFamily: 'Roboto-Bold',
      fontSize: moderateScale(50),
      lineHeight: moderateScale(80),
      color: 'text',
    },
    text: {
      color: 'text',
      fontFamily: 'Roboto-Regular',
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    border: pallette.lightGrey2,
    text: pallette.white,
    icon: pallette.white,
    textPrimary: pallette.green,
    backgroundTab: pallette.black,
    //use for Flatlist
    backgroundCard: pallette.darkGrey,
    background: '#1a1d27',
    tabBarText: pallette.blue,
    tabBarIcon: pallette.blue,
    tabBarCircle: pallette.blue,
    line: pallette.white,
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDark = useSelector(selectDark);
  return <ReStyleThemeProvider theme={isDark ? darkTheme : theme}>{children}</ReStyleThemeProvider>;
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = {
  [P in keyof T]:
    | ViewStyle
    | TextStyle
    | ImageStyle
    | RegisteredStyle<T[P] & Record<Extract<keyof T[P], keyof StringifiedStyles>, number>>;
};

export const makeStyles =
  <T extends NamedStyles<T> | NamedStyles<any>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
