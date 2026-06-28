"use client";

interface ThemeFieldProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
}

const FLAVORS: { id: string; name: string }[] = [
  { id: "latte", name: "Latte" },
  { id: "frappe", name: "Frappé" },
  { id: "macchiato", name: "Macchiato" },
  { id: "mocha", name: "Mocha" },
];

const ThemeField = ({ label, value, onChange }: ThemeFieldProps) => {
  const select = (id: string) => {
    onChange(id);
    // Live preview: apply immediately to the document; persists on Save.
    document.documentElement.setAttribute("data-theme", id);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs text-base-content/60">{label}</label>}
      <div className="grid grid-cols-2 gap-2">
        {FLAVORS.map((flavor) => {
          const active = value === flavor.id;
          return (
            <button
              key={flavor.id}
              type="button"
              onClick={() => select(flavor.id)}
              className={`flex items-center gap-3 rounded-lg border p-2 text-left transition-colors ${
                active
                  ? "border-primary ring-1 ring-primary"
                  : "border-base-content/10 hover:border-base-content/30"
              }`}
            >
              {/* Swatch previews this flavor regardless of the active theme. */}
              <div
                data-theme={flavor.id}
                className="flex gap-1 rounded bg-base-100 p-1 shadow-sm"
              >
                <span className="h-4 w-2 rounded-sm bg-primary" />
                <span className="h-4 w-2 rounded-sm bg-secondary" />
                <span className="h-4 w-2 rounded-sm bg-accent" />
              </div>
              <span className="text-sm text-base-content">{flavor.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeField;
