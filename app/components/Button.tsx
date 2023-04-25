import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Text, useTheme, theme as themeApp } from './theme';

interface ButtonProps {
  variant: 'default' | 'primary' | 'transparent' | 'secondary';
  componentName?: 'TouchableWithoutFeedback' | 'RectButton';
  label?: string;
  onPress: () => void;
  children?: React.ReactNode;
  width?: number | string;
  disabled?: boolean;
  textColor?: string;
  customStyle?: StyleProp<ViewStyle>;
  textSize?: number;
}

export const wSingleButton = Dimensions.get('window').width - themeApp.spacing.m * 2;
export const wDoubleButton = (Dimensions.get('window').width - themeApp.spacing.m * 3) / 2;
const HEIGHT = 44;
export const buttonStyles = StyleSheet.create({
  button: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2.0,
  },
  closeButton: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2.0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    // borderColor: theme.colors.orange,
  },
  closeButtonGrey: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2.0,
    // backgroundColor: theme.colors.grey,
  },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: HEIGHT,
    borderRadius: HEIGHT / 2.0,
  },
});

const Button = ({
  children,
  label,
  onPress,
  variant,
  width,
  customStyle,
  disabled,
  textColor,
  componentName,
  textSize = 14,
}: ButtonProps) => {
  const theme = useTheme();
  let backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'transparent'
      ? 'transparent'
      : theme.colors.btnBgNormal;

  let color =
    variant === 'primary'
      ? theme.colors.white
      : variant === 'transparent'
      ? 'transparent'
      : theme.colors.textBntNormal;
  if (variant === 'secondary') {
    backgroundColor = theme.colors.secondary;
    color = theme.colors.text;
  }
  const Component =
    componentName === 'RectButton' || Platform.OS === 'ios' ? RectButton : TouchableOpacity;

  return (
    <Component
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor,
          width: width || 245,
          minWidth: width || 245,
          opacity: disabled ? 0.7 : 1.0,
          overflow: 'hidden',
        },
        customStyle,
      ]}
      enabled={!disabled}
      {...{ onPress, disabled }}>
      {children ? (
        children
      ) : (
        <Text
          variant="text"
          textAlign="center"
          style={{ color: textColor || color, fontSize: textSize }}>
          {label}
        </Text>
      )}
    </Component>
  );
};

Button.defaultProps = { variant: 'default', componentName: 'RectButton' };

export default Button;
