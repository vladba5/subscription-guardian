import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Sparkles, Plus, Search, Bell, Settings as SettingsIcon, ChevronRight, ChevronLeft,
  TrendingDown, TrendingUp, Wallet, Calendar, AlertCircle, Check, X, Pause, Play,
  Filter, ArrowUpDown, MoreVertical, CreditCard, Tag, FileText, Clock, Shield,
  Download, Cloud, Smartphone, Globe, Lock, LogOut, User, ChevronDown, Eye, EyeOff,
  Zap, Crown, Infinity as InfinityIcon, BarChart3, Bookmark, Trash2, Edit3, Moon, Sun,
  Mail, ArrowRight, Home, List, PieChart, Leaf,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Subly — Subscription Tracker UI Kit" },
      { name: "description", content: "Premium mobile UI kit for a subscription management app, in light and dark mode." },
    ],
  }),
  component: Index,
});

/* ---------- shared bits ---------- */

function StatusBar() {
  return (
    <div className="relative z-40 flex h-11 shrink-0 items-center justify-between px-7 pt-2 text-[11px] font-semibold text-foreground">
      <span>9:41</span>
      <span className="opacity-0">.</span>
      <div className="flex items-center gap-1">
        <span className="text-[10px]">●●●●</span>
        <span className="ml-1">5G</span>
        <div className="ml-1 h-2.5 w-5 rounded-[3px] border border-foreground/70 p-[1px]">
          <div className="h-full w-[80%] rounded-[1px] bg-foreground" />
        </div>
      </div>
    </div>
  );
}

function Phone({ label, children, dark }: { label: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={dark ? "dark text-foreground" : "text-foreground"}>
        <div className="phone-frame">
          <div className="notch" />
          <div className="phone-screen">{children}</div>
        </div>
      </div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "subs" | "insights" | "settings" }) {
  const items = [
    { k: "home", label: "Home", Icon: Home },
    { k: "subs", label: "Subs", Icon: List },
    { k: "insights", label: "Insights", Icon: PieChart },
    { k: "settings", label: "Settings", Icon: SettingsIcon },
  ] as const;
  return (
    <div className="mt-auto shrink-0 border-t border-border bg-surface/95 px-2 pb-5 pt-2 backdrop-blur">
      <div className="flex items-end justify-between px-2">
        {items.map(({ k, label, Icon }) => {
          const isActive = active === k;
          return (
            <button key={k} className="flex w-16 flex-col items-center gap-1 py-1">
              <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Logo({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.6_0.16_152/0.7)]"
    >
      <Leaf size={size * 0.55} strokeWidth={2.4} />
    </div>
  );
}

function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "primary" | "warning" | "destructive" | "accent" }) {
  const map: Record<string, string> = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-accent text-accent-foreground",
    accent: "bg-accent text-accent-foreground",
    warning: "bg-[oklch(0.95_0.08_75)] text-[oklch(0.4_0.1_75)] dark:bg-[oklch(0.3_0.08_75)] dark:text-[oklch(0.9_0.12_75)]",
    destructive: "bg-[oklch(0.95_0.06_25)] text-[oklch(0.5_0.18_25)] dark:bg-[oklch(0.3_0.08_25)] dark:text-[oklch(0.85_0.15_25)]",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}>{children}</span>;
}

/* ---------- service icons (faux brand tiles) ---------- */

type Service = { name: string; price: number; cycle: "mo" | "yr"; bg: string; fg: string; letter: string; cat: string; next: string };
const SERVICES: Service[] = [
  { name: "Netflix",   price: 15.49, cycle: "mo", bg: "#E50914", fg: "#fff", letter: "N", cat: "Entertainment", next: "Jun 02" },
  { name: "Spotify",   price: 10.99, cycle: "mo", bg: "#1DB954", fg: "#0a0a0a", letter: "S", cat: "Music",         next: "Jun 04" },
  { name: "Notion",    price: 8.0,   cycle: "mo", bg: "#111111", fg: "#fff", letter: "N", cat: "Productivity",  next: "Jun 07" },
  { name: "Figma",     price: 144,   cycle: "yr", bg: "#0ACF83", fg: "#0a0a0a", letter: "F", cat: "Design",        next: "Aug 22" },
  { name: "iCloud+",   price: 2.99,  cycle: "mo", bg: "#3B82F6", fg: "#fff", letter: "i", cat: "Storage",       next: "Jun 12" },
  { name: "NYT",       price: 17,    cycle: "mo", bg: "#000000", fg: "#fff", letter: "T", cat: "News",          next: "Jun 18" },
  { name: "Adobe CC",  price: 54.99, cycle: "mo", bg: "#DA1F26", fg: "#fff", letter: "A", cat: "Design",        next: "Jun 21" },
  { name: "Disney+",   price: 13.99, cycle: "mo", bg: "#0E1A2E", fg: "#fff", letter: "D", cat: "Entertainment", next: "Jul 01" },
];

function ServiceIcon({ s, size = 40 }: { s: Service; size?: number }) {
  return (
    <div
      style={{ width: size, height: size, background: s.bg, color: s.fg }}
      className="flex shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-[0_4px_10px_-4px_rgba(0,0,0,0.25)]"
    >
      {s.letter}
    </div>
  );
}

/* ---------- screens ---------- */

function ScreenWelcome() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="relative flex-1 px-6 pt-8">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-16 top-40 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col items-center pt-10 text-center">
          <Logo size={68} />
          <h1 className="mt-6 text-[28px] font-bold leading-tight tracking-tight text-foreground">
            Take back control<br />of your subscriptions.
          </h1>
          <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-muted-foreground">
            Track every recurring charge, spot waste, and save money — automatically.
          </p>
          <div className="mt-7 flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
            <Shield size={12} className="text-primary" />
            Bank-grade privacy · End-to-end encrypted
          </div>
        </div>
      </div>
      <div className="relative space-y-2.5 px-6 pb-8">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.6_0.16_152/0.7)]">
          <Mail size={16} /> Sign up with Email
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-3.5 text-sm font-semibold text-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.12a6.6 6.6 0 0 1 0-4.24V7.04H2.18a11 11 0 0 0 0 9.92l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Continue with Google
        </button>
        <button className="w-full py-2 text-[12px] font-medium text-muted-foreground">
          Continue as Guest · <span className="text-primary">Log in</span>
        </button>
      </div>
    </div>
  );
}

function ScreenSignUp() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-4 pt-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><ChevronLeft size={18} /></button>
        <span className="text-[12px] font-medium text-muted-foreground">Step 1 of 2</span>
        <div className="w-9" />
      </div>
      <div className="flex-1 px-6">
        <h1 className="text-[24px] font-bold tracking-tight text-foreground">Create your account</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Start tracking in less than a minute.</p>

        <div className="mt-6 space-y-3">
          {[
            { label: "Full name", value: "Ava Bennett", type: "text" },
            { label: "Email", value: "ava@email.com", type: "email" },
          ].map((f) => (
            <div key={f.label}>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{f.label}</label>
              <input defaultValue={f.value} className="h-12 w-full rounded-xl border border-input bg-surface px-4 text-[13px] text-foreground outline-none focus:border-primary" />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Password</label>
            <div className="flex h-12 items-center rounded-xl border border-input bg-surface pr-3">
              <input type="password" defaultValue="••••••••••" className="h-full w-full bg-transparent px-4 text-[13px] text-foreground outline-none" />
              <Eye size={16} className="text-muted-foreground" />
            </div>
            <div className="mt-2 flex gap-1.5">
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div className="h-1 flex-1 rounded-full bg-primary/60" />
              <div className="h-1 flex-1 rounded-full bg-muted" />
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">Strong — use 8+ characters, a number & a symbol</p>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Confirm password</label>
            <div className="flex h-12 items-center rounded-xl border border-input bg-surface pr-3">
              <input type="password" defaultValue="••••••••••" className="h-full w-full bg-transparent px-4 text-[13px] text-foreground outline-none" />
              <Check size={16} className="text-primary" />
            </div>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-2 text-[11px] text-muted-foreground">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"><Check size={11} /></span>
          I agree to the <span className="text-foreground underline">Terms</span> and <span className="text-foreground underline">Privacy Policy</span>.
        </label>
      </div>

      <div className="space-y-2.5 bg-background px-6 pb-8 pt-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.6_0.16_152/0.7)]">
          Create account <ArrowRight size={16} />
        </button>
        <div className="flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background py-3 text-sm font-semibold text-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.12a6.6 6.6 0 0 1 0-4.24V7.04H2.18a11 11 0 0 0 0 9.92l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}

function Ring({ value = 0.68 }: { value?: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
      <circle cx="48" cy="48" r={r} stroke="currentColor" className="text-muted" strokeWidth="10" fill="none" />
      <circle cx="48" cy="48" r={r} stroke="currentColor" className="text-primary" strokeWidth="10" strokeLinecap="round" fill="none"
        strokeDasharray={c} strokeDashoffset={c * (1 - value)} />
    </svg>
  );
}

function ScreenDashboard() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">AB</div>
          <div>
            <p className="text-[10px] text-muted-foreground">Good morning</p>
            <p className="text-[13px] font-semibold text-foreground">Ava Bennett</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><Search size={16} /></button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-surface">
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden px-5 pt-2">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-5 text-foreground">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[11px] opacity-70">Monthly spend</p>
              <p className="mt-1 text-[30px] font-bold leading-none tracking-tight">$127.45</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                <TrendingDown size={11} /> 8% vs last month
              </div>
            </div>
            <div className="relative">
              <div className="text-primary"><Ring value={0.68} /></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[16px] font-bold">68%</span>
                <span className="text-[8px] opacity-70">of budget</span>
              </div>
            </div>
          </div>
          <div className="relative mt-4 flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="text-[10px] opacity-60">Yearly</p>
              <p className="text-[13px] font-semibold">$1,529</p>
            </div>
            <div>
              <p className="text-[10px] opacity-60">Active</p>
              <p className="text-[13px] font-semibold">12 subs</p>
            </div>
            <div>
              <p className="text-[10px] opacity-60">Next charge</p>
              <p className="text-[13px] font-semibold">Jun 02</p>
            </div>
          </div>
        </div>

        {/* Savings insight */}
        <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-accent p-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-accent-foreground">Save $23.98 / month</p>
            <p className="text-[10.5px] text-accent-foreground/80">2 unused subscriptions detected.</p>
          </div>
          <ChevronRight size={16} className="text-accent-foreground" />
        </div>

        {/* Upcoming */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-foreground">Upcoming renewals</h3>
            <button className="text-[11px] font-medium text-primary">See all</button>
          </div>
          <div className="space-y-2">
            {SERVICES.slice(0, 3).map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
                <ServiceIcon s={s} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-semibold text-foreground">{s.name}</p>
                  <p className="text-[10.5px] text-muted-foreground">{s.cat} · {s.next}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-foreground">${s.price}</p>
                  <p className="text-[10px] text-muted-foreground">/{s.cycle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_18px_30px_-10px_oklch(0.6_0.16_152/0.7)]">
        <Plus size={22} />
      </button>

      <BottomNav active="home" />
    </div>
  );
}

function ScreenList() {
  const tags = ["All", "Active", "Trial", "Paused"] as const;
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-3 pt-1">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Subscriptions</h1>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><Filter size={15} /></button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><ArrowUpDown size={15} /></button>
        </div>
      </div>

      <div className="px-5">
        <div className="flex h-11 items-center gap-2 rounded-xl bg-surface px-3">
          <Search size={15} className="text-muted-foreground" />
          <input placeholder="Search subscriptions" className="h-full w-full bg-transparent text-[13px] outline-none" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {tags.map((t, i) => (
            <button key={t} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-5 py-3">
        {SERVICES.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
            <ServiceIcon s={s} size={42} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[13px] font-semibold text-foreground">{s.name}</p>
                {i === 3 && <Pill tone="warning">Trial</Pill>}
                {i === 5 && <Pill tone="destructive">Unused</Pill>}
              </div>
              <p className="mt-0.5 text-[10.5px] text-muted-foreground">{s.cat} · Renews {s.next}</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-semibold text-foreground">${s.price}</p>
              <p className="text-[10px] text-muted-foreground">/{s.cycle}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="subs" />
    </div>
  );
}

function ScreenDetails() {
  const s = SERVICES[0];
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><ChevronLeft size={18} /></button>
        <span className="text-[12px] font-medium text-muted-foreground">Subscription</span>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><MoreVertical size={16} /></button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-4 pt-2">
        <div className="rounded-3xl bg-surface p-5 text-center">
          <ServiceIcon s={s} size={64} />
          <h2 className="mt-3 text-[18px] font-bold text-foreground">{s.name}</h2>
          <p className="text-[11px] text-muted-foreground">Standard plan · {s.cat}</p>
          <p className="mt-3 text-[32px] font-bold leading-none tracking-tight text-foreground">${s.price}<span className="text-[13px] font-medium text-muted-foreground">/month</span></p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Active · Renews in 4 days
          </div>
        </div>

        <div className="space-y-2 rounded-2xl bg-surface p-2">
          {[
            { Icon: Calendar, label: "Next renewal", value: "Jun 02, 2026" },
            { Icon: Clock, label: "Billing cycle", value: "Monthly" },
            { Icon: CreditCard, label: "Payment", value: "•••• 4242" },
            { Icon: Tag, label: "Category", value: s.cat },
            { Icon: FileText, label: "Notes", value: "Shared with family" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Icon size={14} /></div>
              <span className="flex-1 text-[12px] text-muted-foreground">{label}</span>
              <span className="text-[12px] font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[12px] font-semibold text-foreground">Renewal history</h3>
            <span className="text-[10px] text-muted-foreground">Last 4 months</span>
          </div>
          <div className="space-y-3">
            {["May 02 · Paid", "Apr 02 · Paid", "Mar 02 · Paid", "Feb 02 · Paid"].map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Check size={12} />
                </div>
                <span className="flex-1 text-[11.5px] text-foreground">{d}</span>
                <span className="text-[11.5px] font-semibold text-foreground">$15.49</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-primary py-3 text-[13px] font-semibold text-primary-foreground">
            <Edit3 size={14} /> Edit
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-border bg-surface py-3 text-[13px] font-semibold text-destructive">
            <Trash2 size={14} /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreenAdd() {
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><X size={16} /></button>
        <span className="text-[13px] font-semibold text-foreground">New subscription</span>
        <button className="text-[12px] font-semibold text-primary">Save</button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4 pt-2">
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Plus size={20} />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-foreground">Add logo</p>
            <p className="text-[10.5px] text-muted-foreground">We'll try to detect it automatically.</p>
          </div>
        </div>

        {[
          { label: "Service name", value: "Spotify", icon: Bookmark },
          { label: "Category", value: "Music", icon: Tag, chevron: true },
        ].map((f) => (
          <div key={f.label}>
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">{f.label}</label>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-input bg-surface px-3">
              <f.icon size={14} className="text-muted-foreground" />
              <input defaultValue={f.value} className="h-full w-full bg-transparent text-[13px] text-foreground outline-none" />
              {f.chevron && <ChevronDown size={14} className="text-muted-foreground" />}
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Price</label>
            <div className="flex h-12 items-center rounded-xl border border-input bg-surface px-3">
              <span className="text-[13px] text-muted-foreground">$</span>
              <input defaultValue="10.99" className="h-full w-full bg-transparent px-1 text-[13px] font-semibold text-foreground outline-none" />
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Cycle</label>
            <div className="flex h-12 items-center justify-between rounded-xl border border-input bg-surface px-3 text-[13px] text-foreground">
              Monthly <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Start date</label>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-input bg-surface px-3 text-[13px] text-foreground">
              <Calendar size={14} className="text-muted-foreground" /> Jan 04, 2024
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Next renewal</label>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-input bg-surface px-3 text-[13px] text-foreground">
              <Calendar size={14} className="text-muted-foreground" /> Jun 04, 2026
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-2xl bg-surface p-1">
          {[
            { label: "Free trial", desc: "Track trial end date", on: false },
            { label: "Reminder", desc: "Notify 2 days before renewal", on: true },
          ].map((t) => (
            <div key={t.label} className="flex items-center justify-between rounded-xl px-3 py-2.5">
              <div>
                <p className="text-[12.5px] font-semibold text-foreground">{t.label}</p>
                <p className="text-[10.5px] text-muted-foreground">{t.desc}</p>
              </div>
              <div className={`relative h-6 w-10 rounded-full transition ${t.on ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${t.on ? "left-[18px]" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Notes</label>
          <textarea defaultValue="Family plan, shared with 4 members" rows={3} className="w-full resize-none rounded-xl border border-input bg-surface p-3 text-[12.5px] text-foreground outline-none" />
        </div>
      </div>
    </div>
  );
}

function ScreenPaywall() {
  const features = [
    { Icon: InfinityIcon, label: "Unlimited subscriptions", desc: "Track every service, no caps" },
    { Icon: BarChart3,    label: "Advanced analytics",       desc: "Categories, trends & forecasts" },
    { Icon: Bell,         label: "Smart reminders",          desc: "AI-powered renewal alerts" },
    { Icon: Cloud,        label: "Cloud sync & backup",      desc: "All devices, always in sync" },
    { Icon: Download,     label: "Export to CSV & PDF",      desc: "Yours to keep, anytime" },
    { Icon: Lock,         label: "Biometric app lock",       desc: "Face ID & Touch ID" },
    { Icon: Zap,          label: "Widgets & filtering",      desc: "At-a-glance home screen" },
  ];
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"><X size={16} /></button>
        <span className="text-[12px] font-medium text-muted-foreground">Premium</span>
        <button className="text-[11px] font-medium text-muted-foreground">Restore</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-5 text-foreground">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Crown size={11} /> Subly Premium
            </div>
            <h1 className="mt-3 text-[24px] font-bold leading-tight">Unlock everything.<br/>Forever.</h1>
            <p className="mt-2 text-[12px] opacity-70">One payment. No subscription. No ads.</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {features.map(({ Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[12.5px] font-semibold text-foreground">{label}</p>
                <p className="text-[10.5px] text-muted-foreground">{desc}</p>
              </div>
              <Check size={15} className="text-primary" strokeWidth={3} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-border bg-surface/60 px-5 pb-7 pt-4 backdrop-blur">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground line-through">$89.99</p>
            <p className="text-[22px] font-bold text-foreground">$39.99 <span className="text-[11px] font-medium text-muted-foreground">one-time</span></p>
          </div>
          <Pill tone="primary">Save 55%</Pill>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.6_0.16_152/0.7)]">
          <Crown size={16} /> Unlock Premium Forever
        </button>
        <p className="text-center text-[9.5px] text-muted-foreground">Secure payment · 14-day refund · No recurring charges</p>
      </div>
    </div>
  );
}

function ScreenSettings() {
  const groups = [
    {
      title: "Preferences",
      items: [
        { Icon: Moon, label: "Appearance", value: "System" },
        { Icon: Bell, label: "Notifications", value: "On" },
        { Icon: Wallet, label: "Currency", value: "USD $" },
        { Icon: Globe, label: "Language", value: "English" },
      ],
    },
    {
      title: "Security & Data",
      items: [
        { Icon: Lock, label: "App lock", value: "Face ID" },
        { Icon: Shield, label: "Privacy", value: "" },
        { Icon: Cloud, label: "Backup & sync", value: "iCloud" },
      ],
    },
    {
      title: "Account",
      items: [
        { Icon: User, label: "Account", value: "ava@email.com" },
        { Icon: Crown, label: "Manage Premium", value: "Active", badge: true },
      ],
    },
  ];
  return (
    <div className="flex h-full flex-col bg-background">
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-3 pt-1">
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">Settings</h1>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-4">
        {/* Profile */}
        <div className="flex items-center gap-3 rounded-2xl bg-surface p-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-bold">AB</div>
          <div className="flex-1">
            <p className="text-[13.5px] font-semibold text-foreground">Ava Bennett</p>
            <p className="text-[11px] text-muted-foreground">ava@email.com</p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
            <Crown size={10} /> PRO
          </div>
        </div>

        {/* Theme card */}
        <div className="rounded-2xl bg-surface p-3">
          <p className="mb-2 text-[11px] font-semibold text-muted-foreground">Appearance</p>
          <div className="flex gap-2">
            {[
              { Icon: Sun, label: "Light" },
              { Icon: Moon, label: "Dark", active: true },
              { Icon: Smartphone, label: "Auto" },
            ].map((t) => (
              <button key={t.label} className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 text-[11px] font-semibold ${t.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <t.Icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</p>
            <div className="space-y-px overflow-hidden rounded-2xl bg-surface">
              {g.items.map(({ Icon, label, value, badge }) => (
                <div key={label} className="flex items-center gap-3 px-3.5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground"><Icon size={14} /></div>
                  <span className="flex-1 text-[13px] font-medium text-foreground">{label}</span>
                  {value && (
                    badge
                      ? <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">{value}</span>
                      : <span className="text-[11.5px] text-muted-foreground">{value}</span>
                  )}
                  <ChevronRight size={14} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-surface py-3.5 text-[13px] font-semibold text-destructive">
          <LogOut size={14} /> Sign out
        </button>

        <p className="pt-1 text-center text-[10px] text-muted-foreground">Subly · v2.4.1</p>
      </div>

      <BottomNav active="settings" />
    </div>
  );
}

/* ---------- gallery ---------- */

const SCREENS: { key: string; label: string; render: () => ReactNode }[] = [
  { key: "welcome",  label: "1. Welcome",        render: () => <ScreenWelcome /> },
  { key: "signup",   label: "2. Sign Up",        render: () => <ScreenSignUp /> },
  { key: "dash",     label: "3. Dashboard",      render: () => <ScreenDashboard /> },
  { key: "list",     label: "4. Subscriptions",  render: () => <ScreenList /> },
  { key: "details",  label: "5. Details",        render: () => <ScreenDetails /> },
  { key: "add",      label: "6. Add / Edit",     render: () => <ScreenAdd /> },
  { key: "paywall",  label: "7. Paywall",        render: () => <ScreenPaywall /> },
  { key: "settings", label: "8. Settings",       render: () => <ScreenSettings /> },
];

function Index() {
  const [mode, setMode] = useState<"both" | "light" | "dark">("both");

  return (
    <div className="min-h-screen bg-[oklch(0.96_0.005_150)] dark:bg-[oklch(0.1_0.01_150)]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <div>
            <p className="text-[15px] font-bold tracking-tight text-foreground">Subly</p>
            <p className="text-[10.5px] text-muted-foreground">Subscription Tracker · Mobile UI</p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          {(["both", "light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Subly — a calmer way to manage subscriptions.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            A premium 8-screen mobile UI set for a subscription tracker. Same product, fully tuned for both light and dark.
          </p>
        </div>

        <div className="space-y-16">
          {SCREENS.map((s) => (
            <section key={s.key}>
              <div className="mb-5 flex items-baseline justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{s.label}</h2>
                <span className="text-xs text-muted-foreground">Light + Dark</span>
              </div>
              <div className="flex flex-wrap items-start justify-center gap-12 sm:justify-start">
                {(mode === "both" || mode === "light") && (
                  <Phone label="Light">{s.render()}</Phone>
                )}
                {(mode === "both" || mode === "dark") && (
                  <Phone label="Dark" dark>{s.render()}</Phone>
                )}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Designed with care · 8 screens · light & dark · production-ready tokens
        </footer>
      </main>
    </div>
  );
}
