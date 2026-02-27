import UploadZone from "./components/UploadZone";
import EditorLayout from "./components/EditorLayout";
import { useSVGEditor } from "./hooks/useSVGEditor";
import { Toaster } from "react-hot-toast";

export default function App() {
  const {hasFile, uploadError, fileName, modifiedSVG, handleFileUpload, setUploadError} = useSVGEditor();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      {hasFile ? (
        <EditorLayout
          fileName={fileName}
          modifiedSVG={modifiedSVG}
        />
      ) : (
        <UploadZone
          onFileUpload={handleFileUpload}
          error={uploadError}
          onErrorClear={() => setUploadError(null)}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}
