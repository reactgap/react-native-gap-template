// In App.js in a new project
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, useTheme } from 'components';

function Explore() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.safeView, { backgroundColor: theme.colors.background }]}>
      <Box flex={1} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: { flex: 1 },
});

export default Explore;
