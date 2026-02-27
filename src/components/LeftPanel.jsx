import { FilePlusCorner } from "lucide-react";
import FieldInput from "./FieldInput";
import { useFileUpload } from "../hooks/useFileUpload";
import toast from "react-hot-toast";
import { useEffect } from "react";


export default function LeftPanel({ detectedPlaceHoldersList, fields, downloadFormat, isDownloading, downloadSuccess, onFieldChange, onDownloadFormatChange, onDownload, onReset, onFileUpload, error, onErrorClear }) {
  const { inputRef, handleInputChange } = useFileUpload(onFileUpload, onErrorClear);

useEffect(() => {
  if (error) {
    toast.error(error);
    onErrorClear(); 
  }
}, [error]);

  const FIELD_CONFIG = [
    {
      key: "name",
      label: "Name",
      placeholder: "e.g. John Doe",
      icon: "👤",
      hint: "{{name}}",
      multiline: false,
    },
    {
      key: "title",
      label: "Title",
      placeholder: "e.g. Senior Engineer",
      icon: "🏷️",
      hint: "{{title}}",
      multiline: false,
    },
    {
      key: "description",
      label: "Description",
      placeholder: "e.g. Award for Excellence in 2024",
      icon: "📝",
      hint: "{{description}}",
      multiline: true,
    },
  ];

  return (
    <aside className="flex flex-col h-full bg-ink-900/50 border-r border-zinc-800">
      <div className="px-6 pt-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
             <span className="font-display text-md font-semibold tracking-tight">
            SVG<span className="shimmer-text">Editor</span>
          </span>
          </div>
          <div className="bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 glow-cyan" >
            <button
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload SVG file"
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              className=" cursor-pointer bg-blue-800 flex items-center gap-1.5 border border-neon-cyan/20 px-2 py-1 rounded-lg text-xs font-mono text-ink-500 hover:text-neon-cyan transition-colors group"
              title="Upload new file"
            >
              <input ref={inputRef}  type="file" accept=".svg,image/svg+xml"  className="hidden" onChange={handleInputChange}/>
              <FilePlusCorner width={18} />
              New file
            </button>
          </div>

        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-5">
        <h6 className="text-xs font-mono mt-3 text-ink-500 uppercase tracking-widest">Available Replacements:</h6>

        {FIELD_CONFIG.filter(config =>
          detectedPlaceHoldersList.includes(config.key)
        ).map((config) => (
          <FieldInput
            key={config.key}
            id={config.key}
            label={config.label}
            placeholder={config.placeholder}
            value={fields[config.key]}
            onChange={(val) => onFieldChange(config.key, val)}
            icon={config.icon}
            hint={config.hint}
            isActive={fields[config.key].length > 0}
            multiline={config.multiline}
          />
        ))}
      </div>

      <div className="px-6 py-5 border-t border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-ink-500 shrink-0">Format:</span>
          <div className="flex bg-ink-800 border border-zinc-700 rounded-lg p-0.5 gap-0.5 flex-1">
            {["svg", "png"].map((fmt) => (
              <button key={fmt} onClick={() => onDownloadFormatChange(fmt)}
                className={`
                  flex-1 text-xs font-mono py-1.5 rounded-md transition-all duration-200
                  ${downloadFormat === fmt
                    ? "bg-blue-800 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                    : "text-ink-400 hover:text-ink-200"
                  }
                `}
              >
                .{fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button onClick={onDownload} disabled={isDownloading}
          className={`
            relative w-full py-3.5 rounded-xl  font-display font-semibold text-sm
            flex items-center justify-center gap-2.5 overflow-hidden
            transition-all duration-300 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 glow-cyan
            ${downloadSuccess
              ? "bg-neon-green/20 border border-neon-green/40 text-neon-green shadow-[0_0_20px_rgba(57,255,126,0.2)]"
              : isDownloading
                ? "bg-ink-700 border border-ink-600 text-ink-400 cursor-not-allowed"
                : "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/40 text-white hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] active:scale-[0.98]"
            }
          `}
        >
          {downloadSuccess ? (
            <>
              Downloaded!
            </>
          ) : isDownloading ? (
            <>
              Generating...
            </>
          ) : (
            <>
              <span className="shimmer-text" >
                Download .{downloadFormat.toUpperCase()}
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}






