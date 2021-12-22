import { faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, useTheme } from 'native-base';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SetupScreen from '../screens/SetupScreen';

export type RootStackParamList = {
  home: undefined;
  setup: undefined;
  settings: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { colors } = useTheme();
  const headerBackground = {
    backgroundColor: colors.background,
  };
  const titleStyle = {
    color: colors.lightText,
    fontFamily: 'Sora-Medium',
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='home'
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: headerBackground,
          headerTitleStyle: titleStyle,
          animation: 'none',
        }}>
        <Stack.Screen
          name='home'
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <IconButton
                icon={<FontAwesomeIcon icon={faCog} size={24} color={colors.lightText} />}
                onPress={() => navigation.navigate('settings')}></IconButton>
            ),
          })}
        />
        <Stack.Screen
          name='settings'
          component={SettingsScreen}
          options={({ navigation }) => ({
            title: 'Einstellungen',
            headerLeft: () => (
              <IconButton
                icon={<FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.lightText} />}
                onPress={() => navigation.goBack()}
                mr='2'></IconButton>
            ),
          })}
        />
        <Stack.Screen
          name='setup'
          component={SetupScreen}
          options={() => ({
            title: 'Setup',
            headerBackVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
