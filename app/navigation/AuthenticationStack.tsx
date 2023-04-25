import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from 'containers/Onboarding';
import { AuthStackRoute } from 'types/navigation';

const Stack = createNativeStackNavigator<AuthStackRoute>();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Onboarding'}
      screenOptions={{
        headerShown: false,
        // cardStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
