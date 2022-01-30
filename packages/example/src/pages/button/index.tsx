import React from 'react'
import { View } from '@tarojs/components'
import {Button, withProvider} from '@/../ui-taro/src/index';
import './index.scss'

const Index: React.FC = () => {
  return (
    <View className='index'>
      <Button>321</Button>
      <Button color="primary" loading block>321</Button>
      <Button color="success" loading block>321</Button>
      <Button color="warning" loading block>321</Button>
      <Button color="danger" loading block>321</Button>
    </View>
  )
}

export default withProvider(Index);
