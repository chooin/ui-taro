import React from 'react'
import { View } from '@tarojs/components'
import { Button } from '@/../ui-taro/src/index';
import './index.scss'

const Index: React.FC = () => {
  return (
    <View className='index'>
      <Button>321</Button>
      <Button color='primary' block>block primary</Button>
      <Button color='primary' fill='outline' block>outline primary</Button>
      <Button color='primary' block>321</Button>
      <Button color='success' loading block>loading block</Button>
      <Button color='warning' loading block>321</Button>
      <Button color='danger' loading block>321</Button>
      <Button color='danger' disabled>disabled</Button>
      <Button color='danger' shape='rounded'>rounded</Button>
    </View>
  )
}

export default Index;
