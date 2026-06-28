"use client";
import { useState, useEffect, useRef } from "react";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorFieldProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
}

const ColorField = ({ label, value, onChange }: ColorFieldProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {label && <label className="block text-xs text-base-content/60 mb-1">{label}</label>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 shrink-0 rounded border border-base-content/20"
          style={{ background: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input input-bordered input-sm flex-1 min-w-0 text-sm font-mono"
        />
      </div>
      {open && (
        <div className="absolute z-10 mt-2">
          <HexAlphaColorPicker color={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default ColorField;
