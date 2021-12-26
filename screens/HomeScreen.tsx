import { faCoins, faFlask } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Flex, ScrollView, Spacer, useTheme } from 'native-base';
import React, { useEffect, useState } from 'react';
import CounterComponent from '../components/CounterComponent';
import { RootStackParamList } from '../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [health, setHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(0);
  const [money, setMoney] = useState(0);
  const [arrows, setArrows] = useState(0);
  const [useArrows, setUseArrows] = useState(0);
  const { colors } = useTheme();
  const counterSize = 64;

  const toInt = (string: string | null) => {
    if (!string) throw new TypeError();
    return parseInt(string);
  };

  const getData = async () => {
    const resources: [name: string, fn: (value: number) => void][] = [
      ['maxHealth', setMaxHealth],
      ['health', setHealth],
      ['money', setMoney],
      ['arrows', setArrows],
      ['useArrows', setUseArrows],
    ];
    for (const [resource, fn] of resources) {
      try {
        fn(toInt(await AsyncStorage.getItem(resource)));
      } catch {
        navigation.replace('setup');
      }
    }
  };

  const setResource = async (resource: string, fn: (value: number) => void, value: number) => {
    fn(value);
    try {
      await AsyncStorage.setItem(resource, value.toString());
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <Center mb={10}>
        <CounterComponent
          size={counterSize * 1.25}
          value={health}
          max={maxHealth}
          icon={faFlask}
          iconColor={colors.red['600']}
          textColor={colors.red['500']}
          onDecrement={() => {
            if (health > 0) setResource('health', setHealth, health - 1);
          }}
          onIncrement={() => {
            if (health < maxHealth) setResource('health', setHealth, health + 1);
          }}
        />
      </Center>
      <Center mb={10}>
        <CounterComponent
          size={counterSize}
          value={Math.floor(money / 100)}
          decrDisabled={money < 100}
          icon={faCoins}
          iconColor={colors.gold['600']}
          textColor={colors.gold['500']}
          onDecrement={() => {
            if (money >= 100) setResource('money', setMoney, money - 100);
          }}
          onIncrement={() => setResource('money', setMoney, money + 100)}
        />
        <Flex direction='row' justify='space-evenly' w='100%' mb={10}>
          <CounterComponent
            size={counterSize}
            value={Math.floor((money % 100) / 10)}
            decrDisabled={money < 10}
            icon={faCoins}
            iconColor={colors.silver['600']}
            textColor={colors.silver['500']}
            onDecrement={() => {
              if (money >= 10) setResource('money', setMoney, money - 10);
            }}
            onIncrement={() => setResource('money', setMoney, money + 10)}
          />
          <CounterComponent
            size={counterSize}
            value={(money % 100) % 10}
            decrDisabled={money == 0}
            icon={faCoins}
            iconColor={colors.copper['600']}
            textColor={colors.copper['500']}
            onDecrement={() => {
              if (money > 0) setResource('money', setMoney, money - 1);
            }}
            onIncrement={() => setResource('money', setMoney, money + 1)}
          />
        </Flex>
        <Flex direction='row' w='100%' justify='space-evenly'>
          {useArrows > 0 ? (
            <CounterComponent
              size={counterSize}
              value={arrows}
              decrDisabled={arrows == 0}
              icon='arrow'
              onDecrement={() => {
                if (arrows > 0) setResource('arrows', setArrows, arrows - 1);
              }}
              onIncrement={() => setResource('arrows', setArrows, arrows + 1)}
              textColor={colors.gray['400']}
            />
          ) : undefined}
        </Flex>
      </Center>
      <Spacer mt={10}></Spacer>
    </ScrollView>
  );
};

export default HomeScreen;
