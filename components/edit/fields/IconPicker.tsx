"use client";
import { useState, useMemo } from "react";
import { LuGlobe } from "react-icons/lu";
import { iconNames, isImageIcon } from "@/lib/iconMap";
import Icon from "@/components/Icon";
import ImageField from "./ImageField";

interface IconPickerProps {
  label?: string;
  value: string;
  onChange: (name: string) => void;
  href?: string;
  allowWebsite?: boolean;
}

type Mode = "icons" | "upload" | "website";

const isValidHttpUrl = (url: string): boolean => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const IconPicker = ({
  label,
  value,
  onChange,
  href = "",
  allowWebsite = false,
}: IconPickerProps) => {
  const [mode, setMode] = useState<Mode>(() =>
    isImageIcon(value) ? "upload" : "icons",
  );
  const [query, setQuery] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return iconNames.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  const fetchFromSite = async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch("/api/favicon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: href }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch icon");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch icon");
    } finally {
      setFetching(false);
    }
  };

  const tab = (m: Mode, text: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
        activeMode === m
          ? "bg-primary text-primary-content"
          : "text-base-content/60 hover:bg-base-content/10"
      }`}
    >
      {text}
    </button>
  );

  const hrefValid = isValidHttpUrl(href);
  const activeMode = mode === "website" && !allowWebsite ? "icons" : mode;

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs text-base-content/60">{label}</label>}

      <div className="flex items-center gap-2 px-2 py-1 rounded bg-base-200 border border-base-content/10">
        <Icon icon={value} className="w-5 h-5 text-base-content" />
        <span className="flex-1 text-xs text-base-content/40 font-mono truncate">
          {value}
        </span>
      </div>

      <div className="flex gap-1 p-1 rounded bg-base-200 border border-base-content/10">
        {tab("icons", "Icons")}
        {tab("upload", "Upload")}
        {allowWebsite && tab("website", "Website")}
      </div>

      {activeMode === "icons" && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full text-sm"
          />
          <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto p-1 rounded bg-base-200 border border-base-content/10">
            {filtered.map((name) => {
              const active = name === value;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => onChange(name)}
                  title={name}
                  className={`flex items-center justify-center p-2 rounded transition-colors ${
                    active
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70 hover:bg-base-content/10"
                  }`}
                >
                  <Icon icon={name} className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeMode === "upload" && (
        <ImageField value={isImageIcon(value) ? value : ""} onChange={onChange} />
      )}

      {activeMode === "website" && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={fetchFromSite}
            disabled={!hrefValid || fetching}
            className="btn btn-sm"
          >
            <LuGlobe className="w-4 h-4" />
            {fetching ? "Fetching…" : "Fetch icon from site"}
          </button>
          {!hrefValid && (
            <p className="text-xs text-base-content/40">
              Enter a valid URL above to fetch its icon.
            </p>
          )}
          {error && <p className="text-xs text-error">{error}</p>}
          {isImageIcon(value) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="max-h-24 rounded border border-base-content/10"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default IconPicker;
