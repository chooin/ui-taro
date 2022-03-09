import React, { useState } from 'react'
import { ScrollView } from '@tarojs/components'
import { InfiniteScroll } from '@/../ui-taro/src/index';
import { sleep } from '@/../ui-taro/src/utils';

const Index: React.FC = () => {
  const [hasMore, setHasMore] = useState(true);

  const onLoadMore = async () => {
    await sleep(3000);
    console.log(312);
    setHasMore(false);
  }

  return (
    <InfiniteScroll.Provider>
      <ScrollView scrollY>
        <InfiniteScroll hasMore={hasMore} loadMore={onLoadMore}>
          加载中
        </InfiniteScroll>
      </ScrollView>
    </InfiniteScroll.Provider>
  )
}

export default Index;
