"use client";
import ColorField from "./ColorField";

interface GradientFieldProps {
  label: string;
  from: string;
  via?: string | null;
  to: string;
  showVia?: boolean;
  onChange: (next: { from: string; via?: string | null; to: string }) => void;
}

const GradientField = ({ label, from, via, to, showVia, onChange }: GradientFieldProps) => {
  const stops = showVia && via ? `${from}, ${via}, ${to}` : `${from}, ${to}`;
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-base-content/80">{label}</label>
      <div
        className="h-6 rounded border border-base-content/20"
        style={{ background: `linear-gradient(to right, ${stops})` }}
      />
      <div className={`grid gap-2 ${showVia ? "grid-cols-3" : "grid-cols-2"}`}>
        <ColorField label="From" value={from} onChange={(v) => onChange({ from: v, via, to })} />
        {showVia && (
          <ColorField
            label="Via"
            value={via ?? "#ffffff"}
            onChange={(v) => onChange({ from, via: v, to })}
          />
        )}
        <ColorField label="To" value={to} onChange={(v) => onChange({ from, via, to: v })} />
      </div>
    </div>
  );
};

export default GradientField;
