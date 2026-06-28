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
              />
            )}
          </form.Field>
        )}
      </form.Subscribe>
      <form.Field name="newTab">
        {(f) => (
          <label className="flex items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={f.state.value}
              onChange={(e) => f.handleChange(e.target.checked)}
            />
            Open in new tab
          </label>
        )}
      </form.Field>

      <div className="flex gap-2">
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-400 text-white font-medium disabled:opacity-50"
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
            className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default LinkForm;
