import { Icon } from 'native-base';
import React from 'react';
import { G, Path, Polygon } from 'react-native-svg';

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

const SVGIcon = (props: IconProps) => {
  switch (props.name) {
    case 'arrow':
      return (
        <Icon size={`${props.size}px`} color={props.color} viewBox='0 0 53 53'>
          <G>
            <Polygon fill='#7a4d00' points='13.76,16.518 36.663,39.421 39.491,36.593 16.126,13.397 14.326,14.256 	' />
            <Polygon fill='#777' points='35.637,37.566 36.737,46.366 53,52.73 46.636,36.466 37.836,35.366 	' />
            <Path fill='#777' d='M6,16.27v2h2v2.036l10-0.036v-2l2-1v-8h-2v-2h-2v-3h-2v-2h-2l0-2H8v8H0v4h2v2h2v2H6z' />
          </G>
        </Icon>
      );
    default:
      return <Icon></Icon>;
  }
};

export default SVGIcon;
