import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  TrendingDown,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { joinLines } from "@/lib/codegen";
import type { PlaygroundItem } from "@/types/playground";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none";

const BUTTON_SIZES: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const BUTTON_VARIANTS: Record<string, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",
  secondary: "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-500",
  outline: "border border-slate-600 text-slate-100 hover:bg-slate-800 focus:ring-slate-500",
  ghost: "text-slate-100 hover:bg-slate-800 focus:ring-slate-500",
  danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
};

const buttonComponent: PlaygroundItem = {
  id: "button",
  name: "Button",
  description: "A clickable button with variants, sizes and an optional icon.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Click me" },
    {
      type: "select",
      key: "variant",
      label: "Variant",
      default: "primary",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Danger", value: "danger" },
      ],
    },
    {
      type: "select",
      key: "size",
      label: "Size",
      default: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    { type: "boolean", key: "withIcon", label: "Trailing icon", default: false },
    { type: "boolean", key: "disabled", label: "Disabled", default: false },
  ],
  render: (values) => {
    const variant = values.variant as string;
    const size = values.size as string;
    const label = values.label as string;
    const withIcon = values.withIcon as boolean;
    const disabled = values.disabled as boolean;
    return (
      <button
        type="button"
        disabled={disabled}
        className={cn(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant])}
      >
        {label}
        {withIcon && <ArrowRight className="h-4 w-4" />}
      </button>
    );
  },
  generateCode: (values) => {
    const variant = values.variant as string;
    const size = values.size as string;
    const label = values.label as string;
    const withIcon = values.withIcon as boolean;
    const disabled = values.disabled as boolean;
    const classes = `${BUTTON_BASE} ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]}`;
    return joinLines(
      withIcon && `import { ArrowRight } from "lucide-react";\n`,
      `<button`,
      `  type="button"`,
      disabled && `  disabled`,
      `  className="${classes}"`,
      `>`,
      `  ${label}`,
      withIcon && `  <ArrowRight className="h-4 w-4" />`,
      `</button>`,
    );
  },
};

const BADGE_BASE = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

const BADGE_VARIANTS: Record<string, string> = {
  neutral: "bg-slate-700 text-slate-100",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-red-500/15 text-red-400",
  info: "bg-sky-500/15 text-sky-400",
};

const badgeComponent: PlaygroundItem = {
  id: "badge",
  name: "Badge",
  description: "A small pill used to label or tag content.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "New" },
    {
      type: "select",
      key: "variant",
      label: "Variant",
      default: "info",
      options: [
        { label: "Neutral", value: "neutral" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Danger", value: "danger" },
        { label: "Info", value: "info" },
      ],
    },
  ],
  render: (values) => {
    const variant = values.variant as string;
    const label = values.label as string;
    return <span className={cn(BADGE_BASE, BADGE_VARIANTS[variant])}>{label}</span>;
  },
  generateCode: (values) => {
    const variant = values.variant as string;
    const label = values.label as string;
    return joinLines(`<span className="${BADGE_BASE} ${BADGE_VARIANTS[variant]}">`, `  ${label}`, `</span>`);
  },
};

const cardComponent: PlaygroundItem = {
  id: "card",
  name: "Card",
  description: "A content card with an optional footer action.",
  controls: [
    { type: "text", key: "title", label: "Title", default: "Card title" },
    {
      type: "text",
      key: "description",
      label: "Description",
      default: "A short description of this card goes here.",
    },
    { type: "boolean", key: "withFooter", label: "Show footer", default: true },
    { type: "text", key: "footerLabel", label: "Footer label", default: "Learn more" },
  ],
  render: (values) => {
    const title = values.title as string;
    const description = values.description as string;
    const withFooter = values.withFooter as boolean;
    const footerLabel = values.footerLabel as string;
    return (
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-50">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-400">{description}</p>
        {withFooter && (
          <div className="mt-4 border-t border-slate-800 pt-4">
            <button type="button" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              {footerLabel} &rarr;
            </button>
          </div>
        )}
      </div>
    );
  },
  generateCode: (values) => {
    const title = values.title as string;
    const description = values.description as string;
    const withFooter = values.withFooter as boolean;
    const footerLabel = values.footerLabel as string;
    return joinLines(
      `<div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-sm">`,
      `  <h3 className="text-base font-semibold text-slate-50">${title}</h3>`,
      `  <p className="mt-1.5 text-sm text-slate-400">${description}</p>`,
      withFooter && `  <div className="mt-4 border-t border-slate-800 pt-4">`,
      withFooter &&
        `    <button type="button" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">`,
      withFooter && `      ${footerLabel} &rarr;`,
      withFooter && `    </button>`,
      withFooter && `  </div>`,
      `</div>`,
    );
  },
};

const ALERT_VARIANTS: Record<string, { container: string; icon: string; title: string; Icon: typeof Info }> = {
  info: { container: "border-sky-500/30 bg-sky-500/10", icon: "text-sky-400", title: "text-sky-100", Icon: Info },
  success: {
    container: "border-emerald-500/30 bg-emerald-500/10",
    icon: "text-emerald-400",
    title: "text-emerald-100",
    Icon: CheckCircle2,
  },
  warning: {
    container: "border-amber-500/30 bg-amber-500/10",
    icon: "text-amber-400",
    title: "text-amber-100",
    Icon: AlertTriangle,
  },
  error: { container: "border-red-500/30 bg-red-500/10", icon: "text-red-400", title: "text-red-100", Icon: XCircle },
};

const ALERT_ICON_NAME: Record<string, string> = {
  info: "Info",
  success: "CheckCircle2",
  warning: "AlertTriangle",
  error: "XCircle",
};

const alertComponent: PlaygroundItem = {
  id: "alert",
  name: "Alert",
  description: "An inline banner for surfacing information, success, warning or error states.",
  controls: [
    { type: "text", key: "title", label: "Title", default: "Heads up" },
    {
      type: "text",
      key: "description",
      label: "Description",
      default: "This is an informational alert message.",
    },
    {
      type: "select",
      key: "variant",
      label: "Variant",
      default: "info",
      options: [
        { label: "Info", value: "info" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
      ],
    },
    { type: "boolean", key: "dismissible", label: "Dismissible", default: false },
  ],
  render: (values) => {
    const variant = values.variant as string;
    const title = values.title as string;
    const description = values.description as string;
    const dismissible = values.dismissible as boolean;
    const { container, icon, title: titleColor, Icon } = ALERT_VARIANTS[variant];
    return (
      <div className={cn("relative flex w-full max-w-sm gap-3 rounded-lg border p-4", container)}>
        <Icon className={cn("h-5 w-5 shrink-0", icon)} />
        <div>
          <p className={cn("text-sm font-semibold", titleColor)}>{title}</p>
          <p className="mt-0.5 text-sm text-slate-300">{description}</p>
        </div>
        {dismissible && <X className="absolute right-3 top-3 h-4 w-4 text-slate-400" />}
      </div>
    );
  },
  generateCode: (values) => {
    const variant = values.variant as string;
    const title = values.title as string;
    const description = values.description as string;
    const dismissible = values.dismissible as boolean;
    const { container, icon, title: titleColor } = ALERT_VARIANTS[variant];
    const iconName = ALERT_ICON_NAME[variant];
    return joinLines(
      `import { ${iconName}${dismissible ? ", X" : ""} } from "lucide-react";\n`,
      `<div className="relative flex w-full max-w-sm gap-3 rounded-lg border p-4 ${container}">`,
      `  <${iconName} className="h-5 w-5 shrink-0 ${icon}" />`,
      `  <div>`,
      `    <p className="text-sm font-semibold ${titleColor}">${title}</p>`,
      `    <p className="mt-0.5 text-sm text-slate-300">${description}</p>`,
      `  </div>`,
      dismissible && `  <X className="absolute right-3 top-3 h-4 w-4 text-slate-400" />`,
      `</div>`,
    );
  },
};

const inputComponent: PlaygroundItem = {
  id: "input",
  name: "Input",
  description: "A labelled text input with helper text.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Email" },
    { type: "text", key: "placeholder", label: "Placeholder", default: "you@example.com" },
    {
      type: "select",
      key: "inputType",
      label: "Type",
      default: "email",
      options: [
        { label: "Text", value: "text" },
        { label: "Email", value: "email" },
        { label: "Password", value: "password" },
        { label: "Number", value: "number" },
      ],
    },
    { type: "text", key: "helperText", label: "Helper text", default: "We'll never share your email." },
    { type: "boolean", key: "disabled", label: "Disabled", default: false },
  ],
  render: (values) => {
    const label = values.label as string;
    const placeholder = values.placeholder as string;
    const inputType = values.inputType as string;
    const helperText = values.helperText as string;
    const disabled = values.disabled as boolean;
    return (
      <label className="block w-full max-w-sm">
        <span className="mb-1.5 block text-sm font-medium text-slate-200">{label}</span>
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
        />
        {helperText && <span className="mt-1.5 block text-xs text-slate-500">{helperText}</span>}
      </label>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const placeholder = values.placeholder as string;
    const inputType = values.inputType as string;
    const helperText = values.helperText as string;
    const disabled = values.disabled as boolean;
    return joinLines(
      `<label className="block w-full max-w-sm">`,
      `  <span className="mb-1.5 block text-sm font-medium text-slate-200">${label}</span>`,
      `  <input`,
      `    type="${inputType}"`,
      `    placeholder="${placeholder}"`,
      disabled && `    disabled`,
      `    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"`,
      `  />`,
      helperText.length > 0 && `  <span className="mt-1.5 block text-xs text-slate-500">${helperText}</span>`,
      `</label>`,
    );
  },
};

const AVATAR_SIZES: Record<string, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
};

const STATUS_DOT: Record<string, string> = {
  online: "bg-emerald-500",
  offline: "bg-slate-500",
};

const avatarComponent: PlaygroundItem = {
  id: "avatar",
  name: "Avatar",
  description: "A circular avatar with initials and an optional status dot.",
  controls: [
    { type: "text", key: "initials", label: "Initials", default: "PU" },
    {
      type: "select",
      key: "size",
      label: "Size",
      default: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      type: "select",
      key: "status",
      label: "Status",
      default: "online",
      options: [
        { label: "None", value: "none" },
        { label: "Online", value: "online" },
        { label: "Offline", value: "offline" },
      ],
    },
  ],
  render: (values) => {
    const initials = values.initials as string;
    const size = values.size as string;
    const status = values.status as string;
    return (
      <div className="relative inline-flex">
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-indigo-600 font-medium text-white",
            AVATAR_SIZES[size],
          )}
        >
          {initials}
        </div>
        {status !== "none" && (
          <span
            className={cn(
              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-slate-950",
              STATUS_DOT[status],
            )}
          />
        )}
      </div>
    );
  },
  generateCode: (values) => {
    const initials = values.initials as string;
    const size = values.size as string;
    const status = values.status as string;
    return joinLines(
      `<div className="relative inline-flex">`,
      `  <div className="flex items-center justify-center rounded-full bg-indigo-600 font-medium text-white ${AVATAR_SIZES[size]}">`,
      `    ${initials}`,
      `  </div>`,
      status !== "none" &&
        `  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-slate-950 ${STATUS_DOT[status]}" />`,
      `</div>`,
    );
  },
};

const checkboxComponent: PlaygroundItem = {
  id: "checkbox",
  name: "Checkbox",
  description: "A labelled checkbox input.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Accept terms and conditions" },
    { type: "boolean", key: "checked", label: "Checked by default", default: true },
    { type: "boolean", key: "disabled", label: "Disabled", default: false },
  ],
  render: (values) => {
    const label = values.label as string;
    const checked = values.checked as boolean;
    const disabled = values.disabled as boolean;
    return (
      <label className="flex items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          defaultChecked={checked}
          disabled={disabled}
          className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
        />
        {label}
      </label>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const checked = values.checked as boolean;
    const disabled = values.disabled as boolean;
    return joinLines(
      `<label className="flex items-center gap-2 text-sm text-slate-200">`,
      `  <input`,
      `    type="checkbox"`,
      `    defaultChecked={${checked}}`,
      disabled && `    disabled`,
      `    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-600 focus:ring-indigo-500"`,
      `  />`,
      `  ${label}`,
      `</label>`,
    );
  },
};

const switchComponent: PlaygroundItem = {
  id: "switch",
  name: "Switch",
  description: "A toggle switch for on/off settings.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Enable notifications" },
    { type: "boolean", key: "on", label: "On by default", default: true },
  ],
  render: (values) => {
    const label = values.label as string;
    const on = values.on as boolean;
    return (
      <label className="flex items-center gap-3 text-sm text-slate-200">
        <span>{label}</span>
        <span
          className={cn(
            "flex h-6 w-11 items-center rounded-full px-0.5 transition-colors",
            on ? "justify-end bg-indigo-600" : "justify-start bg-slate-700",
          )}
        >
          <span className="h-5 w-5 rounded-full bg-white" />
        </span>
      </label>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const on = values.on as boolean;
    const track = on ? "justify-end bg-indigo-600" : "justify-start bg-slate-700";
    return joinLines(
      `<label className="flex items-center gap-3 text-sm text-slate-200">`,
      `  <span>${label}</span>`,
      `  <button type="button" className="flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${track}">`,
      `    <span className="h-5 w-5 rounded-full bg-white" />`,
      `  </button>`,
      `</label>`,
    );
  },
};

function parseCsv(csv: string): string[] {
  return csv
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const selectComponent: PlaygroundItem = {
  id: "select",
  name: "Select",
  description: "A labelled dropdown built from a comma-separated option list.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Country" },
    { type: "text", key: "optionsCsv", label: "Options (comma separated)", default: "United States, Canada, United Kingdom" },
    { type: "boolean", key: "disabled", label: "Disabled", default: false },
  ],
  render: (values) => {
    const label = values.label as string;
    const disabled = values.disabled as boolean;
    const options = parseCsv(values.optionsCsv as string);
    return (
      <label className="block w-full max-w-sm">
        <span className="mb-1.5 block text-sm font-medium text-slate-200">{label}</span>
        <select
          disabled={disabled}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const disabled = values.disabled as boolean;
    const options = parseCsv(values.optionsCsv as string);
    return joinLines(
      `<label className="block w-full max-w-sm">`,
      `  <span className="mb-1.5 block text-sm font-medium text-slate-200">${label}</span>`,
      `  <select`,
      disabled && `    disabled`,
      `    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"`,
      `  >`,
      ...options.map((option) => `    <option>${option}</option>`),
      `  </select>`,
      `</label>`,
    );
  },
};

const textareaComponent: PlaygroundItem = {
  id: "textarea",
  name: "Textarea",
  description: "A multi-line labelled text area.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Message" },
    { type: "text", key: "placeholder", label: "Placeholder", default: "Write your message..." },
    {
      type: "select",
      key: "rows",
      label: "Rows",
      default: "4",
      options: [
        { label: "Small", value: "3" },
        { label: "Medium", value: "4" },
        { label: "Large", value: "8" },
      ],
    },
    { type: "boolean", key: "disabled", label: "Disabled", default: false },
  ],
  render: (values) => {
    const label = values.label as string;
    const placeholder = values.placeholder as string;
    const rows = values.rows as string;
    const disabled = values.disabled as boolean;
    return (
      <label className="block w-full max-w-sm">
        <span className="mb-1.5 block text-sm font-medium text-slate-200">{label}</span>
        <textarea
          rows={Number(rows)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
        />
      </label>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const placeholder = values.placeholder as string;
    const rows = values.rows as string;
    const disabled = values.disabled as boolean;
    return joinLines(
      `<label className="block w-full max-w-sm">`,
      `  <span className="mb-1.5 block text-sm font-medium text-slate-200">${label}</span>`,
      `  <textarea`,
      `    rows={${rows}}`,
      `    placeholder="${placeholder}"`,
      disabled && `    disabled`,
      `    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"`,
      `  />`,
      `</label>`,
    );
  },
};

const tabsComponent: PlaygroundItem = {
  id: "tabs",
  name: "Tabs",
  description: "A row of tabs with the first tab active.",
  controls: [{ type: "text", key: "tabsCsv", label: "Tabs (comma separated)", default: "Overview, Activity, Settings" }],
  render: (values) => {
    const tabs = parseCsv(values.tabsCsv as string);
    return (
      <div className="flex gap-1 border-b border-slate-800">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={
              i === 0
                ? "border-b-2 border-indigo-500 px-3 pb-2 text-sm font-medium text-slate-50"
                : "px-3 pb-2 text-sm text-slate-500"
            }
          >
            {tab}
          </span>
        ))}
      </div>
    );
  },
  generateCode: (values) => {
    const tabs = parseCsv(values.tabsCsv as string);
    return joinLines(
      `<div className="flex gap-1 border-b border-slate-800">`,
      ...tabs.map((tab, i) =>
        i === 0
          ? `  <span className="border-b-2 border-indigo-500 px-3 pb-2 text-sm font-medium text-slate-50">${tab}</span>`
          : `  <span className="px-3 pb-2 text-sm text-slate-500">${tab}</span>`,
      ),
      `</div>`,
    );
  },
};

const modalComponent: PlaygroundItem = {
  id: "modal",
  name: "Modal",
  description: "A confirmation dialog with a backdrop.",
  controls: [
    { type: "text", key: "title", label: "Title", default: "Delete item" },
    { type: "text", key: "description", label: "Description", default: "This action cannot be undone." },
    { type: "text", key: "confirmLabel", label: "Confirm label", default: "Delete" },
    { type: "text", key: "cancelLabel", label: "Cancel label", default: "Cancel" },
  ],
  render: (values) => {
    const title = values.title as string;
    const description = values.description as string;
    const confirmLabel = values.confirmLabel as string;
    const cancelLabel = values.cancelLabel as string;
    return (
      <div className="flex w-full max-w-sm items-center justify-center rounded-xl bg-slate-950/80 p-6">
        <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h3 className="text-base font-semibold text-slate-50">{title}</h3>
          <p className="mt-1.5 text-sm text-slate-400">{description}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800">
              {cancelLabel}
            </button>
            <button type="button" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500">
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const title = values.title as string;
    const description = values.description as string;
    const confirmLabel = values.confirmLabel as string;
    const cancelLabel = values.cancelLabel as string;
    return joinLines(
      `<div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 p-6">`,
      `  <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-5">`,
      `    <h3 className="text-base font-semibold text-slate-50">${title}</h3>`,
      `    <p className="mt-1.5 text-sm text-slate-400">${description}</p>`,
      `    <div className="mt-4 flex justify-end gap-2">`,
      `      <button type="button" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800">`,
      `        ${cancelLabel}`,
      `      </button>`,
      `      <button type="button" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500">`,
      `        ${confirmLabel}`,
      `      </button>`,
      `    </div>`,
      `  </div>`,
      `</div>`,
    );
  },
};

const tooltipComponent: PlaygroundItem = {
  id: "tooltip",
  name: "Tooltip",
  description: "A trigger with a tooltip that appears on hover.",
  controls: [
    { type: "text", key: "label", label: "Trigger label", default: "Hover me" },
    { type: "text", key: "tooltipText", label: "Tooltip text", default: "This is a tooltip" },
  ],
  render: (values) => {
    const label = values.label as string;
    const tooltipText = values.tooltipText as string;
    return (
      <div className="group relative inline-flex">
        <button type="button" className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200">
          {label}
        </button>
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">
          {tooltipText}
        </span>
      </div>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const tooltipText = values.tooltipText as string;
    return joinLines(
      `<div className="group relative inline-flex">`,
      `  <button type="button" className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200">`,
      `    ${label}`,
      `  </button>`,
      `  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">`,
      `    ${tooltipText}`,
      `  </span>`,
      `</div>`,
    );
  },
};

const progressComponent: PlaygroundItem = {
  id: "progress",
  name: "Progress bar",
  description: "A labelled progress bar.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Uploading..." },
    {
      type: "select",
      key: "value",
      label: "Progress",
      default: "60",
      options: [
        { label: "10%", value: "10" },
        { label: "25%", value: "25" },
        { label: "50%", value: "50" },
        { label: "60%", value: "60" },
        { label: "75%", value: "75" },
        { label: "100%", value: "100" },
      ],
    },
  ],
  render: (values) => {
    const label = values.label as string;
    const value = values.value as string;
    return (
      <div className="w-full max-w-sm">
        <div className="mb-1.5 flex justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${value}%` }} />
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const value = values.value as string;
    return joinLines(
      `<div className="w-full max-w-sm">`,
      `  <div className="mb-1.5 flex justify-between text-xs text-slate-400">`,
      `    <span>${label}</span>`,
      `    <span>${value}%</span>`,
      `  </div>`,
      `  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">`,
      `    <div className="h-full rounded-full bg-indigo-600" style={{ width: "${value}%" }} />`,
      `  </div>`,
      `</div>`,
    );
  },
};

const accordionComponent: PlaygroundItem = {
  id: "accordion",
  name: "Accordion",
  description: "Native, no-JS expand/collapse panels (first one open).",
  controls: [
    {
      type: "text",
      key: "itemsCsv",
      label: "Items (comma separated)",
      default: "Shipping info, Returns policy, Payment methods",
    },
  ],
  render: (values) => {
    const items = parseCsv(values.itemsCsv as string);
    return (
      <div className="w-full max-w-sm divide-y divide-slate-800 rounded-xl border border-slate-800">
        {items.map((item, i) => (
          <details key={item} open={i === 0} className="p-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-slate-100">{item}</summary>
            <p className="mt-2 text-sm text-slate-400">Additional details about {item.toLowerCase()}.</p>
          </details>
        ))}
      </div>
    );
  },
  generateCode: (values) => {
    const items = parseCsv(values.itemsCsv as string);
    return joinLines(
      `<div className="w-full max-w-sm divide-y divide-slate-800 rounded-xl border border-slate-800">`,
      ...items.flatMap((item, i) => [
        `  <details${i === 0 ? " open" : ""} className="p-4">`,
        `    <summary className="cursor-pointer list-none text-sm font-medium text-slate-100">${item}</summary>`,
        `    <p className="mt-2 text-sm text-slate-400">Additional details about ${item.toLowerCase()}.</p>`,
        `  </details>`,
      ]),
      `</div>`,
    );
  },
};

const breadcrumbComponent: PlaygroundItem = {
  id: "breadcrumb",
  name: "Breadcrumb",
  description: "A breadcrumb trail built from a comma-separated list.",
  controls: [{ type: "text", key: "crumbsCsv", label: "Crumbs (comma separated)", default: "Home, Projects, Play UI" }],
  render: (values) => {
    const crumbs = parseCsv(values.crumbsCsv as string);
    return (
      <nav className="flex items-center gap-1.5 text-sm text-slate-400">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-600" />}
            <span className={i === crumbs.length - 1 ? "text-slate-100" : "hover:text-slate-200"}>{crumb}</span>
          </span>
        ))}
      </nav>
    );
  },
  generateCode: (values) => {
    const crumbs = parseCsv(values.crumbsCsv as string);
    return joinLines(
      `import { ChevronRight } from "lucide-react";\n`,
      `<nav className="flex items-center gap-1.5 text-sm text-slate-400">`,
      ...crumbs.flatMap((crumb, i) => [
        i > 0 && `  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />`,
        i === crumbs.length - 1
          ? `  <span className="text-slate-100">${crumb}</span>`
          : `  <span>${crumb}</span>`,
      ]),
      `</nav>`,
    );
  },
};

const chipListComponent: PlaygroundItem = {
  id: "chip-list",
  name: "Chip list",
  description: "A wrapping list of tag chips, optionally removable.",
  controls: [
    { type: "text", key: "chipsCsv", label: "Chips (comma separated)", default: "React, TypeScript, Tailwind" },
    { type: "boolean", key: "removable", label: "Removable (show x)", default: false },
  ],
  render: (values) => {
    const chips = parseCsv(values.chipsCsv as string);
    const removable = values.removable as boolean;
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200"
          >
            {chip}
            {removable && <X className="h-3 w-3 text-slate-500" />}
          </span>
        ))}
      </div>
    );
  },
  generateCode: (values) => {
    const chips = parseCsv(values.chipsCsv as string);
    const removable = values.removable as boolean;
    return joinLines(
      removable && `import { X } from "lucide-react";\n`,
      `<div className="flex flex-wrap gap-2">`,
      ...chips.flatMap((chip) => [
        `  <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">`,
        `    ${chip}`,
        removable && `    <X className="h-3 w-3 text-slate-500" />`,
        `  </span>`,
      ]),
      `</div>`,
    );
  },
};

const statCardComponent: PlaygroundItem = {
  id: "stat-card",
  name: "Stat card",
  description: "A small metric card with a trend indicator.",
  controls: [
    { type: "text", key: "label", label: "Label", default: "Total revenue" },
    { type: "text", key: "value", label: "Value", default: "$48,290" },
    { type: "text", key: "delta", label: "Delta", default: "+12.4%" },
    {
      type: "select",
      key: "trend",
      label: "Trend",
      default: "up",
      options: [
        { label: "Up", value: "up" },
        { label: "Down", value: "down" },
      ],
    },
  ],
  render: (values) => {
    const label = values.label as string;
    const value = values.value as string;
    const delta = values.delta as string;
    const trend = values.trend as string;
    const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
    return (
      <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-slate-50">{value}</p>
        <p className={cn("mt-1 flex items-center gap-1 text-xs", trend === "up" ? "text-emerald-400" : "text-red-400")}>
          <TrendIcon className="h-3.5 w-3.5" />
          {delta}
        </p>
      </div>
    );
  },
  generateCode: (values) => {
    const label = values.label as string;
    const value = values.value as string;
    const delta = values.delta as string;
    const trend = values.trend as string;
    const iconName = trend === "up" ? "TrendingUp" : "TrendingDown";
    const trendColor = trend === "up" ? "text-emerald-400" : "text-red-400";
    return joinLines(
      `import { ${iconName} } from "lucide-react";\n`,
      `<div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-4">`,
      `  <p className="text-xs text-slate-500">${label}</p>`,
      `  <p className="mt-1 text-2xl font-semibold text-slate-50">${value}</p>`,
      `  <p className="mt-1 flex items-center gap-1 text-xs ${trendColor}">`,
      `    <${iconName} className="h-3.5 w-3.5" />`,
      `    ${delta}`,
      `  </p>`,
      `</div>`,
    );
  },
};

export const componentRegistry: PlaygroundItem[] = [
  buttonComponent,
  badgeComponent,
  cardComponent,
  alertComponent,
  inputComponent,
  avatarComponent,
  checkboxComponent,
  switchComponent,
  selectComponent,
  textareaComponent,
  tabsComponent,
  modalComponent,
  tooltipComponent,
  progressComponent,
  accordionComponent,
  breadcrumbComponent,
  chipListComponent,
  statCardComponent,
];
