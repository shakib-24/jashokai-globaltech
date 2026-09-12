export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={name}
      className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-medium text-navy"
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded accent-gold"
      />
      {label}
    </label>
  );
}
