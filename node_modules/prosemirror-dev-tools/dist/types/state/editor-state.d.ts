import type { EditorState } from "prosemirror-state";
export declare const editorStateAtom: import("jotai").PrimitiveAtom<EditorState | null> & {
    init: EditorState | null;
};
