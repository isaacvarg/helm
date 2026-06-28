"use client";
import { useForm } from "@tanstack/react-form";
import { dashboardSchema } from "@/lib/schemas";
import { updateDashboard } from "@/app/actions/dashboard";
import type { DashboardData } from "@/lib/types";
import TextField from "../fields/TextField";
import GradientField from "../fields/GradientField";
import ImageField from "../fields/ImageField";
import ThemeField from "../fields/ThemeField";
import ColorField from "../fields/ColorField";

interface DashboardFormProps {
  dashboard: DashboardData;
  onDone: () => void;
}

const SECTION =
  "collapse collapse-arrow border border-base-content/10 bg-base-200/40 rounded-box [&:has(>input:checked)]:overflow-visible [&:has(>input:checked)]:z-10";

const DashboardForm = ({ dashboard, onDone }: DashboardFormProps) => {
  const form = useForm({
    defaultValues: {
      title: dashboard.title,
      subtitle: dashboard.subtitle,
      titleGradientFrom: dashboard.titleGradientFrom,
      titleGradientVia: dashboard.titleGradientVia ?? null,
      titleGradientTo: dashboard.titleGradientTo,
      backgroundImage: dashboard.backgroundImage,
      bgOverlayFrom: dashboard.bgOverlayFrom,
      bgOverlayVia: dashboard.bgOverlayVia ?? null,
      bgOverlayTo: dashboard.bgOverlayTo,
      bgOverlayOpacity: dashboard.bgOverlayOpacity ?? 1,
      theme: (dashboard.theme ?? "mocha") as
        | "latte"
        | "frappe"
        | "macchiato"
        | "mocha",
      showTitle: dashboard.showTitle ?? true,
      showSubtitle: dashboard.showSubtitle ?? true,
      titleColor: dashboard.titleColor ?? null,
      backgroundBlur: dashboard.backgroundBlur ?? 5,
      tabBarPosition: (dashboard.tabBarPosition ?? "bottom") as
        | "bottom"
        | "top"
        | "left"
        | "right",
      settingsShowIcon: dashboard.settingsShowIcon ?? true,
      settingsShowTitle: dashboard.settingsShowTitle ?? true,
      settingsButtonType: (dashboard.settingsButtonType ?? "ghost") as
        | "solid"
        | "outline"
        | "ghost"
        | "soft"
        | "link",
      settingsButtonSize: (dashboard.settingsButtonSize ?? "sm") as
        | "xs"
        | "sm"
        | "md"
        | "lg",
      settingsBorderWidth: dashboard.settingsBorderWidth ?? 0,
      settingsBorderStyle: (dashboard.settingsBorderStyle ?? "solid") as
        | "solid"
        | "dashed"
        | "dotted"
        | "double",
      settingsBorderColor: dashboard.settingsBorderColor ?? null,
      settingsBgColor: dashboard.settingsBgColor ?? null,
      settingsBgOpacity: dashboard.settingsBgOpacity ?? 1,
      settingsBgImage: dashboard.settingsBgImage ?? null,
    },
    validators: { onChange: dashboardSchema },
    onSubmit: async ({ value }) => {
      await updateDashboard(value);
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
          <form.Field name="subtitle">
            {(f) => (
              <TextField
                label="Subtitle"
                value={f.state.value}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                errors={f.state.meta.errors}
              />
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
          <form.Field name="showSubtitle">
            {(f) => (
              <label className="flex items-center gap-2 text-sm text-base-content">
                <input
                  type="checkbox"
                  checked={f.state.value}
                  onChange={(e) => f.handleChange(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Show subtitle
              </label>
            )}
          </form.Field>
        </div>
      </div>

      {/* Theme */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Theme
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="theme">
            {(f) => (
              <ThemeField
                label="UI Theme"
                value={f.state.value}
                onChange={(v) => f.handleChange(v as typeof f.state.value)}
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* Edit button */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Edit button
        </div>
        <div className="collapse-content space-y-4">
          <div className="space-y-2">
            <form.Field name="settingsShowIcon">
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
            <form.Field name="settingsShowTitle">
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
              selector={(s) =>
                !s.values.settingsShowIcon && !s.values.settingsShowTitle
              }
            >
              {(noneShown) =>
                noneShown ? (
                  <p className="text-xs text-error">
                    Show the settings icon or title
                  </p>
                ) : null
              }
            </form.Subscribe>
          </div>

          <form.Field name="settingsButtonType">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Button type
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="solid">Solid</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                  <option value="soft">Soft</option>
                  <option value="link">Link</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="settingsButtonSize">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Button size
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
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
            )}
          </form.Field>
          <form.Field name="settingsBorderWidth">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Button border thickness: {f.state.value}px
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
          <form.Field name="settingsBorderStyle">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Button border type
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
          <form.Field name="settingsBorderColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Button border color"
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
          <form.Field name="settingsBgColor">
            {(f) => (
              <ColorField
                label="Button background color"
                value={f.state.value ?? ""}
                onChange={(v) => f.handleChange(v || null)}
              />
            )}
          </form.Field>
          <form.Field name="settingsBgOpacity">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Button background opacity: {Math.round(f.state.value * 100)}%
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
          <form.Field name="settingsBgImage">
            {(f) => (
              <ImageField
                label="Button background image"
                value={f.state.value ?? ""}
                onChange={(v) => f.handleChange(v || null)}
              />
            )}
          </form.Field>
        </div>
      </div>

      {/* Title color */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Title color
        </div>
        <div className="collapse-content space-y-4">
          <form.Subscribe
            selector={(s) =>
              [
                s.values.titleGradientFrom,
                s.values.titleGradientVia,
                s.values.titleGradientTo,
              ] as const
            }
          >
            {([from, via, to]) => (
              <GradientField
                label="Title gradient"
                from={from}
                via={via}
                to={to}
                showVia
                onChange={(next) => {
                  form.setFieldValue("titleGradientFrom", next.from);
                  form.setFieldValue("titleGradientVia", next.via ?? null);
                  form.setFieldValue("titleGradientTo", next.to);
                }}
              />
            )}
          </form.Subscribe>
          <form.Field name="titleColor">
            {(f) => (
              <div className="space-y-1">
                <ColorField
                  label="Override gradient with color"
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
          <form.Field name="backgroundImage">
            {(f) => (
              <div>
                <ImageField
                  label="Background image"
                  value={f.state.value}
                  onChange={f.handleChange}
                />
                {f.state.meta.errors.length > 0 && (
                  <p className="text-xs text-error mt-1">
                    {typeof f.state.meta.errors[0] === "string"
                      ? f.state.meta.errors[0]
                      : f.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(s) =>
              [
                s.values.bgOverlayFrom,
                s.values.bgOverlayVia,
                s.values.bgOverlayTo,
              ] as const
            }
          >
            {([from, via, to]) => (
              <GradientField
                label="Background overlay"
                from={from}
                via={via}
                to={to}
                showVia
                onChange={(next) => {
                  form.setFieldValue("bgOverlayFrom", next.from);
                  form.setFieldValue("bgOverlayVia", next.via ?? null);
                  form.setFieldValue("bgOverlayTo", next.to);
                }}
              />
            )}
          </form.Subscribe>
          <form.Field name="bgOverlayOpacity">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Overlay opacity: {Math.round(f.state.value * 100)}%
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
          <form.Field name="backgroundBlur">
            {(f) => (
              <div className="space-y-1">
                <label className="block text-xs text-base-content/60">
                  Background blur: {f.state.value}px
                </label>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={f.state.value}
                  onChange={(e) => f.handleChange(parseInt(e.target.value, 10))}
                  className="range range-primary w-full"
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Tab bar */}
      <div className={SECTION}>
        <input type="checkbox" />
        <div className="collapse-title text-sm font-medium text-base-content">
          Tab bar
        </div>
        <div className="collapse-content space-y-4">
          <form.Field name="tabBarPosition">
            {(f) => (
              <label className="block space-y-1">
                <span className="block text-xs text-base-content/60">
                  Position
                </span>
                <select
                  value={f.state.value}
                  onChange={(e) =>
                    f.handleChange(e.target.value as typeof f.state.value)
                  }
                  className="select select-bordered select-sm w-full"
                >
                  <option value="bottom">Bottom</option>
                  <option value="top">Top</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
            )}
          </form.Field>
        </div>
      </div>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? "Saving…" : "Save"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default DashboardForm;
