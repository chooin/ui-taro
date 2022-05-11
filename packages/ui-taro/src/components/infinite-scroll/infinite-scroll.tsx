import React, { useEffect, useRef, useState } from 'react';
import { BaseEventOrigFunction, View } from '@tarojs/components';
import { match } from 'ts-pattern';
import { CommonEventFunction } from '@tarojs/components/types/common';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';

type LoadMoreElementProps = {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => void;
};

export interface IInfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresherRefresh?: () => void;
}

const classPrefix = 't-infinite-scroll';

const getLoadMoreComponentProps = (
  children: React.ReactNode,
): LoadMoreElementProps | undefined => {
  for (let node of React.Children.toArray(children)) {
    if (React.isValidElement(node)) {
      if (typeof node.props.hasMore === 'boolean') {
        return node.props;
      }
      const props: LoadMoreElementProps | undefined = getLoadMoreComponentProps(
        node.props.children,
      );
      if (props) {
        return props;
      }
    }
  }
};

export const InfiniteScroll: React.FC<IInfiniteScrollProps> = (props) => {
  return (
    <>
      {props.children ??
        match(props.hasMore)
          .with(true, () => {
            return <View className={classPrefix}>努力加载中</View>;
          })
          .otherwise(() => {
            return <View className={classPrefix}>没有更多了</View>;
          })}
    </>
  );
};

export const Provider: React.FC<ScrollViewProps> = (props) => {
  const loading = useRef<boolean>(false);
  const [refresherTriggered, setRefresherTriggered] = useState<boolean>(false);

  const loadMoreProps = getLoadMoreComponentProps(props.children);

  // useMount(() => {
  //   onLoadMore();
  // });

  // 确保在内容不足时会自动触发加载事件
  useEffect(() => {
    onLoadMore();
  });

  const onScrollToLower: CommonEventFunction<BaseEventOrigFunction<any>> = (
    e,
  ) => {
    onLoadMore();
    props.onScrollToLower?.(e);
  };

  const onRefresherRefresh: CommonEventFunction<BaseEventOrigFunction<any>> = (
    e,
  ) => {
    if (refresherTriggered) {
      return;
    } else {
      setRefresherTriggered(true);
    }
    loadMoreProps?.refresherRefresh?.();
    loadMoreProps?.loadMore().then(() => {
      setRefresherTriggered(false);
    });
    props.onRefresherRefresh?.(e);
  };

  const onLoadMore = () => {
    if (loadMoreProps?.hasMore) {
      if (loading.current) {
        return;
      } else {
        loading.current = true;
      }
      loadMoreProps?.loadMore().then(() => {
        loading.current = false;
      });
    }
  };

  return (
    <>
      {
        match(React.isValidElement(props.children))
          .with(true, () => {
            return React.Children.map(props.children, (child: React.ReactNode) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onScrollToLower,
                  refresherTriggered,
                  refresherEnabled: true,
                  onRefresherRefresh,
                });
              } else {
                return <></>;
              }
            });
          })
          .otherwise(() => <></>)
      }
    </>
  )
};
