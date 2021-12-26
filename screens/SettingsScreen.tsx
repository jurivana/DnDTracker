import { faFlask } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, ScrollView, Spacer, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import Setting, { Type } from '../components/Setting';

const SettingsScreen = () => {
  const [maxHealth, setMaxHealth] = useState(-1);
  const [useArrows, setUseArrows] = useState(-1);

  const { colors } = useTheme();

  const toInt = (string: string | null): number => {
    return string ? parseInt(string) : -1;
  };

  const getData = async () => {
    const resources: [name: string, fn: (value: number) => void][] = [
      ['maxHealth', setMaxHealth],
      ['useArrows', setUseArrows],
    ];
    for (const [resource, fn] of resources) {
      try {
        fn(toInt(await AsyncStorage.getItem(resource)));
      } catch {}
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const setResource = async (resource: string, fn: (value: number) => void, value: number) => {
    fn(value);
    try {
      await AsyncStorage.setItem(resource, value.toString());
    } catch {}
  };

  return (
    <Box h='100%'>
      <ScrollView pt='5'>
        <Setting
          icon={faFlask}
          iconColor={colors.red['600']}
          name='Maximale Leben'
          type={Type.number}
          value={maxHealth >= 0 ? maxHealth.toString() : ''}
          onValueChange={value => setResource('maxHealth', setMaxHealth, parseInt(value) != NaN ? parseInt(value) : -1)}
          last
        />
        <Setting
          icon='arrow'
          name='Pfeile'
          type={Type.boolean}
          active={useArrows > 0}
          onToggle={() => setResource('useArrows', setUseArrows, -useArrows)}
        />
        <Spacer mt={10}></Spacer>
      </ScrollView>
    </Box>
  );
};

export default SettingsScreen;
