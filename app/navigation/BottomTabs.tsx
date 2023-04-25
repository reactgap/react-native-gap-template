import React, { createRef, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Platform, Dimensions, PlatformIOSStatic } from 'react-native';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { Host } from 'react-native-portalize';
import { useTranslation } from 'react-i18next';

import { Box, Icons, Icon, useTheme, makeStyles, Theme } from 'components';
import ExploreStack from './ExploreStack';

const platform = Platform.OS;
const TabArr = [
  {
    route: 'Explore',
    label: 'Home',
    maintain: false,
    type: Icons.Ionicons,
    typeActive: Icons.Ionicons,
    icon: 'home-outline',
    iconActive: 'home-sharp',
    component: ExploreStack,
  },
  {
    route: 'Setting',
    label: 'Setting',
    maintain: false,
    type: Icons.Ionicons,
    typeActive: Icons.Ionicons,
    icon: 'settings-outline',
    iconActive: 'settings',
    component: ExploreStack,
  },
];
const wHeight = Dimensions.get('window').height;
const wwidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: 0.8 }, 1: { scale: 1 } };
const platformIOS = Platform as PlatformIOSStatic;

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const iconRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const theme = useTheme();
  const styles = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (focused) {
      iconRef.current.animate(animate1);
      // textRef.current.animate(animate1);
    }
  }, [focused]);
  const fontSize = 0.06 * wwidth;
  const fontIcon = 0.04 * wwidth;

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.wrapper}>
      <Box style={styles.container}>
        <Animatable.View
          duration={1000}
          style={[
            {
              backgroundColor: theme.colors.backgroundTab,
              borderColor: theme.colors.tabBarCircle,
            },
            item.maintain ? styles.circle : styles.normalize,
          ]}>
          <View style={[{ borderColor: theme.colors.tabBarCircle }, styles.btn]}>
            <Animatable.View ref={iconRef}>
              <Icon
                size={item.route === 'Home' ? fontSize : fontIcon}
                type={focused ? item.typeActive : item.type}
                name={focused ? item.iconActive : item.icon}
                color={theme.colors.tabBarIcon}
              />
            </Animatable.View>
          </View>
          {item.route !== 'Home' && (
            <Animatable.Text
              ref={textRef}
              style={[styles.activeText, { color: theme.colors.tabBarText }]}>
              {t(item.label)}
            </Animatable.Text>
          )}
        </Animatable.View>
      </Box>
    </TouchableOpacity>
  );
};

export const getTabBarVisibility = (route: RouteProp<any>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case 'AnyRoute':
      return 'none';
    default:
      return 'flex';
  }
};

let popupRef = createRef<any>();

export function showMediaPlayer(visible = true) {
  console.log('popupRef?.current?.show');
  if (visible && typeof popupRef?.current?.show === 'function') {
    popupRef?.current?.show();
    console.log('showMediaPlayer');
    return;
  }
  if (!visible && typeof popupRef?.current?.hide === 'function') {
    popupRef?.current?.hide();
  }
}

export default function MyTabs() {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <Host>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: [styles.tabBar],
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.label}
              component={item.component}
              options={({ route }) => ({
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
                tabBarStyle: {
                  display: getTabBarVisibility(route),
                  backgroundColor: theme.colors.backgroundTab,
                  height: platformIOS.isPad ? 0.08 * wHeight : 0.09 * wHeight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                },
              })}
            />
          );
        })}
      </Tab.Navigator>
    </Host>
  );
}

const useStyles = makeStyles((theme: Theme) => {
  console.log('theme', theme);
  return ScaledSheet.create({
    wrapper: {
      flex: 1,
      zIndex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    normalize: {
      height: '45@vs',
      width: '60@s',
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      minHeight: '59@vs',
      position: 'relative',
      bottom: 0,
      right: 0,
      left: 0,
      opacity: 1,
    },
    circle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 0.4 * wHeight,
      borderWidth: 1,
      height: 0.08 * wHeight,
      width: 0.08 * wHeight,
      backgroundColor: theme.colors.backgroundTab,
      marginBottom: 0.0001 * wHeight,
      position: 'absolute',
      bottom:
        platform === 'ios'
          ? platformIOS.isPad
            ? 0.01 * wHeight
            : 0.004 * wHeight
          : 0.003 * wHeight,
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeText: {
      fontSize: '10@ms',
      paddingTop: 5,
      textAlign: 'center',
    },
  });
});
