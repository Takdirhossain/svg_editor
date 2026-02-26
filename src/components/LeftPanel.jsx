import { Check, Download, File, LoaderCircle } from "lucide-react";
import FieldInput from "./FieldInput";


export default function LeftPanel({
  detectedPlaceHoldersList,
  fileName,
  fields,
  onFieldChange,
  downloadFormat,
  onDownloadFormatChange,
  onDownload,
  isDownloading,
  downloadSuccess,
  onReset,
}) {

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
    <aside className="flex flex-col h-full bg-ink-900/50 border-r border-ink-700/50">
      <div className="px-6 pt-6 pb-4 border-b border-ink-700/50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">

            <h2 className="font-display text-sm font-semibold text-white tracking-tight">
              Editor
            </h2>
          </div>
          <button
            onClick={onReset}
            className=" cursor-pointer flex items-center gap-1.5 border border-neon-cyan/20 px-2 py-1 rounded-lg text-xs font-mono text-ink-500 hover:text-neon-cyan transition-colors group"
            title="Upload new file"
          >
            <LoaderCircle className="group-hover:rotate-180 transition-transform duration-300" width={18}/>
            New file
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-800 border border-ink-700">
          <File />
          <span className="text-xs font-mono text-neon-cyan truncate flex-1" title={fileName}>
            {fileName}
          </span>
          <span className="shrink-0 text-xs font-mono text-ink-500 bg-ink-700 px-1.5 py-0.5 rounded">
            SVG
          </span>
        </div>



      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-ink-700" />
          <span className="text-xs font-mono text-ink-500 uppercase tracking-widest">
            Replacements
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-ink-700" />
        </div>


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

      <div className="px-6 py-5 border-t border-ink-700/50 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-ink-500 shrink-0">Format:</span>
          <div className="flex bg-ink-800 border border-ink-700 rounded-lg p-0.5 gap-0.5 flex-1">
            {["svg", "png"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => onDownloadFormatChange(fmt)}
                className={`
                  flex-1 text-xs font-mono py-1.5 rounded-md transition-all duration-200
                  ${downloadFormat === fmt
                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                    : "text-ink-400 hover:text-ink-200"
                  }
                `}
              >
                .{fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onDownload}
          disabled={isDownloading}
          className={`
            relative w-full py-3.5 rounded-xl font-display font-semibold text-sm
            flex items-center justify-center gap-2.5 overflow-hidden
            transition-all duration-300
            ${downloadSuccess
              ? "bg-neon-green/20 border border-neon-green/40 text-neon-green shadow-[0_0_20px_rgba(57,255,126,0.2)]"
              : isDownloading
                ? "bg-ink-700 border border-ink-600 text-ink-400 cursor-not-allowed"
                : "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/40 text-white hover:border-neon-cyan/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] active:scale-[0.98]"
            }
          `}
        >
          {!isDownloading && !downloadSuccess && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          )}

          {downloadSuccess ? (
            <>
              <Check />
              Downloaded!
            </>
          ) : isDownloading ? (
            <>
              <LoaderCircle />
              Generating...
            </>
          ) : (
            <>
              <Download />
              Download .{downloadFormat.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </aside>
  );
}






