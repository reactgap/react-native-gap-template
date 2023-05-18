import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ExploreStackRoute = {
  Explore: undefined;
};

export type AuthStackRoute = {
  Onboarding: undefined;
};

export type StackUseNavigation<RouteName extends keyof ExploreStackRoute> = StackNavigationProp<
  ExploreStackRoute,
  RouteName
>;

export interface ExploreStackNavigationProps<RouteName extends keyof ExploreStackRoute> {
  navigation: StackNavigationProp<ExploreStackRoute, RouteName>;
  route: RouteProp<ExploreStackRoute, RouteName>;
}
