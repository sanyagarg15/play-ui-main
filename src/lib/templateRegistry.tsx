import { joinLines } from "@/lib/codegen";
import type { PlaygroundItem } from "@/types/playground";

const dashboardTemplate: PlaygroundItem = {
  id: "dashboard-shell",
  name: "Dashboard Shell",
  description: "A sidebar + topbar + stat cards layout for an app dashboard.",
  controls: [{ type: "text", key: "heading", label: "Heading", default: "Dashboard" }],
  render: (values) => {
    const heading = values.heading as string;
    return (
      <div className="flex w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        <div className="w-14 shrink-0 space-y-3 border-r border-slate-800 bg-slate-900 p-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-8 rounded-lg bg-slate-800" />
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-50">{heading}</h2>
            <div className="h-8 w-8 rounded-full bg-indigo-600" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Users", "Revenue", "Uptime"].map((label) => (
              <div key={label} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-slate-50">--</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
            Recent activity
          </div>
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const heading = values.heading as string;
    return joinLines(
      `export function DashboardShell() {`,
      `  const stats = ["Users", "Revenue", "Uptime"];`,
      ``,
      `  return (`,
      `    <div className="flex min-h-screen bg-slate-950">`,
      `      <aside className="w-14 shrink-0 space-y-3 border-r border-slate-800 bg-slate-900 p-3">`,
      `        {[0, 1, 2, 3].map((i) => (`,
      `          <div key={i} className="h-8 w-8 rounded-lg bg-slate-800" />`,
      `        ))}`,
      `      </aside>`,
      `      <main className="flex-1 p-6">`,
      `        <div className="flex items-center justify-between">`,
      `          <h2 className="text-lg font-semibold text-slate-50">${heading}</h2>`,
      `          <div className="h-8 w-8 rounded-full bg-indigo-600" />`,
      `        </div>`,
      `        <div className="mt-4 grid grid-cols-3 gap-3">`,
      `          {stats.map((label) => (`,
      `            <div key={label} className="rounded-lg border border-slate-800 bg-slate-900 p-3">`,
      `              <p className="text-xs text-slate-500">{label}</p>`,
      `              <p className="mt-1 text-lg font-semibold text-slate-50">--</p>`,
      `            </div>`,
      `          ))}`,
      `        </div>`,
      `        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">`,
      `          Recent activity`,
      `        </div>`,
      `      </main>`,
      `    </div>`,
      `  );`,
      `}`,
    );
  },
};

const authTemplate: PlaygroundItem = {
  id: "auth-card",
  name: "Auth Card",
  description: "A centered login card with email, password and a submit button.",
  controls: [{ type: "text", key: "heading", label: "Heading", default: "Welcome back" }],
  render: (values) => {
    const heading = values.heading as string;
    return (
      <div className="flex w-full max-w-2xl items-center justify-center rounded-xl border border-slate-700 bg-slate-950 p-10">
        <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-slate-50">{heading}</h2>
          <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>
          <div className="mt-5 space-y-3">
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Email"
            />
            <input
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Password"
            />
            <button
              type="button"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Don&apos;t have an account? <span className="text-indigo-400">Sign up</span>
          </p>
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const heading = values.heading as string;
    return joinLines(
      `export function AuthCard() {`,
      `  return (`,
      `    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">`,
      `      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6">`,
      `        <h2 className="text-xl font-semibold text-slate-50">${heading}</h2>`,
      `        <p className="mt-1 text-sm text-slate-400">Sign in to your account</p>`,
      `        <div className="mt-5 space-y-3">`,
      `          <input`,
      `            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"`,
      `            placeholder="Email"`,
      `          />`,
      `          <input`,
      `            type="password"`,
      `            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"`,
      `            placeholder="Password"`,
      `          />`,
      `          <button`,
      `            type="button"`,
      `            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"`,
      `          >`,
      `            Sign in`,
      `          </button>`,
      `        </div>`,
      `        <p className="mt-4 text-center text-xs text-slate-500">`,
      `          Don&apos;t have an account? <span className="text-indigo-400">Sign up</span>`,
      `        </p>`,
      `      </div>`,
      `    </div>`,
      `  );`,
      `}`,
    );
  },
};

const heroTemplate: PlaygroundItem = {
  id: "landing-hero",
  name: "Landing Hero",
  description: "A centered marketing hero with a heading, subtext and two CTAs.",
  controls: [{ type: "text", key: "heading", label: "Heading", default: "Build faster with Play UI" }],
  render: (values) => {
    const heading = values.heading as string;
    return (
      <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-950 px-8 py-14 text-center">
        <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
          New
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-50">{heading}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
          Generate production-ready UI code without leaving your browser.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white">
            Get started
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-100"
          >
            Learn more
          </button>
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const heading = values.heading as string;
    return joinLines(
      `export function LandingHero() {`,
      `  return (`,
      `    <section className="mx-auto max-w-2xl px-8 py-20 text-center">`,
      `      <span className="inline-flex items-center rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-400">`,
      `        New`,
      `      </span>`,
      `      <h1 className="mt-4 text-4xl font-bold text-slate-50">${heading}</h1>`,
      `      <p className="mx-auto mt-3 max-w-md text-base text-slate-400">`,
      `        Generate production-ready UI code without leaving your browser.`,
      `      </p>`,
      `      <div className="mt-8 flex items-center justify-center gap-3">`,
      `        <button type="button" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white">`,
      `          Get started`,
      `        </button>`,
      `        <button`,
      `          type="button"`,
      `          className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-100"`,
      `        >`,
      `          Learn more`,
      `        </button>`,
      `      </div>`,
      `    </section>`,
      `  );`,
      `}`,
    );
  },
};

const settingsTemplate: PlaygroundItem = {
  id: "settings-page",
  name: "Settings Page",
  description: "A tabbed settings page with a form panel.",
  controls: [{ type: "text", key: "heading", label: "Heading", default: "Settings" }],
  render: (values) => {
    const heading = values.heading as string;
    const tabs = ["General", "Security", "Notifications"];
    return (
      <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold text-slate-50">{heading}</h2>
        <div className="mt-4 flex gap-1 border-b border-slate-800">
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
        <div className="mt-5 max-w-sm space-y-3">
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Display name"
          />
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Email"
          />
          <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
            Save changes
          </button>
        </div>
      </div>
    );
  },
  generateCode: (values) => {
    const heading = values.heading as string;
    return joinLines(
      `import { useState } from "react";\n`,
      `export function SettingsPage() {`,
      `  const tabs = ["General", "Security", "Notifications"];`,
      `  const [active, setActive] = useState(0);`,
      ``,
      `  return (`,
      `    <div className="mx-auto max-w-2xl p-6">`,
      `      <h2 className="text-lg font-semibold text-slate-50">${heading}</h2>`,
      `      <div className="mt-4 flex gap-1 border-b border-slate-800">`,
      `        {tabs.map((tab, i) => (`,
      `          <button`,
      `            key={tab}`,
      `            type="button"`,
      `            onClick={() => setActive(i)}`,
      `            className={`,
      `              i === active`,
      `                ? "border-b-2 border-indigo-500 px-3 pb-2 text-sm font-medium text-slate-50"`,
      `                : "px-3 pb-2 text-sm text-slate-500"`,
      `            }`,
      `          >`,
      `            {tab}`,
      `          </button>`,
      `        ))}`,
      `      </div>`,
      `      <div className="mt-5 max-w-sm space-y-3">`,
      `        <input`,
      `          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"`,
      `          placeholder="Display name"`,
      `        />`,
      `        <input`,
      `          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"`,
      `          placeholder="Email"`,
      `        />`,
      `        <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">`,
      `          Save changes`,
      `        </button>`,
      `      </div>`,
      `    </div>`,
      `  );`,
      `}`,
    );
  },
};

export const templateRegistry: PlaygroundItem[] = [dashboardTemplate, authTemplate, heroTemplate, settingsTemplate];
