import React, { useState } from 'react'
import { useDidShow } from "@tarojs/taro";
import { ScrollView, View } from '@tarojs/components'
import { InfiniteScroll } from '@/../ui-taro/src/index';
import { sleep } from '@/../ui-taro/src/utils';

const Index: React.FC = () => {
  const [hasMore, setHasMore] = useState(true);

  useDidShow(() => {
    console.log(123)
  })

  const onLoadMore = async () => {
    await sleep(3000);
    console.log(312);
    setHasMore(true);
  }

  return (
    <ScrollView onScroll={InfiniteScroll.onScroll} scrollY style={{height: '100vh'}} className='index'>
      <View id='xxx' style={{height: '1835px'}} />
      <InfiniteScroll hasMore={hasMore} loadMore={onLoadMore} />
    </ScrollView>
  )
}

export default Index;
