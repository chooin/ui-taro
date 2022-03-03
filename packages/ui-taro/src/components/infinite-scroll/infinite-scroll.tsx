import React, { useRef, useCallback, useState } from 'react';
import Taro from '@tarojs/taro';
import { match, __ } from 'ts-pattern';
import {View} from '@tarojs/components';
import { mergeProps } from '../../utils';

type LoadMoreElementProps = {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => Promise<void>;
}

export interface InfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => Promise<void>;
}

const classPrefix = 't-infinite-scroll';

const getLoadMoreComponentProps = (children: React.ReactNode): LoadMoreElementProps | undefined => {
  for (let node of React.Children.toArray(children)) {
    if (React.isValidElement(node)) {
      if (typeof node.props.hasMore === 'boolean') {
        return node.props;
      }
      const props: LoadMoreElementProps | undefined = getLoadMoreComponentProps(node.props.children);
      if (props) {
        return props;
      }
    }
  }
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = (p) => {
  const props = mergeProps({
    threshold: 0,
  }, p);

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

export function create<P extends {}>(Component: React.FC<P>) {
  return (props: P) => {
    const [refresherTriggered, setRefresherTriggered] = useState<boolean>(true);
    const isLoading = useRef<boolean>(false);

    if (React.isValidElement(Component)) {
      if (Component.type !== 'scroll-view') {
        throw new Error(`You must use <ScrollView /> first`);
      }
      const loadMoreProps = getLoadMoreComponentProps(Component);

      const onScroll = () => {
        if (loadMoreProps?.hasMore) {
          if (isLoading.current) {
            return;
          } else {
            isLoading.current = true;
          }
          loadMoreProps.loadMore().then(() => {
            isLoading.current = false;
          })
        }
      }

      const onRefresherRefresh = async () => {
        setRefresherTriggered(true);
        await loadMoreProps?.refresherRefresh?.()
        setRefresherTriggered(false);
      }

      const scrollViewProps = mergeProps(
        {
          ...props,
          ...loadMoreProps,
        },
        {
          refresherEnabled: Boolean(loadMoreProps?.refresherRefresh),
          refresherTriggered,
          onRefresherRefresh,
          onScroll,
        }
      );

      return React.cloneElement(Component, scrollViewProps);
    } else {
      return null;
    }
  }
}
