"use client";
import { useForm } from "@tanstack/react-form";
import { dashboardSchema } from "@/lib/schemas";
import { updateDashboard } from "@/app/actions/dashboard";
import type { DashboardData } from "@/lib/types";
import TextField from "../fields/TextField";
import GradientField from "../fields/GradientField";
import ImageField from "../fields/ImageField";
import ThemeField from "../fields/ThemeField";

interface DashboardFormProps {
  dashboard: DashboardData;
  onDone: () => void;
}

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
      theme: (dashboard.theme ?? "mocha") as "latte" | "frappe" | "macchiato" | "mocha",
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
      className="space-y-4"
    >
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

      <form.Field name="theme">
        {(f) => (
          <ThemeField
            label="UI Theme"
            value={f.state.value}
            onChange={(v) => f.handleChange(v as typeof f.state.value)}
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(s) => [s.values.titleGradientFrom, s.values.titleGradientVia, s.values.titleGradientTo] as const}
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

      <form.Field name="backgroundImage">
        {(f) => (
          <div>
            <ImageField label="Background image" value={f.state.value} onChange={f.handleChange} />
            {f.state.meta.errors.length > 0 && (
              <p className="text-xs text-error mt-1">
                {typeof f.state.meta.errors[0] === "string" ? f.state.meta.errors[0] : f.state.meta.errors[0]?.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(s) => [s.values.bgOverlayFrom, s.values.bgOverlayVia, s.values.bgOverlayTo] as const}
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
