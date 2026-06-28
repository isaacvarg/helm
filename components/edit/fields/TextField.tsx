"use client";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  errors?: readonly unknown[];
  textarea?: boolean;
  placeholder?: string;
  type?: string;
}

const TextField = ({ label, value, onChange, onBlur, errors, textarea, placeholder, type }: TextFieldProps) => {
  const errMsgs = (errors ?? [])
    .map((e) => (typeof e === "string" ? e : (e as { message?: string } | null | undefined)?.message))
    .filter((m): m is string => Boolean(m));
  return (
    <div className="space-y-1">
      <label className="block text-xs text-base-content/60">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={3}
          className="textarea textarea-bordered w-full text-sm"
        />
      ) : (
        <input
          type={type ?? "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="input input-bordered w-full text-sm"
        />
      )}
      {errMsgs.length > 0 && <p className="text-xs text-error">{errMsgs[0]}</p>}
    </div>
  );
};

export default TextField;
