import React, { useRef, useCallback, useState } from 'react';
import Taro from '@tarojs/taro';
import { match, __ } from 'ts-pattern';
import {View} from '@tarojs/components';
import { mergeProps } from '../../utils';

type LoadMoreElementProps = {
  hasMore: boolean;
  threshold?: number;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => Promise<void>;
}

export interface InfiniteScrollProps {
  hasMore: boolean;
  threshold?: number;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => Promise<void>;
}

const classPrefix = 't-infinite-scroll';

export const InfiniteScroll: React.FC<InfiniteScrollProps> = (p) => {
  const props = mergeProps({
    threshold: 0,
  }, p);
  // const timer = useRef<NodeJS.Timer>();
  // const isReady = useRef<boolean>(false);
  // const isLoading = useRef<boolean>(false);

  // useReady(() => {
  //   isReady.current = true;
  // });

  // const onLoadMore = useCallback(() => {
  //   if (isLoading.current && props.hasMore) {
  //     return;
  //   }
  //   if (timer.current) {
  //     clearTimeout(timer.current);
  //   }
  //   timer.current = setTimeout(() => {
  //     if (isReady.current) {
  //       Taro.createSelectorQuery()
  //         .select(`#${classPrefix}`)
  //         .boundingClientRect()
  //         .selectViewport()
  //         .scrollOffset()
  //         .exec((rect) => {
  //           isLoading.current = true;
  //           try {
  //             if (rect[0].top < rect[1].scrollHeight) {
  //               props.loadMore().finally(() => {
  //                 isLoading.current = false;
  //               });
  //             }
  //           } catch {
  //             isLoading.current = false;
  //           }
  //         });
  //     }
  //   })
  // }, [])

  return (
    <View id={classPrefix} className={classPrefix}>
      {
        match(props.hasMore)
          .with(true, () => {
            return <>努力加载中</>
          })
          .otherwise(() => {
            return <>没有更多了</>
          })
      }
    </View>
  );
};

const getLoadMoreProps = (children: React.ReactNode): LoadMoreElementProps | undefined => {
  for (let node of React.Children.toArray(children)) {
    if (React.isValidElement(node)) {
      if (typeof node.props.hasMore === 'boolean') {
        return node.props;
      }
      const props: LoadMoreElementProps | undefined = getLoadMoreProps(node.props.children);
      if (props) {
        return props;
      }
    }
  }
}

export const Provider: React.FC = (props) => {
  // const [refresherTriggered, setRefresherTriggered] = useState<boolean>(true);

  if (React.isValidElement(props.children)) {
    if (props.children.type !== 'scroll-view') {
      throw new Error(`You must use <ScrollView /> first`);
    }
    const loadMoreProps = getLoadMoreProps(props.children);

    const onScroll = () => {
      // console.log(e)
    }

    const onRefresherRefresh = () => {
      setRefresherTriggered(true);
      // await loadMoreProps?.refresherRefresh?.()
      setRefresherTriggered(false);
    }

    const scrollViewProps = mergeProps(
      {
        ...props.children.props, loadMoreProps,
      },
      {
        lowerThreshold: loadMoreProps?.threshold ?? 0,
        refresherEnabled: Boolean(loadMoreProps?.refresherRefresh),
        refresherTriggered: true,
        onRefresherRefresh,
        onScroll,
      }
    );
    console.log(scrollViewProps);

    return React.cloneElement(props.children, scrollViewProps)
  } else {
    return null;
  }
}
