import type { EditorView } from "prosemirror-view";
type DevToolsProps = {
    diffWorker?: Worker;
};
declare function applyDevTools(editorView: EditorView, props: DevToolsProps): () => void;
export default applyDevTools;
export { applyDevTools };
