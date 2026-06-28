"use client";
import { useForm } from "@tanstack/react-form";
import { linkSchema } from "@/lib/schemas";
import { upsertLink, deleteLink } from "@/app/actions/dashboard";
import type { LinkData } from "@/lib/types";
import TextField from "../fields/TextField";
import IconPicker from "../fields/IconPicker";
import ColorField from "../fields/ColorField";
import ImageField from "../fields/ImageField";

interface LinkFormProps {
  link: LinkData | null;
  sectionId: number;
  onDone: () => void;
}

const SECTION =
  "collapse collapse-arrow border border-base-content/10 bg-base-200/40 rounded-box [&:has(>input:checked)]:overflow-visible [&:has(>input:checked)]:z-10";

const LinkForm = ({ link, sectionId, onDone }: LinkFormProps) => {
  const form = useForm({
    defaultValues: {
      sectionId: link?.sectionId ?? sectionId,
      icon: link?.icon ?? "LuBookmark",
      title: link?.title ?? "",
      description: link?.description ?? "",
      href: link?.href ?? "",
      newTab: link?.newTab ?? true,
      showIcon: link?.showIcon ?? true,
      showTitle: link?.showTitle ?? true,
      showDescription: link?.showDescription ?? true,
      bgColor: link?.bgColor ?? null,
      bgOpacity: link?.bgOpacity ?? 1,
      bgImage: link?.bgImage ?? null,
      borderWidth: link?.borderWidth ?? 0,
      borderStyle: (link?.borderStyle ?? "solid") as
        | "solid"
        | "dashed"
        | "dotted"
        | "double",
      borderColor: link?.borderColor ?? null,
      textAlign: (link?.textAlign ?? "left") as "left" | "center" | "right",
      titleSize: (link?.titleSize ?? "sm") as
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "2xl",
      titleWeight: (link?.titleWeight ?? "medium") as
        | "normal"
        | "medium"
        | "semibold"
        | "bold",
      textColor: link?.textColor ?? null,
      order: link?.order ?? 0,
    },
    validators: { onChange: linkSchema },
    onSubmit: async ({ value }) => {
      await upsertLink(value, link?.id);
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
          <form.Field name="description">
            {(f) => (
              <TextField
                label="Description"
                value={f.state.value ?? ""}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
                textarea
              />
            )}
          </form.Field>
          <form.Field name="href">
            {(f) => (
              <TextField
                label="URL"
                value={f.state.value}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
                placeholder="https://example.com"
              />
            )}
          </form.Field>
          <form.Field name="newTab">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Open in new tab
              </label>
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
          <form.Subscribe selector={(s) => s.values.href}>
            {(href) => (
              <form.Field name="icon">
                {(f) => (
                  <IconPicker
                    label="Icon"
                    value={f.state.value}
                    onChange={f.handleChange}
                    href={href}
                    allowWebsite
                  />
                )}
              </form.Field>
            )}
          </form.Subscribe>
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
          <form.Field name="showDescription">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Show description
              </label>
            )}
          </form.Field>
          <form.Subscribe
            selector={(s) =>
              !s.values.showIcon &&
              !s.values.showTitle &&
              !s.values.showDescription
            }
          >
            {(allHidden) =>
              allHidden ? (
                <p className="text-xs text-error">
                  Show at least one of icon, title, or description
                </p>
              ) : null
            }
          </form.Subscribe>
          <form.Field name="textAlign">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Text alignment
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(
                      e.target.value as "left" | "center" | "right",
                    )
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
                  <option value="2xl">2X large</option>
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
          <form.Field name="textColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Text color"
                  value={f.state.value ?? ""}
                  onChange={(v) => f.handleChange(v || null)}
                />
                {f.state.value && (
                  <button
                    type="button"
                    onClick={() => f.handleChange(null)}
                    className="btn btn-ghost btn-xs"
                  >
                    Clear text color
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
        {link && (
          <button
            type="button"
            onClick={async () => {
              if (confirm("Delete this link?")) {
                await deleteLink(link.id);
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

export default LinkForm;
