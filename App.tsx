import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigation/Navigation';
import { Theme } from './theme/Theme';

export default function App() {
  const theme = extendTheme(Theme);
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar backgroundColor='#0e0e0e'></StatusBar>
      <Navigation></Navigation>
    </NativeBaseProvider>
  );
}
