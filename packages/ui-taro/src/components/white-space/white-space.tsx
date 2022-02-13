import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

export interface WhiteSpaceProps {
  size: number;
  backgroundColor?: string;
}

export const WhiteSpace: React.FC<WhiteSpaceProps> = (props) => {
  return (
    <View
      style={{
        height: Taro.pxTransform(props.size),
        backgroundColor: props.backgroundColor ?? 'transparent',
      }}
    />
  );
};
