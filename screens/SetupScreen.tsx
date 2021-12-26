import { faChevronRight, faCoins, faFlask } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Flex, Pressable, ScrollView, Spacer, Text, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import Setting, { Type } from '../components/Setting';
import { RootStackParamList } from '../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'setup'>;

const SetupScreen = ({ navigation }: Props) => {
  const [maxHealth, setMaxHealth] = useState(-1);
  const [gold, setGold] = useState(-1);
  const [silver, setSilver] = useState(-1);
  const [copper, setCopper] = useState(-1);
  const [arrows, setArrows] = useState(-1);
  const [useArrows, setUseArrows] = useState(-1);
  const [inputs, setInputs] = useState([]) as any[];
  const [canContinue, setCanContinue] = useState(false);

  const { colors } = useTheme();

  const toInt = (string: string | null): number => {
    return string ? parseInt(string) : -1;
  };

  const getData = async () => {
    const resources: [name: string, fn: (value: number) => void][] = [
      ['maxHealth', setMaxHealth],
      ['money', setMoney],
      ['arrows', setArrows],
      ['useArrows', setUseArrows],
    ];
    for (const [resource, fn] of resources) {
      try {
        fn(toInt(await AsyncStorage.getItem(resource)));
      } catch {}
    }
  };

  const setMoney = (money: number): void => {
    if (money < 0) {
      return;
    }
    setGold(Math.floor(money / 100));
    setSilver(Math.floor((money % 100) / 10));
    setCopper(Math.floor((money % 100) % 10));
  };

  const setData = async () => {
    const resources: [name: string, value: number][] = [
      ['maxHealth', maxHealth],
      ['health', maxHealth],
      ['money', 100 * gold + 10 * silver + copper],
      ['arrows', arrows],
      ['useArrows', useArrows],
    ];
    for (const [resource, value] of resources) {
      try {
        await AsyncStorage.setItem(resource, value.toString());
      } catch {}
    }
  };

  const goToHome = () => {
    setData();
    navigation.replace('home');
  };

  useEffect(() => {
    getData();
  }, []);

  const setInputRef = (index: number, ref: any) => {
    const new_inputs = inputs;
    new_inputs[index] = ref;
    setInputs(new_inputs);
  };

  useEffect(() => {
    setCanContinue(maxHealth >= 0 && gold >= 0 && silver >= 0 && copper >= 0 && (arrows >= 0 || useArrows < 0));
  }, [maxHealth, gold, silver, copper, arrows, useArrows]);

  return (
    <Box h='100%'>
      <ScrollView pt='5'>
        <Setting
          icon={faFlask}
          iconColor={colors.red['600']}
          name='Maximale Leben'
          type={Type.number}
          value={maxHealth >= 0 ? maxHealth.toString() : ''}
          onValueChange={value => setMaxHealth(parseInt(value) != NaN ? parseInt(value) : -1)}
          getInputRef={input => setInputRef(0, input)}
          onSubmit={() => inputs[1].focus()}></Setting>
        <Setting
          icon={faCoins}
          iconColor={colors.gold['600']}
          name='Gold'
          type={Type.number}
          value={gold >= 0 ? gold.toString() : ''}
          onValueChange={value => setGold(parseInt(value) != NaN ? parseInt(value) : -1)}
          getInputRef={input => setInputRef(1, input)}
          onSubmit={() => inputs[2].focus()}></Setting>
        <Setting
          icon={faCoins}
          iconColor={colors.silver['600']}
          name='Silber'
          type={Type.number}
          value={silver >= 0 ? silver.toString() : ''}
          onValueChange={value => setSilver(parseInt(value) != NaN ? parseInt(value) : -1)}
          getInputRef={input => setInputRef(2, input)}
          onSubmit={() => inputs[3].focus()}></Setting>
        <Setting
          icon={faCoins}
          iconColor={colors.copper['600']}
          name='Kupfer'
          type={Type.number}
          value={copper >= 0 ? copper.toString() : ''}
          onValueChange={value => setCopper(parseInt(value) != NaN ? parseInt(value) : -1)}
          getInputRef={input => setInputRef(3, input)}
          onSubmit={() => inputs[4].focus()}
          last={useArrows < 0}></Setting>
        <Setting
          icon='arrow'
          name='Pfeile'
          type={Type.mixed}
          value={arrows >= 0 ? arrows.toString() : ''}
          active={useArrows > 0}
          onValueChange={value => setArrows(parseInt(value) != NaN ? parseInt(value) : -1)}
          onToggle={() => setUseArrows(-useArrows)}
          getInputRef={input => setInputRef(4, input)}
          last></Setting>
        <Spacer mt={10}></Spacer>
      </ScrollView>
      <Pressable mx={5} my={5} disabled={!canContinue} onPress={goToHome}>
        {({ isPressed }) => (
          <Flex direction='row' align='center' justify='flex-end'>
            <Text color={canContinue ? (isPressed ? 'primary.500' : 'primary.200') : 'muted.500'} pb={1.5} mr={1} fontSize={20}>
              Weiter
            </Text>
            <FontAwesomeIcon
              icon={faChevronRight}
              color={canContinue ? (isPressed ? colors.primary['500'] : colors.primary['200']) : (colors.muted as any)['500']}
            />
          </Flex>
        )}
      </Pressable>
    </Box>
  );
};

export default SetupScreen;
