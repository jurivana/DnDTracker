import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IconButton, useTheme } from 'native-base';
import React, { useState } from 'react';

interface CounterButtonProps {
  size: number;
  value: number;
  onPress: () => void;
  disabled?: boolean;
}

const CounterButtonComponent = (props: CounterButtonProps) => {
  const { colors } = useTheme();
  const icon = props.value > 0 ? faPlusCircle : faMinusCircle;
  console.log(props);

  return (
    <IconButton
      icon={<FontAwesomeIcon icon={icon} size={props.size} color={colors.lightText} />}
      isDisabled={props.disabled}
      onPress={props.onPress}></IconButton>
  );
};

export default CounterButtonComponent;
