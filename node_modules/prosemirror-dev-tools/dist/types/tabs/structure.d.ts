/// <reference types="react" />
import "@compiled/react";
import type { Node } from "prosemirror-model";
export declare function BlockNodeContent(props: {
    content: Node["content"];
    startPos: number;
    colors: Record<string, string>;
    onNodeSelected: (data: {
        node: Node;
    }) => void;
}): JSX.Element | null;
export declare function BlockNode(props: {
    colors: Record<string, string>;
    node: Node;
    startPos: number;
    onNodeSelected: (data: {
        node: Node;
    }) => void;
}): JSX.Element;
export declare function InlineNode(props: {
    node: Node;
    bg: string;
    startPos: number;
    index: number;
    onNodeSelected: (data: {
        node: Node;
    }) => void;
}): JSX.Element;
export default function GraphTab(): JSX.Element | null;
