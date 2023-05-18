// In App.js in a new project

import * as React from 'react';
import { Box, Onboarding } from 'components';
import { useTranslation } from 'react-i18next';

const sliders = [
  {
    title: '',
    subtitle: 'Intro 1',
    description: 'Description 1 here',
    color: '#ECF3EE',
    picture: {
      src: require('../assets/images/intro1.png'),
      width: 2513,
      height: 3483,
    },
  },
  {
    title: '',
    subtitle: 'Intro 2',
    description: 'Description 2 here',
    color: '#BEECC4',
    picture: {
      src: require('../assets/images/intro2.png'),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: '',
    subtitle: 'Intro 3',
    description: 'Description 3 here',
    color: '#FFE4D9',
    picture: {
      src: require('../assets/images/intro3.png'),
      width: 2513,
      height: 3483,
    },
  },
];

function OnboardingScreen({ navigation }) {
  const { t } = useTranslation();
  const onDiscoverPress = () => {
    navigation.navigate('BottomTabs');
  };

  return (
    <Box flex={1}>
      <Onboarding
        nextTitle={t('ONBOADING_NEXT_BTN')}
        discoverTitle={t('ONBOADING_DISCOVER_BTN')}
        sliders={sliders}
        onDiscoverPress={onDiscoverPress}
      />
    </Box>
  );
}

export default OnboardingScreen;
