import { Save, Upload } from "lucide-react";
import { useFileUpload } from "../hooks/useFileUpload";

export default function UploadZone({ onFileUpload, error, onErrorClear }) {
const { isDragOver, inputRef, handleDrop, handleDragOver, handleDragLeave, handleInputChange } = useFileUpload(onFileUpload, onErrorClear);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 " >
      <h2 className="text-2xl font-bold text-center text-ink-800 text-center">Your Favorite </h2>
      <div className="mb-12 animate-fade-in text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 flex items-center justify-center glow-cyan">
            <Save />
          </div>
          <h1 className="font-display text-2xl font-700 tracking-tight text-white">
            SVG<span className="shimmer-text">Editor</span>
          </h1>
        </div>

        <div className="flex gap-2 mt-1">
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-800 text-neon-cyan border border-neon-cyan/20">
            Upload
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#b847ff] text-ink-400 border border-ink-600">
            Edit
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0D1A63] text-ink-400 border border-ink-600">
            Download
          </span>
        </div>

      </div>

      <div
        className={`relative w-full max-w-lg cursor-pointer select-none rounded-2xl border   transition-all duration-300 animate-slide-up
          ${isDragOver
            ? "border-neon-cyan bg-neon-cyan/5 shadow-[0_0_40px_rgba(0,229,255,0.2)]"
            : "border-ink-600 hover:border-neon-cyan/50 hover:bg-ink-800/50"
          }
          bg-ink-800/30 backdrop-blur-sm 
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload SVG file"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".svg,image/svg+xml"
          className="hidden"
          onChange={handleInputChange}
        />

        <div className="flex flex-col items-center justify-center gap-5 px-8 py-16 ">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-ink-700 to-ink-800 border border-ink-600 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.15)] ${isDragOver ? "scale-110 border-neon-cyan/50 shadow-[0_0_35px_rgba(0,229,255,0.45)]" : "animate-float"}`}  >
            <Upload />
          </div>

          <div className="text-center space-y-2">
            <p className="font-display text-xl font-semibold text-white">
              {isDragOver ? "Release to upload" : "Drop your SVG here"}
            </p>
            <p className="text-ink-400 text-sm font-body">
              or{" "}
              <span className="text-neon-cyan hover:text-white transition-colors cursor-pointer font-medium">
                browse files
              </span>
            </p>
            <p className="text-ink-500 text-xs font-mono mt-1">
              Supports ".svg" files with {"{{name}}"}, {"{{title}}"} and {"{{description}}"} placeholders
            </p>
          </div>
        </div>

        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-neon-cyan/30 rounded-tl" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-neon-cyan/30 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-neon-cyan/30 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-neon-cyan/30 rounded-br" />
      </div>

      {error && (
        <div className="mt-4 w-full max-w-lg animate-slide-up">
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <span className="mt-0.5 shrink-0">⚠</span>
            <p className="text-sm font-body">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}




