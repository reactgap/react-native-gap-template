import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Box, moderateScale } from 'components';
import Lottie from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { selectDark } from 'redux/reducers/appearance';

interface SplashScreenProps {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lottie: {
    width: moderateScale(200),
    height: moderateScale(200),
  },
});

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  // const dispatch = useDispatch();
  const animationRef = useRef<Lottie>(null);
  const isDark = useSelector(selectDark);
  useEffect(() => {
    animationRef.current?.play();

    setTimeout(() => {
      navigation.navigate('Auth');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle={isDark ? 'dark-content' : 'light-content'} />
      <Box flex={1} justifyContent="center" alignItems="center">
        <Lottie
          ref={animationRef}
          style={styles.lottie}
          source={require('../assets/lottie/loading.json')}
        />
      </Box>
    </View>
  );
};

export default SplashScreen;
