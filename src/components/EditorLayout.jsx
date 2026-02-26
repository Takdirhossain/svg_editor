import { useState } from "react";
import LeftPanel from "./LeftPanel";
import PreviewPanel from "./PreviewPanel";

export default function EditorLayout({
  detectedPlaceHoldersList,
  fileName,
  fields,
  modifiedSVG,
  downloadFormat,
  isDownloading,
  downloadSuccess,
  onFieldChange,
  onDownloadFormatChange,
  onDownload,
  onReset,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden animate-fade-in">
      <header className="shrink-0 flex items-center justify-between px-6 py-3 bg-ink-900/80 backdrop-blur border-b border-ink-700/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="w-px h-4 bg-ink-700" />
          <span className="font-display text-sm font-semibold tracking-tight">
            SVG<span className="shimmer-text">Editor</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-ink-500 hidden sm:block">
            {fileName}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-mono text-neon-cyan">editing</span>
          </div>

          <button
            className="sm:hidden p-2 rounded-md bg-ink-700 text-white"
            onClick={() => setSidebarOpen(true)}
          >
            ⋮
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="hidden sm:flex w-80 xl:w-96 shrink-0 overflow-hidden flex-col">
          <LeftPanel
            detectedPlaceHoldersList={detectedPlaceHoldersList}
            fileName={fileName}
            fields={fields}
            onFieldChange={onFieldChange}
            downloadFormat={downloadFormat}
            onDownloadFormatChange={onDownloadFormatChange}
            onDownload={onDownload}
            isDownloading={isDownloading}
            downloadSuccess={downloadSuccess}
            onReset={onReset}
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
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          <div
            className={`relative w-screen h-screen bg-ink-800 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-md bg-ink-700 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
            <div className="p-4 h-full overflow-y-auto">
              <LeftPanel
                detectedPlaceHoldersList={detectedPlaceHoldersList}
                fileName={fileName}
                fields={fields}
                onFieldChange={onFieldChange}
                downloadFormat={downloadFormat}
                onDownloadFormatChange={onDownloadFormatChange}
                onDownload={onDownload}
                isDownloading={isDownloading}
                downloadSuccess={downloadSuccess}
                onReset={onReset}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
