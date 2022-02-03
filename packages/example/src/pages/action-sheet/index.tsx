import React from 'react'
import { View } from '@tarojs/components'
import { ActionSheet, withProvider } from '@/../ui-taro/src/index';

const Index: React.FC = () => {
  const onClick = () => {
    ActionSheet.show({

    }).then(() => {});
  }

  return (
    <View className='index'>
      <View onClick={onClick}>onClick</View>
    </View>
  )
}

export default withProvider(Index);
