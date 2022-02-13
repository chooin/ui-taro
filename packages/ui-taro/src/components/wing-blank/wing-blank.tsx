import React from 'react';
import Taro from '@tarojs/taro';
import { View } from "@tarojs/components";

export interface WingBlankProps {
  size: number;
  backgroundColor?: string;
}

export const WingBlank: React.FC<WingBlankProps> = (props) => {
  return (
    <View
      style={{
        padding: `0 ${Taro.pxTransform(props.size)}`,
        backgroundColor: props.backgroundColor ?? 'transparent',
      }}
    >
      {props.children}
    </View>
  );
};
