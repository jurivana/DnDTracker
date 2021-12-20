import { Center, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import CounterComponent from '../components/CounterComponent';

const HomeScreen = () => {
  const [health, setHealth] = useState(0);
  const [money, setMoney] = useState(0);
  return (
    <ScrollView>
      <Center>
        <CounterComponent size={96} value={12}></CounterComponent>
      </Center>
    </ScrollView>
  );
};

export default HomeScreen;
