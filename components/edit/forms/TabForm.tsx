"use client";
import { useForm } from "@tanstack/react-form";
import { tabSchema } from "@/lib/schemas";
import { upsertTab, deleteTab } from "@/app/actions/dashboard";
import type { TabData } from "@/lib/types";
import TextField from "../fields/TextField";
import IconPicker from "../fields/IconPicker";
import GradientField from "../fields/GradientField";
import ImageField from "../fields/ImageField";

interface TabFormProps {
  tab: TabData | null;
  onDone: () => void;
}

const TabForm = ({ tab, onDone }: TabFormProps) => {
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
      sideImageEdge: (tab?.sideImageEdge === "line" ? "line" : "gradient") as "gradient" | "line",
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
      className="space-y-4"
    >
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
      <form.Field name="icon">
        {(f) => <IconPicker label="Icon" value={f.state.value} onChange={f.handleChange} />}
      </form.Field>

      <form.Subscribe selector={(s) => [s.values.pillGradientFrom, s.values.pillGradientTo] as const}>
        {([from, to]) => (
          <GradientField
            label="Active tab pill gradient"
            from={from}
            to={to}
            onChange={(next) => {
              form.setFieldValue("pillGradientFrom", next.from);
              form.setFieldValue("pillGradientTo", next.to);
            }}
          />
        )}
      </form.Subscribe>

      <form.Field name="sideImage">
        {(f) => <ImageField label="Side image" value={f.state.value} onChange={f.handleChange} />}
      </form.Field>
      <form.Field name="sideImageAlt">
        {(f) => (
          <TextField label="Side image alt text" value={f.state.value} onChange={f.handleChange} />
        )}
      </form.Field>
      <form.Field name="sideImageEdge">
        {(f) => (
          <div className="space-y-1">
            <label className="block text-xs text-base-content/60">Side image edge</label>
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
