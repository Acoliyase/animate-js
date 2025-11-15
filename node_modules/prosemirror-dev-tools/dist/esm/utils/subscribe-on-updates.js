export default function subscribeOnUpdates(editorView, callback) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  var maybeDispatchTransaction = editorView._props.dispatchTransaction;
  var dispatch = (maybeDispatchTransaction || editorView.dispatch).bind(editorView);
  var handler = function handler(tr) {
    var oldState = editorView.state;
    dispatch(tr);
    callback(tr, oldState, editorView.state);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (editorView._props.dispatchTransaction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    editorView._props.dispatchTransaction = handler;
  } else {
    editorView.dispatch = handler;
  }
}