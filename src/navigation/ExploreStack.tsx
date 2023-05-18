import * as React from 'react';

import Explore from 'containers/Explore';
import { ExploreStackRoute } from 'types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ExploreStackRoute>();

const ExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Explore'}
      screenOptions={{
        headerShown: false,
        // cardStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
