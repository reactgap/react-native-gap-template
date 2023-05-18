import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '../theme';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation, useTheme } from '@react-navigation/native';
import Connection from '../Connection';

type Props = {
  title?: string;
  left?: {
    label?: string;
    icon?: ReactNode;
    onPress?: () => void;
  };
  right?: {
    label?: string;
    icon?: ReactNode;
    onPress?: () => void;
  };
  center?: boolean;
  sizeIcon?: number;
  sizeText?: number;
};

const Header = ({
  title,
  right,
  left,
  center,
  sizeIcon = moderateScale(20),
  sizeText = moderateScale(16),
}: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const renderLeftView = () => {
    if (left) {
      return (
        <TouchableOpacity
          style={styles.fullWidth}
          onPress={() => {
            typeof left.onPress === 'function' && left.onPress();
          }}>
          <Box flexDirection="row" alignItems="center">
            {left.icon}
            <Text marginLeft="s" variant="text" fontSize={sizeText}>
              {left.label}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.fullWidth}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={sizeIcon} color={theme.colors.text} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Connection />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        minHeight={44}
        backgroundColor="backgroundTab">
        <Box width={'10%'} alignItems="center" justifyContent="center">
          {renderLeftView()}
        </Box>
        <Box flex={1} justifyContent="center">
          <Text
            marginLeft="s"
            textAlign={center ? 'center' : 'auto'}
            variant="text"
            fontSize={sizeText}
            numberOfLines={1}>
            {title}
          </Text>
        </Box>

        <Box minWidth={'10%'} alignItems="center">
          {right && (
            <TouchableOpacity
              style={styles.fullWidth}
              onPress={() => {
                typeof right.onPress === 'function' && right.onPress();
              }}>
              <Box flexDirection="row" alignItems="center">
                {right.icon}
                <Text marginLeft="s" variant="text" fontSize={sizeText}>
                  {right.label}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
