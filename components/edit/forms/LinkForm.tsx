"use client";
import { useForm } from "@tanstack/react-form";
import { linkSchema } from "@/lib/schemas";
import { upsertLink, deleteLink } from "@/app/actions/dashboard";
import type { LinkData } from "@/lib/types";
import TextField from "../fields/TextField";
import IconPicker from "../fields/IconPicker";

interface LinkFormProps {
  link: LinkData | null;
  sectionId: number;
  onDone: () => void;
}

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

      <div className="space-y-2">
        <p className="text-sm font-medium text-base-content">Display</p>
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
