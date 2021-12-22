import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Center, Flex, Text } from 'native-base';
import React from 'react';
import CounterButtonComponent from './CounterButtonComponent';

interface CounterComponentProps {
  size: number;
  value: number;
  decrDisabled?: boolean;
  incrDisabled?: boolean;
  max?: number;
  icon: IconDefinition;
  color: any;
  onDecrement: () => void;
  onIncrement: () => void;
}

const CounterComponent = (props: CounterComponentProps) => {
  return (
    <Flex direction='row' align='center'>
      <CounterButtonComponent
        size={props.size / 2}
        value={-1}
        onPress={props.onDecrement}
        disabled={props.decrDisabled ?? props.value == 0}></CounterButtonComponent>
      <Flex direction='column' mx='2'>
        <FontAwesomeIcon icon={props.icon} color={props.color['600']} size={props.size} />
        <Center>
          <Text color={props.decrDisabled ?? props.value == 0 ? '#666' : props.color['500']} fontSize={props.size / 2}>
            {props.value}
          </Text>
        </Center>
      </Flex>
      <CounterButtonComponent
        size={props.size / 2}
        value={1}
        onPress={props.onIncrement}
        disabled={props.incrDisabled ?? props.value == props.max}></CounterButtonComponent>
    </Flex>
  );
};

export default CounterComponent;
