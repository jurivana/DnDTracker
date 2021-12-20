import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { Center, Flex, Text, useTheme } from 'native-base';
import React, { useState } from 'react';
import CounterButtonComponent from './CounterButtonComponent';

interface CounterComponentProps {
  size: number;
  value: number;
  max?: number;
}

const CounterComponent = (props: CounterComponentProps) => {
  const { colors } = useTheme();
  const [value, setValue] = useState(props.value);
  return (
    <Flex direction='row' align='center'>
      <CounterButtonComponent
        size={props.size / 2}
        value={-1}
        onPress={() => setValue(Math.max(value - 1, 0))}
        disabled={value == 0}></CounterButtonComponent>
      <Flex direction='column' mx='2'>
        <FontAwesomeIcon icon={faFlask} color={colors.red['600']} size={props.size} />
        <Center>
          <Text color={colors.red['500']} fontSize={props.size / 2}>
            {value}
          </Text>
        </Center>
      </Flex>
      <CounterButtonComponent
        size={props.size / 2}
        value={1}
        onPress={() => setValue(value + 1)}
        disabled={value == props.max}></CounterButtonComponent>
    </Flex>
  );
};

export default CounterComponent;
