import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Center, Flex, Text } from 'native-base';
import React from 'react';
import CounterButtonComponent from './CounterButtonComponent';
import FlexIcon from './FlexIcon';

interface CounterComponentProps {
  size: number;
  value: number;
  decrDisabled?: boolean;
  incrDisabled?: boolean;
  max?: number;
  icon: IconDefinition | string;
  isFaIcon?: boolean;
  iconColor?: string;
  textColor?: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

const CounterComponent = (props: CounterComponentProps) => {
  return (
    <Flex direction='row' align='center'>
      <CounterButtonComponent
        size={props.size * 0.5}
        value={-1}
        onPress={props.onDecrement}
        disabled={props.decrDisabled ?? props.value == 0}></CounterButtonComponent>
      <Flex direction='column' mx='2'>
        <FlexIcon icon={props.icon} color={props.iconColor} size={props.size} />
        <Center>
          <Text color={props.decrDisabled ?? props.value == 0 ? '#666' : props.textColor} fontSize={props.size / 2}>
            {props.value}
          </Text>
        </Center>
      </Flex>
      <CounterButtonComponent
        size={props.size * 0.5}
        value={1}
        onPress={props.onIncrement}
        disabled={props.incrDisabled ?? props.value >= (props.max ?? props.value + 1)}></CounterButtonComponent>
    </Flex>
  );
};

export default CounterComponent;
