import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Flex, Input, Text } from 'native-base';
import React from 'react';

export enum Type {
  boolean,
  number,
}

interface SettingProps {
  icon: IconDefinition;
  iconColor: string;
  name: string;
  type: Type;
  onValueChange: (event: any) => void;
  value?: any;
  getInputRef?: (input: any) => void;
  onSubmit?: () => void;
  last?: boolean;
}

const Setting = (props: SettingProps) => {
  return (
    <Flex mx='5' my='5' direction='row' align='center'>
      <FontAwesomeIcon icon={props.icon} color={props.iconColor} size={32}></FontAwesomeIcon>
      <Text fontSize={20} mx={3} flex={1}>
        {props.name}
      </Text>
      {props.type == Type.number ? (
        <Input
          size='xl'
          w={16}
          variant='outline'
          value={props.value}
          onChangeText={props.onValueChange}
          keyboardType='numeric'
          returnKeyType={props.last ? 'done' : 'next'}
          ref={props.getInputRef}
          onSubmitEditing={props.onSubmit}
        />
      ) : undefined}
    </Flex>
  );
};

export default Setting;
