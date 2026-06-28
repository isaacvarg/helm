"use client";
import { useForm } from "@tanstack/react-form";
import { sectionSchema } from "@/lib/schemas";
import { upsertSection, deleteSection } from "@/app/actions/dashboard";
import type { SectionData } from "@/lib/types";
import TextField from "../fields/TextField";
import IconPicker from "../fields/IconPicker";
import ColorField from "../fields/ColorField";
import ImageField from "../fields/ImageField";

interface SectionFormProps {
  section: SectionData | null;
  tabId: number;
  onDone: () => void;
}

const SECTION =
  "collapse collapse-arrow border border-base-content/10 bg-base-200/40 rounded-box [&:has(>input:checked)]:overflow-visible [&:has(>input:checked)]:z-10";

const SectionForm = ({ section, tabId, onDone }: SectionFormProps) => {
  const form = useForm({
    defaultValues: {
      tabId: section?.tabId ?? tabId,
      title: section?.title ?? "",
      icon: section?.icon ?? "LuBookmark",
      order: section?.order ?? 0,
      showIcon: section?.showIcon ?? true,
      showTitle: section?.showTitle ?? true,
      iconSize: (section?.iconSize ?? "sm") as
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl",
      titleSize: (section?.titleSize ?? "xs") as
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl",
      titleWeight: (section?.titleWeight ?? "semibold") as
        | "normal"
        | "medium"
        | "semibold"
        | "bold",
      titleColor: section?.titleColor ?? null,
      borderWidth: section?.borderWidth ?? 0,
      borderStyle: (section?.borderStyle ?? "solid") as
        | "solid"
        | "dashed"
        | "dotted"
        | "double",
      borderColor: section?.borderColor ?? null,
      bgColor: section?.bgColor ?? null,
      bgOpacity: section?.bgOpacity ?? 1,
      bgImage: section?.bgImage ?? null,
    },
    validators: { onChange: sectionSchema },
    onSubmit: async ({ value }) => {
      await upsertSection(value, section?.id);
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
          <form.Field name="title">
            {(f) => (
              <TextField
                label="Title"
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

      {/* Display */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Display
        </div>
        <div className="collapse-content space-y-2">
          <form.Field name="showIcon">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Show icon
              </label>
            )}
          </form.Field>
          <form.Field name="showTitle">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Show title
              </label>
            )}
          </form.Field>
          <form.Subscribe
            selector={(s) => !s.values.showIcon && !s.values.showTitle}
          >
            {(noneShown) =>
              noneShown ? (
                <p className="text-xs text-error">
                  Show at least the icon or title
                </p>
              ) : null
            }
          </form.Subscribe>
          <form.Field name="iconSize">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Icon size
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
          <form.Field name="titleSize">
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
                  <option value="xs">Extra small</option>
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra large</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="titleWeight">
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
          <form.Field name="titleColor">
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

      <div className="flex gap-2">
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary flex-1"
            >
              {isSubmitting ? "Saving…" : "Save"}
            </button>
          )}
        </form.Subscribe>
        {section && (
          <button
            type="button"
            onClick={async () => {
              if (confirm("Delete this section and all its links?")) {
                await deleteSection(section.id);
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

export default SectionForm;
