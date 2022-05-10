import Flex from './flex';
import FlexItem from './flex-item';

export type { FlexProps } from './flex';
export type { IFlexItemProps } from './flex-item';

export default Object.assign(Flex, {
  Item: FlexItem,
})
