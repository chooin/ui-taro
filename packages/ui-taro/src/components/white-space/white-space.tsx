import React from 'react';
import Taro from '@tarojs/taro';
import { mergeProps } from '../../utils';
import { View, ViewProps } from '@tarojs/components';

export interface WhiteSpaceProps extends ViewProps {
  size: number;
  backgroundColor?: string;
}

export const WhiteSpace: React.FC<WhiteSpaceProps> = (p) => {
  const props = mergeProps({
    backgroundColor: 'transparent',
  }, p);

  return (
    <View
      style={{
        height: Taro.pxTransform(props.size),
        backgroundColor: props.backgroundColor,
      }}
      {...props}
    />
  );
};
