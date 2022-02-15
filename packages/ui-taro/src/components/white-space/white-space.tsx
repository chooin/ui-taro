import React from 'react';
import Taro from '@tarojs/taro';
import { View, ViewProps } from '@tarojs/components';

export interface WhiteSpaceProps extends ViewProps {
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
      {...props}
    />
  );
};
