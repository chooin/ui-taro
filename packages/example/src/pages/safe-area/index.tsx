import React from 'react'
import { View } from '@tarojs/components'
import { SafeArea } from '@/../ui-taro/src/index';
import './index.scss'

const Index: React.FC = () => {
  return (
    <View className='index'>
      <SafeArea position='top' />
    </View>
  )
}

export default Index;
