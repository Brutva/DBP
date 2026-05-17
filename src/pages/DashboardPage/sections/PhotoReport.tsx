import { Camera } from "lucide-react";
import { Card, SectionHeading } from "@/src/components/ui";
import type { PhotoReportItem } from "@/src/data/types";

function PhotoCard({ photo }: { photo: PhotoReportItem }) {
  return (
    <div
      className="relative group overflow-hidden rounded-xl bg-[#1C2340] shadow-[0_1px_4px_rgba(28,35,64,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(28,35,64,0.22)]"
      style={{ aspectRatio: "4/3" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${photo.image})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1C2340]/30 via-transparent to-white/10" />

      <div className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 sm:p-4">
        <div className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
          {photo.date}
        </div>
        <p className="mt-2 text-sm font-semibold leading-tight text-white sm:text-base">
          {photo.label}
        </p>
      </div>

      <div className="absolute right-3 top-3 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          <Camera className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function PhotoReport({ photos }: { photos: PhotoReportItem[] }) {
  return (
    <Card className="p-4 sm:p-6">
      <SectionHeading icon={Camera} title="Фотоотчёт" count={photos.length} />

      <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </Card>
  );
}
