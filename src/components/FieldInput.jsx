
export default function FieldInput({ id, label, placeholder, value, onChange, icon, hint, isActive = false, multiline = false }) {
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="group space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-ink-400 uppercase"
        >
          {icon && <span className="text-sm">{icon}</span>}
          {label}
        </label>
        {hint && (
          <span className="text-xs font-mono text-ink-600 bg-ink-800  px-2 py-0.5 rounded">
            {hint}
          </span>
        )}
      </div>

      <div className="relative">
        <Tag
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 3 : undefined}
          className={`
            input-field w-full bg-ink-800/60 border border-zinc-700 rounded-md px-4 py-3
            font-body text-sm text-white placeholder:text-ink-600
            transition-all duration-200
            resize-none
            ${isActive
              ? "border-neon-cyan/50 shadow-[0_0_0_3px_rgba(0,229,255,0.08)]"
              : "border-ink-600 hover:border-ink-500"
            }
            ${multiline ? "min-h-[88px]" : ""}
          `}
        />

        {multiline && value.length > 0 && (
          <span className="absolute bottom-3 right-3 text-xs font-mono text-ink-600">
            {value.length}
          </span>
        )}

        {value.length > 0 && !multiline && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-slow" />
        )}
      </div>
    </div>
  );
}
