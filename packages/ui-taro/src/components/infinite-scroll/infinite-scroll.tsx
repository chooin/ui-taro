import React, { useRef, useCallback } from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { match } from 'ts-pattern';
import { View } from '@tarojs/components';
import { mergeProps } from '../../utils';

export interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number
}

const classPrefix = 't-infinite-scroll';

export const InfiniteScroll: React.FC<InfiniteScrollProps> = (p) => {
  const props = mergeProps({
    threshold: 10,
  }, p);
  const timer = useRef<NodeJS.Timer>();
  const isReady = useRef<boolean>(false);
  const isLoading = useRef<boolean>(false);

  useReady(() => {
    isReady.current = true;
  });

  const onLoadMore = useCallback(() => {
    if (isLoading.current && props.hasMore) {
      return;
    }
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (isReady.current) {
        Taro.createSelectorQuery()
          .select(`#${classPrefix}`)
          .boundingClientRect()
          .selectViewport()
          .scrollOffset()
          .exec((rect) => {
            isLoading.current = true;
            try {
              if (rect[0].top < rect[1].scrollHeight) {
                props.loadMore().finally(() => {
                  isLoading.current = false;
                });
              }
            } catch {
              isLoading.current = false;
            }
          });
      }
    })
  }, [])

  return (
    <View id={classPrefix} className={classPrefix}>
      {
        match(props.hasMore)
          .with(true, () => {
            return <>加载中</>
          })
          .otherwise(() => {
            return <>没有更多了</>
          })
      }
    </View>
  );
};

export const onScroll = (e) => {
  console.log(e);
  // InfiniteScroll.prototype.onLoadMore();
}
