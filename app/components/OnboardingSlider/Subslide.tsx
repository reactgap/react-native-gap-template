import React from 'react';
import { View, Dimensions } from 'react-native';
import Button from '../Button';
import { Text, Theme, makeStyles } from '../theme';

interface SubslideProps {
  subtitle: string;
  description: string;
  last?: boolean;
  onPress: () => void;
  nextTitle: string;
  discoverTitle: string;
}
const { width } = Dimensions.get('window');

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
    width,
    overflow: 'hidden',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    width: 245,
    borderRadius: 25,
  },
  buttonContent: {
    height: 50,
  },
}));

const Subslide = ({
  subtitle,
  description,
  last,
  onPress,
  nextTitle,
  discoverTitle,
}: SubslideProps) => {
  const styles = useStyles();
  return (
    <View style={[styles.container]}>
      <Text variant="textLargeSemiBold" style={styles.subtitle}>
        {subtitle}
      </Text>
      <Text variant="textRegular" style={styles.description}>
        {description}
      </Text>
      <Button
        {...{ onPress }}
        label={last ? discoverTitle : nextTitle}
        variant={last ? 'primary' : 'default'}
      />
    </View>
  );
};

Subslide.defaultProps = {
  nextTitle: 'Next',
  discoverTitle: 'Discover',
};
export default Subslide;
