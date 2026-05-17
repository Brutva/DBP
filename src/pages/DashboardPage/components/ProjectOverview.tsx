import { Building2, CalendarCheck, CalendarDays, MapPin } from "lucide-react";
import { Card, CardTopStrip, MetaItem } from "@/src/components/ui";
import type { Project } from "@/src/data/types";

export default function ProjectOverview({ project }: { project: Project }) {
  const stats = [
    { label: "Этажей", value: project.floors },
    { label: "Площадь", value: project.area },
    { label: "Кадастровый №", value: project.cadastral },
  ];

  return (
    <Card className="overflow-hidden lg:col-span-3">
      <CardTopStrip />
      <div className="p-4 sm:p-6">
        <div className="mb-5 flex flex-col items-start justify-between gap-4 min-[420px]:flex-row">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8B90A4]">
              Объект строительства
            </p>
            <h1 className="break-words text-lg font-bold leading-tight text-[#1C2340] font-display sm:text-xl">
              {project.name}
            </h1>
          </div>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C4622D] to-[#E8845A] shadow-[0_4px_12px_rgba(196,98,45,0.3)]">
            <Building2 className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MetaItem icon={MapPin} label="Адрес" value={project.address} />
          <MetaItem icon={Building2} label="Застройщик" value={project.developer} />
          <MetaItem icon={CalendarDays} label="Дата начала" value={project.startDate} />
          <MetaItem icon={CalendarCheck} label="Плановое завершение" value={project.completionDate} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#F2F0EC] pt-4 min-[420px]:grid-cols-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0 rounded-xl bg-[#F8F7F4] px-3 py-2 min-[420px]:bg-transparent min-[420px]:p-0">
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#8B90A4]">
                {stat.label}
              </p>
              <p className="break-words text-sm font-semibold text-[#1C2340] font-mono">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
