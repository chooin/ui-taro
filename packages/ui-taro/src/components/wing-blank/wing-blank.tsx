import React from 'react';
import { View } from "@tarojs/components";

export interface WingBlankProps {
  size: number;
  backgroundColor: string;
}

export const WingBlank: React.FC<WingBlankProps> = (props) => {
  return (
    <View
      style={{
        padding: `0 ${props.size}px`,
        backgroundColor: props.backgroundColor ?? 'transparent',
      }}
    />
  );
};
