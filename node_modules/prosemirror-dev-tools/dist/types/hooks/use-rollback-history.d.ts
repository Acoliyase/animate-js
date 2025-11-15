import type { EditorView } from "prosemirror-view";
import { type HistoryItem } from "../state/history";
export type rollbackHistoryFn = (historyItem: HistoryItem, historyItemIndex: number) => void;
export declare function useRollbackHistory(editorView: EditorView): rollbackHistoryFn;
