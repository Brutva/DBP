import { HardHat } from "lucide-react";
import type { Project } from "@/src/data/types";

export default function HeaderBrand({ project }: { project: Project }) {
  return (
    <div className="flex min-w-0 flex-shrink items-center gap-2.5 sm:gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1C2340] sm:h-9 sm:w-9">
        <HardHat className="h-4 w-4 text-[#E8845A]" />
      </div>

      <div className="hidden min-w-0 sm:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8B90A4] leading-none">
          Цифровой строительный паспорт
        </p>
        <p className="max-w-[38vw] truncate text-sm font-bold text-[#1C2340] leading-tight font-display lg:max-w-none">
          {project.name}
        </p>
      </div>

      <p className="sm:hidden text-sm font-bold text-[#1C2340]">ЦСП</p>
    </div>
  );
}
