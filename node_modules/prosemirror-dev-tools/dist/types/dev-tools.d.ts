/// <reference types="react" />
import type { EditorView } from "prosemirror-view";
export default function DevTools(props: DevToolsProps): JSX.Element;
type DevToolsProps = {
    editorView: EditorView;
    diffWorker?: Worker;
};
export {};
