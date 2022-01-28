import React from 'react'
import { View } from '@tarojs/components'
import {Button, withProvider} from '@/../ui-taro/src/index';
import './index.scss'

const Index: React.FC = () => {
  return (
    <View className='index'>
      <Button>321</Button>
      <Button block>321</Button>
    </View>
  )
}

export default withProvider(Index);
