import { faCoins, faFlask } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Center, Flex, Input, Modal, ScrollView, Spacer, Text, useTheme } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import CounterComponent from '../components/CounterComponent';
import { RootStackParamList } from '../navigation/Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [health, setHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(0);
  const [money, setMoney] = useState(0);
  const [arrows, setArrows] = useState(0);
  const [useArrows, setUseArrows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalResource, setModalResource] = useState('');
  const [modalFunction, setModalFunction] = useState<(value: number) => void>(undefined as any);
  const [modalValue, setModalValue] = useState(0);
  const [modalMultiplier, setModalMultiplier] = useState(0);
  const [modalMaxValue, setModalMaxValue] = useState(0);
  const [modalInput, setModalInput] = useState(0);
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

  const onLongPress = (resource: string, fn: (value: number) => void, value: number, multipler: number, max = Infinity) => {
    setModalResource(resource);
    setModalFunction(() => fn);
    setModalValue(value);
    setModalMultiplier(multipler);
    if (max) setModalMaxValue(max);
    setShowModal(true);
  };

  const onModalSave = (value: number) => {
    setShowModal(false);
    const nValue = modalValue + modalMultiplier * value;
    if (nValue >= 0 && nValue <= (modalMaxValue ?? nValue)) {
      setResource(modalResource, modalFunction, nValue);
    }
    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setModalResource('');
    setModalFunction(() => {});
    setModalValue(0);
    setModalMultiplier(0);
    setModalMaxValue(0);
    setModalInput(0);
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

  const inputRef = useRef(undefined);

  return (
    <ScrollView>
      <Modal isOpen={showModal} onClose={resetModal} avoidKeyboard w='50%' alignSelf='center' bg='transparent' initialFocusRef={inputRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Wert</Modal.Header>
          <Modal.Body>
            <Input
              ref={inputRef}
              size='xl'
              variant='outline'
              keyboardType='numeric'
              returnKeyType={'done'}
              onChangeText={value => setModalInput(parseInt(value))}
              onSubmitEditing={() => onModalSave(modalInput)}
              textAlign='right'
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Center m={3} pb={3} pt={8} borderColor='light.600' borderRadius={15} borderWidth={1}>
        <Text position='absolute' top={-15} bg='background' px={2} fontSize={18}>
          Leben
        </Text>
        <CounterComponent
          size={counterSize}
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
          onLongDecrement={() => onLongPress('health', setHealth, health, -1, maxHealth)}
          onLongIncrement={() => onLongPress('health', setHealth, health, 1, maxHealth)}
        />
      </Center>
      <Center m={3} pb={3} pt={8} borderColor='light.600' borderRadius={15} borderWidth={1}>
        <Text position='absolute' top={-15} bg='background' px={2} fontSize={18}>
          Münzen
        </Text>
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
          onLongDecrement={() => onLongPress('money', setMoney, money, -100)}
          onLongIncrement={() => onLongPress('money', setMoney, money, 100)}
        />
        <Flex direction='row' justify='space-evenly' w='100%'>
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
            onLongDecrement={() => onLongPress('money', setMoney, money, -10)}
            onLongIncrement={() => onLongPress('money', setMoney, money, 10)}
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
            onLongDecrement={() => onLongPress('money', setMoney, money, -1)}
            onLongIncrement={() => onLongPress('money', setMoney, money, 1)}
          />
        </Flex>
      </Center>
      {useArrows > 0 ? (
        <Center m={3} pb={3} pt={8} borderColor='light.600' borderRadius={15} borderWidth={1}>
          <Text position='absolute' top={-15} bg='background' px={2} fontSize={18}>
            Sonstiges
          </Text>
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
                onLongDecrement={() => onLongPress('arrows', setArrows, arrows, -1)}
                onLongIncrement={() => onLongPress('arrows', setArrows, arrows, 1)}
                textColor={colors.gray['400']}
              />
            ) : undefined}
          </Flex>
        </Center>
      ) : undefined}
      <Spacer mt={10}></Spacer>
    </ScrollView>
  );
};

export default HomeScreen;
