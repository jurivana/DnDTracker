import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box } from 'native-base';
import React from 'react';
import SVGIcon from '../icons/Icons';

interface FlexIconProps {
  icon: IconDefinition | string;
  color?: string;
  size?: number;
}

const FlexIcon = (props: FlexIconProps) => {
  return (
    <Box>
      {typeof props.icon == 'object' ? (
        <FontAwesomeIcon icon={props.icon as IconDefinition} color={props.color} size={props.size ?? 32}></FontAwesomeIcon>
      ) : (
        <SVGIcon name={props.icon as string} color={props.color} size={props.size ?? 32}></SVGIcon>
      )}
    </Box>
  );
};

export default FlexIcon;
