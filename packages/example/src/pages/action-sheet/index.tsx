import React from 'react'
import { View } from '@tarojs/components'
import { ActionSheet, withProvider } from 'ui-taro/src/index';

const Index: React.FC = () => {
  const onClick = () => {
    ActionSheet.show({
      extra: 'xx',
      actions: [
        {
          text: '中国',
          key: 'China',
          onClick: () => {},
        }
      ],
    }).then((r) => {
      if (r.key === 'cancel') {
        // Toast.show('onCancel')
      }
    });
  }

  return (
    <View className='index'>
      <View onClick={onClick}>onClick</View>
    </View>
  )
}

export default withProvider(Index);
