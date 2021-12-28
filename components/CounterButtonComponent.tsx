import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable, useTheme } from 'native-base';
import React from 'react';

interface CounterButtonProps {
  size: number;
  value: number;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
}

const CounterButtonComponent = (props: CounterButtonProps) => {
  const { colors } = useTheme();
  const icon = props.value > 0 ? faPlusCircle : faMinusCircle;

  return (
    <Pressable
      disabled={props.disabled}
      p={2.5}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      opacity={props.disabled ? 50 : 100}
      _pressed={{ bg: 'primary.600' }}
      borderRadius={5}>
      <FontAwesomeIcon icon={icon} size={props.size} color={colors.lightText} style={{ backgroundColor: 'transparent' }} />
    </Pressable>
  );
};

export default CounterButtonComponent;
