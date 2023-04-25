import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationThemeDark,
} from '@react-navigation/native';

export const AppNavigationThemeDefault = {
  ...NavigationDefaultTheme,
  color: {
    ...NavigationDefaultTheme.colors,
    primary: '#82D166',
  },
};

export const AppNavigationThemeDark = {
  ...NavigationThemeDark,
  color: {
    ...NavigationThemeDark.colors,
    primary: '#82D166',
  },
};
