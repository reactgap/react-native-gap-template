import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Box } from './theme';
import Icon, { Icons } from './Icons';

interface IconButtonProps {
  onPress: () => void;
  name: string;
  size: number;
  iconSize?: number;
  type: keyof typeof Icons;
  style?: any;
}

const IconButton = ({ onPress, iconSize, style, ...props }: IconButtonProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Box
        justifyContent="center"
        alignItems="center"
        style={[{ width: props.size, height: props.size }, style]}>
        <Icon type={Icons[props.type]} size={iconSize} name={props.name} color="white" />
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
