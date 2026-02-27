import { Eye } from "lucide-react";


export default function PreviewPanel({ modifiedSVG, fileName }) {

  const svgDataUrl = modifiedSVG
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSVG)}`
    : null;

  return (
    <section className="flex flex-col h-full bg-ink-950">
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-700/50 bg-ink-900/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-sm font-semibold text-white tracking-tight">
            Preview
          </h2>
          <Eye />
        </div>

        <div >
          <span className="text-xs font-mono text-ink-600">
            {fileName || "No file loaded"}
          </span>
          {modifiedSVG && (
            <span className="text-xs font-mono text-ink-600">
              ({(modifiedSVG.length / 1024).toFixed(1)} KB)
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative flex items-center justify-center min-h-full p-8">
          {svgDataUrl ? (
            <div
              className="animate-fade-in relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative rounded-xl overflow-hidden border border-ink-700/50 shadow-2xl bg-white">
                <img
                  src={svgDataUrl}
                  alt="SVG Preview"
                  className="block"
                  
                />
              </div>
            </div>
          ) : (
            <EmptyPreview />
          )}
        </div>
      </div>


    </section>
  );
}



function EmptyPreview() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-ink-800/50 border border-ink-700 flex items-center justify-center animate-float">
      </div>
      <div>
        <p className="text-sm font-display font-medium text-ink-500">No preview yet</p>
        <p className="text-xs font-mono text-ink-700 mt-1">Fill in the fields to see your SVG</p>
      </div>
    </div>
  );
}
