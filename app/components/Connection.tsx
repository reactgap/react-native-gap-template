import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text, useTheme } from './theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ConnectionProps {}

const Connection = ({}: ConnectionProps) => {
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  if (netInfo?.isConnected === null || netInfo?.isConnected) {
    return <Box backgroundColor="backgroundTab" height={insets.top} />;
  }
  return (
    <Box height={44 + insets.top} backgroundColor="danger">
      <Box flexDirection="row" marginHorizontal="m" style={{ paddingTop: insets.top }}>
        <Icon name="wifi-off" color={theme.colors.danger} size={14} />
        <Text fontSize={12} color="danger" marginLeft="s">
          Không có kết nối mạng. Vui lòng kiểm tra kết nối của bạn.
        </Text>
      </Box>
    </Box>
  );
};

export default Connection;
