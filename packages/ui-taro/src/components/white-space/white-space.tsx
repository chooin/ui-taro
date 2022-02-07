import React from 'react';
import { View } from "@tarojs/components";

export interface WhiteSpaceProps {
  size: number;
  backgroundColor: string;
}

export const WhiteSpace: React.FC<WhiteSpaceProps> = (props) => {
  return (
    <View
      style={{
        height: `${props.size}px`,
        backgroundColor: props.backgroundColor ?? 'transparent',
      }}
    />
  );
};
