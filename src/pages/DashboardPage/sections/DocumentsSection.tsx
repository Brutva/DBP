import { CheckCircle2, Clock, FileText, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, SectionHeading } from "@/src/components/ui";
import type { DocStatus, ProjectDocument } from "@/src/data/types";

const DOC_STATUS_CONFIG: Record<
  DocStatus,
  { icon: LucideIcon; color: string; bg: string; border: string }
> = {
  Проверен: {
    icon: CheckCircle2,
    color: "text-[#1E6B3C]",
    bg: "bg-[#E6F4EC]",
    border: "border-[#2D9B57]/20",
  },
  "На проверке": {
    icon: Clock,
    color: "text-[#8B5E00]",
    bg: "bg-[#FFF3D4]",
    border: "border-[#D4A017]/20",
  },
  Отклонён: {
    icon: XCircle,
    color: "text-[#9B1C1C]",
    bg: "bg-[#FEE8E8]",
    border: "border-[#E53E3E]/20",
  },
};

function DocumentStatusBadge({ status }: { status: DocStatus }) {
  const cfg = DOC_STATUS_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

function MobileDocumentCard({ doc }: { doc: ProjectDocument }) {
  return (
    <div className="rounded-xl border border-[#E4E1DA] bg-[#F8F7F4] p-3">
      <div className="flex flex-col gap-2 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between">
        <div className="min-w-0">
          <p className="break-words text-sm font-medium leading-snug text-[#1C2340]">
            {doc.title}
          </p>
          <p className="mt-0.5 text-xs text-[#8B90A4]">
            {doc.type} · {doc.date}
          </p>
        </div>
        <div className="flex-shrink-0 self-start">
          <DocumentStatusBadge status={doc.status} />
        </div>
      </div>
    </div>
  );
}

function DocumentsTable({ documents }: { documents: ProjectDocument[] }) {
  return (
    <div className="hidden overflow-x-auto md:block md:-mx-6">
      <table className="w-full min-w-[720px]">
        <thead>
          <tr className="border-b border-[#F2F0EC]">
            {["Название", "Тип", "Дата загрузки", "Статус"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8B90A4] lg:px-6"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F2F0EC]">
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="group transition-colors duration-150 hover:bg-[#F8F7F4]"
            >
              <td className="px-4 py-4 lg:px-6">
                <span className="text-sm font-medium text-[#1C2340]">
                  {doc.title}
                </span>
              </td>
              <td className="px-4 py-4 lg:px-6">
                <span className="text-sm text-[#4A5068]">{doc.type}</span>
              </td>
              <td className="px-4 py-4 lg:px-6">
                <span className="text-sm font-mono text-[#8B90A4]">
                  {doc.date}
                </span>
              </td>
              <td className="px-4 py-4 lg:px-6">
                <DocumentStatusBadge status={doc.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocumentsSection({ documents }: { documents: ProjectDocument[] }) {
  return (
    <Card className="p-4 sm:p-6">
      <SectionHeading icon={FileText} title="Документация" count={documents.length} />

      <div className="space-y-3 md:hidden">
        {documents.map((doc) => (
          <MobileDocumentCard key={doc.id} doc={doc} />
        ))}
      </div>

      <DocumentsTable documents={documents} />
    </Card>
  );
}
