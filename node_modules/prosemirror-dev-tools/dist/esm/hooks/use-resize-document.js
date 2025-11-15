import React from "react";
export function useResizeDocument(isOpen, defaultSize) {
  React.useEffect(function () {
    if (!isOpen) {
      document.querySelector("html").style.marginBottom = "";
    } else {
      var size = defaultSize * window.innerHeight;
      document.querySelector("html").style.marginBottom = "".concat(size, "px");
    }
  }, [defaultSize, isOpen]);
}