import UploadZone from "./components/UploadZone";
import EditorLayout from "./components/EditorLayout";
import { useSVGEditor } from "./hooks/useSVGEditor";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { hasFile, detectedPlaceHoldersList, fileName, fields, modifiedSVG, uploadError, isDownloading, downloadFormat, downloadSuccess, handleFileUpload, updateField, resetEditor, handleDownload, setDownloadFormat, setUploadError } = useSVGEditor();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      {hasFile ? (
        <EditorLayout
          detectedPlaceHoldersList={detectedPlaceHoldersList}
          fileName={fileName}
          fields={fields}
          modifiedSVG={modifiedSVG}
          downloadFormat={downloadFormat}
          isDownloading={isDownloading}
          downloadSuccess={downloadSuccess}
          onFieldChange={updateField}
          onDownloadFormatChange={setDownloadFormat}
          onDownload={handleDownload}
          onReset={resetEditor}
          onFileUpload={handleFileUpload}
          error={uploadError}
          onErrorClear={() => setUploadError(null)}
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
