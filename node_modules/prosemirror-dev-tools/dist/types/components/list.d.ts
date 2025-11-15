import React from "react";
import "@compiled/react";
type ListProps<Item> = {
    items: Array<Item>;
    isSelected?: IsSelectedHandler<Item>;
    isPrevious?: IsPreviousHandler<Item>;
    isDimmed?: isDimmedHandler<Item>;
    onListItemClick?: OnListItemClickHandler<Item>;
    onListItemDoubleClick?: OnListItemDoubleClickHandler<Item>;
    getKey: GetKey<Item>;
    title: GetTitle<Item>;
    groupTitle?: GetGroupTitle<Item>;
    customItemBackground?: (props: {
        isSelected?: boolean;
        isPrevious?: boolean;
    }) => string | undefined;
};
export declare function List<Item>(props: ListProps<Item>): JSX.Element;
type IsSelectedHandler<T> = (item: T, index: number) => boolean | undefined;
type IsPreviousHandler<T> = (item: T, index: number) => boolean | undefined;
type isDimmedHandler<T> = (item: T, index: number) => boolean | undefined;
type OnListItemClickHandler<T> = (item: T, index: number) => void;
type OnListItemDoubleClickHandler<T> = (item: T, index: number) => void;
type GetKey<T> = (item: T) => string;
type GetTitle<T> = (item: T, index: number) => string | undefined | React.ReactNode;
type GetGroupTitle<T> = (item: T, index: number) => string | undefined;
export {};
