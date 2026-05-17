import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Download, MapPin } from "lucide-react";
import HeaderBrand from "@/src/components/Header/Header";
import { StatusBadge } from "@/src/pages/DashboardPage/components/StatusEditor";
import type { Project } from "@/src/data/types";

export function BackgroundPattern() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-[0.025]"
      style={{
        backgroundImage: "radial-gradient(circle, #1C2340 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E4E1DA] shadow-[0_1px_3px_rgba(28,35,64,0.06),0_4px_16px_rgba(28,35,64,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CardTopStrip({ variant = "accent" }: { variant?: "accent" | "dark" }) {
  const background =
    variant === "dark"
      ? "linear-gradient(90deg, #1C2340 0%, #2A3560 50%, #4A5890 100%)"
      : "linear-gradient(90deg, #C4622D 0%, #E8845A 50%, #F5C89A 100%)";

  return <div className="h-1 w-full" style={{ background }} />;
}

export function SectionHeading({
  icon: Icon,
  title,
  count,
}: {
  icon: LucideIcon;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-5">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F5E6DC]">
        <Icon className="h-4 w-4 text-[#C4622D]" />
      </div>
      <h2 className="min-w-0 flex-1 text-sm font-semibold text-[#1C2340] sm:text-base">
        {title}
      </h2>
      {count !== undefined && (
        <span className="text-xs font-semibold text-[#8B90A4] bg-[#F2F0EC] px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

export function MetaItem({
  icon: Icon = MapPin,
  label,
  value,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#F2F0EC]">
        <Icon className="h-3.5 w-3.5 text-[#8B90A4]" />
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#8B90A4] leading-none">
          {label}
        </p>
        <p className="break-words text-sm font-medium text-[#1C2340] leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}

export function PageHeader({ project }: { project: Project }) {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E4E1DA]">
      <div
        className="absolute bottom-0 left-0 h-[2px] w-24"
        style={{ background: "linear-gradient(90deg, #C4622D, #E8845A, transparent)" }}
      />
      <div className="mx-auto flex min-h-14 max-w-5xl items-center gap-2 px-3 py-2 sm:gap-4 sm:px-6">
        <HeaderBrand project={project} />

        <div className="flex-1" />

        <div className="min-w-0 flex-shrink">
          <StatusBadge status={project.status} />
        </div>

        <button className="flex h-10 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1C2340] px-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2A3560] sm:h-auto sm:px-4 sm:py-2">
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Экспорт PDF</span>
        </button>
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <div className="flex flex-col items-center justify-between gap-1 py-4 text-center text-xs text-[#8B90A4] sm:flex-row sm:text-left">
      <span>ЦСП · Версия 1.0.0</span>
      <span>Последнее обновление: 14 мая 2026</span>
    </div>
  );
}
