import { faCoins, faFlask } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Row, ScrollView, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import CounterComponent from '../components/CounterComponent';
import { RootStackParamList } from '../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [health, setHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(0);
  const [money, setMoney] = useState(0);
  const { colors } = useTheme();
  const coinSize = 64;

  const toInt = (string: string | null) => {
    if (!string) throw new TypeError();
    return parseInt(string);
  };

  const getData = async () => {
    try {
      setHealth(toInt(await AsyncStorage.getItem('health')));
      setMaxHealth(toInt(await AsyncStorage.getItem('maxHealth')));
      setMoney(toInt(await AsyncStorage.getItem('money')));
    } catch (e) {
      navigation.navigate('setup');
    }
  };

  const setData = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      setData();
    };
  });

  return (
    <ScrollView>
      <Center mb={10}>
        <CounterComponent
          size={84}
          value={health}
          max={12}
          icon={faFlask}
          color={colors.red}
          onDecrement={() => setHealth(health - 1)}
          onIncrement={() => setHealth(health + 1)}></CounterComponent>
      </Center>
      <Center mb={10}>
        <CounterComponent
          size={coinSize}
          value={Math.floor(money / 100)}
          decrDisabled={money < 100}
          icon={faCoins}
          color={colors.gold}
          onDecrement={() => {
            if (money >= 100) setMoney(money - 100);
          }}
          onIncrement={() => setMoney(money + 100)}></CounterComponent>
        <Row>
          <CounterComponent
            size={coinSize}
            value={Math.floor((money % 100) / 10)}
            decrDisabled={money < 10}
            icon={faCoins}
            color={colors.silver}
            onDecrement={() => {
              if (money >= 10) setMoney(money - 10);
            }}
            onIncrement={() => setMoney(money + 10)}></CounterComponent>
          <CounterComponent
            size={coinSize}
            value={(money % 100) % 10}
            decrDisabled={money == 0}
            icon={faCoins}
            color={colors.copper}
            onDecrement={() => {
              if (money >= 1) setMoney(money - 1);
            }}
            onIncrement={() => setMoney(money + 1)}></CounterComponent>
        </Row>
      </Center>
    </ScrollView>
  );
};

export default HomeScreen;
