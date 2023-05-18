// RootNavigation.js

import * as React from 'react';
import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef<any>>();
export const isReadyRef = React.createRef();

export function navigate(name: string, params?: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function resetStack(name: string, params: ParamListBase) {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name,
        params,
      },
    ],
  });
}

export function goBack() {
  navigationRef.current?.goBack();
}
