import { useState, useRef, useCallback } from "react";

export function useFileUpload(onFileUpload, onErrorClear) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    onErrorClear?.();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileUpload(file);
  }, [onFileUpload, onErrorClear]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    onErrorClear?.();
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
    e.target.value = "";
  }, [onFileUpload, onErrorClear]);

  return {
    isDragOver,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
  };
}
