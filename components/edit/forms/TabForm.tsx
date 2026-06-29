"use client";
import { useForm } from "@tanstack/react-form";
import { tabSchema } from "@/lib/schemas";
import { upsertTab, deleteTab } from "@/app/actions/dashboard";
import type { TabData } from "@/lib/types";
import TextField from "../fields/TextField";
import IconPicker from "../fields/IconPicker";
import GradientField from "../fields/GradientField";
import ImageField from "../fields/ImageField";
import ColorField from "../fields/ColorField";

interface TabFormProps {
  tab: TabData | null;
  takenKeys: string[];
  onDone: () => void;
}

const SECTION =
  "collapse collapse-arrow border border-base-content/10 bg-base-200/40 rounded-box [&:has(>input:checked)]:overflow-visible [&:has(>input:checked)]:z-10";

const TabForm = ({ tab, takenKeys, onDone }: TabFormProps) => {
  const form = useForm({
    defaultValues: {
      slug: tab?.slug ?? "",
      label: tab?.label ?? "",
      icon: tab?.icon ?? "LuBookmark",
      order: tab?.order ?? 0,
      pillGradientFrom: tab?.pillGradientFrom ?? "#ec4899",
      pillGradientTo: tab?.pillGradientTo ?? "#a855f7",
      sideImage: tab?.sideImage ?? "https://picsum.photos/seed/new/800/1200",
      sideImageAlt: tab?.sideImageAlt ?? "",
      sideImageEdge: (tab?.sideImageEdge === "line" ? "line" : "gradient") as
        | "gradient"
        | "line",
      showSideImage: tab?.showSideImage ?? true,
      bgColor: tab?.bgColor ?? null,
      bgOpacity: tab?.bgOpacity ?? 1,
      bgImage: tab?.bgImage ?? null,
      borderWidth: tab?.borderWidth ?? 0,
      borderStyle: (tab?.borderStyle ?? "solid") as
        | "solid"
        | "dashed"
        | "dotted"
        | "double",
      borderColor: tab?.borderColor ?? null,
      sectionColumns: tab?.sectionColumns ?? 1,
      linkColumns: tab?.linkColumns ?? 2,
      headerTitle: tab?.headerTitle ?? "",
      headerVAlign: (tab?.headerVAlign ?? "top") as "top" | "center" | "bottom",
      headerHAlign: (tab?.headerHAlign ?? "center") as
        | "left"
        | "center"
        | "right",
      headerColor: tab?.headerColor ?? null,
      headerSize: (tab?.headerSize ?? "2xl") as
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl",
      headerWeight: (tab?.headerWeight ?? "bold") as
        | "normal"
        | "medium"
        | "semibold"
        | "bold",
      pillBgColor: tab?.pillBgColor ?? null,
      pillBgOpacity: tab?.pillBgOpacity ?? 1,
      pillBgImage: tab?.pillBgImage ?? null,
      pillShowIcon: tab?.pillShowIcon ?? true,
      pillShowTitle: tab?.pillShowTitle ?? true,
      pillTitleColor: tab?.pillTitleColor ?? null,
      pillTitleSize: (tab?.pillTitleSize ?? "sm") as
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl",
      pillTitleWeight: (tab?.pillTitleWeight ?? "medium") as
        | "normal"
        | "medium"
        | "semibold"
        | "bold",
      shortcutKey: tab?.shortcutKey ?? "",
    },
    validators: { onChange: tabSchema },
    onSubmit: async ({ value }) => {
      await upsertTab(value, tab?.id);
      onDone();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-3"
    >
      {/* Basics */}
      <div className={SECTION}>
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-medium text-base-content">
          Basics
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="label">
            {(f) => (
              <TextField
                label="Label"
                value={f.state.value}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
              />
            )}
          </form.Field>
          <form.Field name="slug">
            {(f) => (
              <TextField
                label="Slug (url-safe id)"
                value={f.state.value}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* Icon */}
      <div className={SECTION}>
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-sm font-medium text-base-content">
          Icon
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="icon">
            {(f) => (
              <IconPicker
                label="Icon"
                value={f.state.value}
                onChange={f.handleChange}
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* Side image */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Side image
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="showSideImage">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Show side image
              </label>
            )}
          </form.Field>
          <form.Field name="sideImage">
            {(f) => (
              <ImageField
                label="Side image"
                value={f.state.value}
                onChange={f.handleChange}
              />
            )}
          </form.Field>
          <form.Field name="sideImageAlt">
            {(f) => (
              <TextField
                label="Side image alt text"
                value={f.state.value}
                onChange={f.handleChange}
              />
            )}
          </form.Field>
          <form.Field name="sideImageEdge">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Side image edge
                </label>
                <div className="flex gap-3 text-sm text-base-content">
                  {(["gradient", "line"] as const).map((v) => (
                    <label key={v} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="sideImageEdge"
                        checked={f.state.value === v}
                        onChange={() => f.handleChange(v)}
                        className="radio radio-primary radio-sm"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Header title */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Header title
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="headerTitle">
            {(f) => (
              <TextField
                label="Header title"
                value={f.state.value}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
                placeholder="Optional title shown on the tab"
              />
            )}
          </form.Field>
          <form.Field name="headerVAlign">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Vertical position
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="top">Top</option>
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="headerHAlign">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Horizontal alignment
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="headerSize">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Title size
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra large</option>
                  <option value="2xl">2X large</option>
                  <option value="3xl">3X large</option>
                  <option value="4xl">4X large</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="headerWeight">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Title weight
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semibold</option>
                  <option value="bold">Bold</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="headerColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Title color"
                  value={f.state.value ?? ""}
                  onChange={(v) => f.handleChange(v || null)}
                />
                {f.state.value && (
                  <button
                    type="button"
                    onClick={() => f.handleChange(null)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear title color
                  </button>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Layout */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Layout
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="sectionColumns">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Section group columns
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseInt(e.target.value, 10))}
                  className="select select-bordered select-sm w-full"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="linkColumns">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Link columns (per section)
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseInt(e.target.value, 10))}
                  className="select select-bordered select-sm w-full"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </label>
            )}
          </form.Field>
        </div>
      </div>

      {/* Background */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Background
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="bgColor">
            {(f) => (
              <ColorField
                label="Background color"
                value={f.state.value ?? ""}
                onChange={(v) => f.handleChange(v || null)}
              />
            )}
          </form.Field>
          <form.Field name="bgOpacity">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Background opacity: {Math.round(f.state.value * 100)}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseFloat(e.target.value))}
                  className="range range-primary w-full"
                />
              </div>
            )}
          </form.Field>
          <form.Field name="bgImage">
            {(f) => (
              <ImageField
                label="Background image"
                value={f.state.value ?? ""}
                onChange={(v) => f.handleChange(v || null)}
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* Border */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Border
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="borderWidth">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Border thickness: {f.state.value}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseInt(e.target.value, 10))}
                  className="range range-primary w-full"
                />
              </div>
            )}
          </form.Field>
          <form.Field name="borderStyle">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Border type
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="borderColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Border color"
                  value={f.state.value ?? ""}
                  onChange={(v) => f.handleChange(v || null)}
                />
                {f.state.value && (
                  <button
                    type="button"
                    onClick={() => f.handleChange(null)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear border color
                  </button>
                )}
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Tab pill */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Tab pill
        </div>
        <div className="collapse-content space-y-4">
          <div className="space-y-2">
            <form.Field name="pillShowIcon">
              {(f) => (
                <label className="flex items-center gap-2 text-sm text-base-content">
                  <input
                    type="checkbox"
                    checked={f.state.value}
                    onChange={(e) => f.handleChange(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  Show pill icon
                </label>
              )}
            </form.Field>
            <form.Field name="pillShowTitle">
              {(f) => (
                <label className="flex items-center gap-2 text-sm text-base-content">
                  <input
                    type="checkbox"
                    checked={f.state.value}
                    onChange={(e) => f.handleChange(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  Show pill title
                </label>
              )}
            </form.Field>
            <form.Subscribe
              selector={(s) => !s.values.pillShowIcon && !s.values.pillShowTitle}
            >
              {(noneShown) =>
                noneShown ? (
                  <p className="text-xs text-error">
                    Show at least the pill icon or title
                  </p>
                ) : null
              }
            </form.Subscribe>
          </div>
          <form.Subscribe
            selector={(s) =>
              [s.values.pillGradientFrom, s.values.pillGradientTo] as const
            }
          >
            {([from, to]) => (
              <GradientField
                label="Active pill gradient (fallback)"
                from={from}
                to={to}
                onChange={(next) => {
                  form.setFieldValue("pillGradientFrom", next.from);
                  form.setFieldValue("pillGradientTo", next.to);
                }}
              />
            )}
          </form.Subscribe>
          <form.Field name="pillBgColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Pill background color (overrides gradient)"
                  value={f.state.value ?? ""}
                  onChange={(v) => f.handleChange(v || null)}
                />
                {f.state.value && (
                  <button
                    type="button"
                    onClick={() => f.handleChange(null)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear pill color
                  </button>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="pillBgOpacity">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Pill color opacity: {Math.round(f.state.value * 100)}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseFloat(e.target.value))}
                  className="range range-primary w-full"
                />
              </div>
            )}
          </form.Field>
          <form.Field name="pillBgImage">
            {(f) => (
              <ImageField
                label="Pill background image (overrides gradient)"
                value={f.state.value ?? ""}
                onChange={(v) => f.handleChange(v || null)}
              />
            )}
          </form.Field>
          <form.Field name="pillTitleColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Pill text color"
                  value={f.state.value ?? ""}
                  onChange={(v) => f.handleChange(v || null)}
                />
                {f.state.value && (
                  <button
                    type="button"
                    onClick={() => f.handleChange(null)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear pill text color
                  </button>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="pillTitleSize">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Pill text size
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="xs">Extra small</option>
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra large</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="pillTitleWeight">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Pill text weight
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="semibold">Semibold</option>
                  <option value="bold">Bold</option>
                </select>
              </label>
            )}
          </form.Field>
        </div>
      </div>

      {/* Shortcut */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Shortcut
        </div>
        <div className="collapse-content space-y-2">
          <form.Field name="shortcutKey">
            {(f) => (
              <TextField
                label="Shortcut key"
                value={f.state.value}
                onChange={(v) => f.handleChange(v.slice(-1))}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
                placeholder="single letter or number"
              />
            )}
          </form.Field>
          <form.Subscribe selector={(s) => s.values.shortcutKey}>
            {(key) =>
              key && takenKeys.includes(key.toLowerCase()) ? (
                <p className="text-xs text-error">Key already in use</p>
              ) : null
            }
          </form.Subscribe>
        </div>
      </div>

      <div className="flex gap-2">
        <form.Subscribe
          selector={(s) =>
            [s.canSubmit, s.isSubmitting, s.values.shortcutKey] as const
          }
        >
          {([canSubmit, isSubmitting, key]) => {
            const keyTaken = !!key && takenKeys.includes(key.toLowerCase());
            return (
              <button
                type="submit"
                disabled={!canSubmit || keyTaken}
                className="btn btn-primary flex-1"
              >
                {isSubmitting ? "Saving…" : "Save"}
              </button>
            );
          }}
        </form.Subscribe>
        {tab && (
          <button
            type="button"
            onClick={async () => {
              if (confirm("Delete this tab and all its sections/links?")) {
                await deleteTab(tab.id);
                onDone();
              }
            }}
            className="btn btn-error"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default TabForm;
