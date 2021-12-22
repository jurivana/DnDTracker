import { faCoins, faFlask } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import Setting, { Type } from '../components/Setting';
import { RootStackParamList } from '../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'setup'>;

const SetupScreen = ({ navigation }: Props) => {
  const [maxHealth, setMaxHealth] = useState(-1);
  const [gold, setGold] = useState(-1);
  const [silver, setSilver] = useState(-1);
  const [copper, setCopper] = useState(-1);
  const [inputs, setInputs] = useState([]) as any[];

  const { colors } = useTheme();

  const toInt = (string: string | null) => {
    return string ? parseInt(string) : -1;
  };

  const getData = async () => {
    const result: { [resource: string]: number } = {};
    for (const resource of ['maxHealth', 'money']) {
      try {
        result[resource] = toInt(await AsyncStorage.getItem(resource));
      } catch {}
    }
    if (result['maxHealth'] >= 0) {
      setMaxHealth(result['maxHealth']);
    }
    const money = result['money'];
    if (money >= 0) {
      setGold(Math.floor(money / 100));
      setSilver(Math.floor((money % 100) / 10));
      setCopper(Math.floor((money % 100) % 10));
    }
  };

  const setData = async () => {
    try {
      await AsyncStorage.setItem('maxHealth', maxHealth.toString());
      const money = 100 * gold + 10 * silver + copper;
      await AsyncStorage.setItem('money', money.toString());
    } catch {}
  };

  const goToHome = () => {
    setData();
    navigation.navigate('home');
  };

  useEffect(() => {
    getData();
  }, []);

  const setInputRef = (index: number, ref: any) => {
    const new_inputs = inputs;
    new_inputs[index] = ref;
    setInputs(new_inputs);
  };

  return (
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
        last></Setting>
    </ScrollView>
  );
};

export default SetupScreen;
