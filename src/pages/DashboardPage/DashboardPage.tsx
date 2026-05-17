import { Building2, CalendarDays } from "lucide-react";
import DocumentsSection from "./sections/DocumentsSection";
import PhotoReport from "./sections/PhotoReport";
import ProgressCard from "./components/ProgressCard";
import ProjectOverview from "./components/ProjectOverview";
import StatusEditor from "./components/StatusEditor";
import {
  BackgroundPattern,
  Card,
  CardTopStrip,
  PageFooter,
  PageHeader,
  SectionHeading,
} from "@/src/components/ui";
import { DOCUMENTS, PHOTOS, PROJECT } from "@/src/data/buildingPassportData";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8F7F4]">
      <BackgroundPattern />
      <PageHeader project={PROJECT} />

      <main className="mx-auto max-w-5xl space-y-4 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          <ProjectOverview project={PROJECT} />

          <Card className="overflow-hidden lg:col-span-2">
            <CardTopStrip variant="dark" />
            <div className="p-4 sm:p-6">
              <SectionHeading icon={CalendarDays} title="Управление статусом" />
              <StatusEditor initialStatus={PROJECT.status} />
            </div>
          </Card>
        </div>

        <Card className="p-4 sm:p-6">
          <SectionHeading icon={Building2} title="Ход строительства" />
          <ProgressCard />
        </Card>

        <DocumentsSection documents={DOCUMENTS} />
        <PhotoReport photos={PHOTOS} />
        <PageFooter />
      </main>
    </div>
  );
}
