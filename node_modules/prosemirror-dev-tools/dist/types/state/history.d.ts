import type { EditorState, Selection, Transaction } from "prosemirror-state";
import type { JsonDiffMain } from "./json-diff-main";
import type { JsonDiffWorker } from "./json-diff-worker";
export declare const historyAtom: import("jotai").PrimitiveAtom<HistoryItem[]> & {
    init: HistoryItem[];
};
export declare const historyRolledBackToAtom: import("jotai").PrimitiveAtom<number | null> & {
    init: number | null;
};
export declare const historyDiffsAtom: import("jotai").PrimitiveAtom<Record<string, {
    diff: unknown;
    selection: unknown;
}>> & {
    init: Record<string, {
        diff: unknown;
        selection: unknown;
    }>;
};
type HistoryAction = {
    type: "reset";
    payload: {
        state: EditorState;
    };
} | {
    type: "update";
    payload: {
        newState: EditorState;
        tr: Transaction;
        oldState: EditorState;
        diffWorker: Promise<JsonDiffMain | JsonDiffWorker>;
    };
};
export declare const historyWriteAtom: import("jotai").WritableAtom<null, HistoryAction, Promise<void>> & {
    init: null;
};
export declare function buildSelection(selection: Selection): {
    empty: boolean;
    anchor: number;
    head: number;
    from: number;
    to: number;
};
export declare function createHistoryEntry(editorState: EditorState): HistoryItem;
export declare function shrinkEditorHistory(history: Array<HistoryItem>, historyRolledBackTo: number | null): HistoryItem[];
export declare function updateEditorHistory(history: Array<HistoryItem>, historyRolledBackTo: null | number, tr: Transaction, newState: EditorState): HistoryItem[] | undefined;
export type HistoryItem = {
    id: string;
    index?: number;
    state: EditorState;
    timestamp: number;
    diffPending: boolean;
    diff: unknown;
    selection?: Selection;
    selectionContent: string | Array<string>;
};
export {};
