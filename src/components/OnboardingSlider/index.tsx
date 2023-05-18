import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  Extrapolation,
} from 'react-native-reanimated';

import Slider, { SLIDE_HEIGHT, BORDER_RADIUS } from './Slider';
import Subslide from './Subslide';
import Dot from './Dot';
import { makeStyles, Theme } from '../theme';

const { width } = Dimensions.get('window');

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background,
  },
  slider: {
    height: SLIDE_HEIGHT,
    backgroundColor: theme.colors.background,
    borderBottomRightRadius: theme.borderRadii.xl,
    borderBottomLeftRadius: theme.borderRadii.xl,
  },
  footerContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  footer: {
    flex: 1,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    top: -10,
    height: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    borderBottomRightRadius: theme.borderRadii.xl,
    borderBottomLeftRadius: theme.borderRadii.xl,
  },
}));

interface SliderInfo {
  title?: string;
  subtitle: string;
  description: string;
  color: string;
  picture: {
    src: ImageSourcePropType;
    width: number;
    height: number;
  };
}

interface Props {
  nextTitle: string;
  discoverTitle: string;
  onDiscoverPress: () => void;
  sliders: SliderInfo[];
}

const OnboardingSlider = ({ nextTitle, discoverTitle, onDiscoverPress, sliders }: Props) => {
  // variable
  const styles = useStyles();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const currentIndex = useDerivedValue(() => x.value / width);

  const bgStyle = useAnimatedStyle<any>(() => {
    const backgroundColor = interpolateColor(
      x.value,
      sliders.map((_, i) => i * width),
      sliders.map(slide => slide.color),
    );
    return {
      backgroundColor: backgroundColor,
    };
  });
  const subSlideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, bgStyle]}>
        {sliders.map(({ picture }, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const animatedStyles = useAnimatedStyle(() => {
            const opacity = interpolate(
              x.value,
              [(index - 0.7) * width, index * width, (index + 0.5) * width],
              [0, 1, 0],
              { extrapolateRight: Extrapolation.CLAMP },
            );
            return {
              opacity: opacity,
              overflow: 'hidden',
            };
          });

          return (
            <Animated.View style={[styles.underlay, animatedStyles]} key={index}>
              <Image
                source={picture.src}
                resizeMode="center"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: width,
                  height: (width * picture.height) / picture.width,
                  overflow: 'hidden',
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          onScroll={scrollHandler}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}>
          {sliders.map(({ title, picture }, index) => (
            <Slider key={index} right={!!(index % 2)} {...{ title, picture }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
            },
            bgStyle,
          ]}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {sliders.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{ index, x }} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                width: width * sliders.length,
              },
              subSlideStyle,
            ]}>
            {sliders.map(({ subtitle, description }, index) => {
              const last = index === sliders.length - 1;
              return (
                <Subslide
                  key={index}
                  {...{ subtitle, description, last, nextTitle, discoverTitle }}
                  onPress={() => {
                    if (last) {
                      onDiscoverPress();
                    } else {
                      scroll?.current?.scrollTo({ x: width * (index + 1), animated: true });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default OnboardingSlider;
