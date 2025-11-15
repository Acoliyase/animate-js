import type { EditorView } from "prosemirror-view";
export declare const editorViewAtom: import("jotai").PrimitiveAtom<EditorView | null> & {
    init: EditorView | null;
};
