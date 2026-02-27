import { useState } from "react";
import LeftPanel from "./LeftPanel";
import PreviewPanel from "./PreviewPanel";
import { Menu, X } from "lucide-react";

export default function EditorLayout({ fileName, modifiedSVG, detectedPlaceHoldersList, fields, downloadFormat, isDownloading, downloadSuccess, onFieldChange, onDownloadFormatChange, onDownload, onReset, onFileUpload, error, onErrorClear }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden animate-fade-in">
      <main className="flex flex-1 overflow-hidden">
        <div className="hidden sm:flex w-80 xl:w-96 shrink-0 overflow-hidden flex-col">
          <LeftPanel
            detectedPlaceHoldersList={detectedPlaceHoldersList}
            fields={fields}
            downloadFormat={downloadFormat}
            isDownloading={isDownloading}
            downloadSuccess={downloadSuccess}
            onFieldChange={onFieldChange}
            onDownloadFormatChange={onDownloadFormatChange}
            onDownload={onDownload}
            onReset={onReset}
            onFileUpload={onFileUpload}
            error={error}
            onErrorClear={onErrorClear}
          />
        </div>

        <div className="w-px bg-ink-700/50 shrink-0 hidden sm:block" />

        <div className="flex-1 overflow-hidden flex flex-col">
          <PreviewPanel modifiedSVG={modifiedSVG} fileName={fileName} />
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            className={`relative w-screen h-screen bg-ink-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-md bg-ink-700 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X />
            </button>
            <div className="p-4 pt-10 h-full overflow-y-auto bg-zinc-900">
              <LeftPanel
                detectedPlaceHoldersList={detectedPlaceHoldersList}
                fields={fields}
                downloadFormat={downloadFormat}
                isDownloading={isDownloading}
                downloadSuccess={downloadSuccess}
                onFieldChange={onFieldChange}
                onDownloadFormatChange={onDownloadFormatChange}
                onDownload={onDownload}
                onReset={onReset}
                onFileUpload={onFileUpload}
                error={error}
                onErrorClear={onErrorClear}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
