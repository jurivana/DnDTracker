import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { IconButton } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'native-base';

const Stack = createNativeStackNavigator();

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
        initialRouteName=''
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
                icon={<FontAwesomeIcon icon={faCog} size={20} color={colors.lightText} />}
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
                icon={<FontAwesomeIcon icon={faArrowLeft} size={20} color={colors.lightText} />}
                onPress={() => navigation.goBack()}
                mr='2'></IconButton>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
