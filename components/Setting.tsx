import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Flex, Input, Switch, Text } from 'native-base';
import React from 'react';
import FlexIcon from './FlexIcon';

export enum Type {
  boolean,
  number,
  mixed,
}

interface SettingProps {
  icon: IconDefinition | string;
  iconColor?: string;
  name: string;
  type: Type;
  active?: boolean;
  onValueChange?: (value: any) => void;
  value?: any;
  getInputRef?: (input: any) => void;
  onSubmit?: () => void;
  onToggle?: () => void;
  last?: boolean;
}

const Setting = (props: SettingProps) => {
  return (
    <Flex mx='5' my='5' direction='row' align='center'>
      <FlexIcon icon={props.icon} color={props.iconColor} />
      <Text fontSize={20} mx={3} flex={1}>
        {props.name}
      </Text>
      {props.type == Type.boolean || props.type == Type.mixed ? (
        <Switch size='lg' isChecked={props.active} mr={0} onToggle={props.onToggle} />
      ) : undefined}
      {props.type == Type.number || props.type == Type.mixed ? (
        <Input
          size='xl'
          w={12}
          variant='outline'
          value={props.value}
          onChangeText={props.onValueChange}
          keyboardType='numeric'
          returnKeyType={props.last ? 'done' : 'next'}
          ref={props.getInputRef}
          onSubmitEditing={props.onSubmit}
          textAlign='right'
          placeholder='0'
          ml={5}
          isDisabled={!(props.active ?? true)}
        />
      ) : undefined}
    </Flex>
  );
};

export default Setting;
