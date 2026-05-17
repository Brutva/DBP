import type {
  Milestone,
  Phase,
  PhotoReportItem,
  Project,
  ProjectDocument,
} from "@/src/data/types";

export const PROJECT: Project = {
  name: "ЖК «Северная Звезда»",
  address: "г. Москва, ул. Академика Королёва, 12",
  developer: "ГК «СтройИнвест»",
  startDate: "15 марта 2023",
  completionDate: "30 июня 2026",
  status: "Строится",
  cadastral: "77:02:0010001:1234",
  area: "38 400 м²",
  floors: "24",
};

export const DOCUMENTS: ProjectDocument[] = [
  {
    id: 1,
    title: "Проектная документация",
    type: "Проект",
    date: "12.01.2023",
    status: "Проверен",
  },
  {
    id: 2,
    title: "Разрешение на строительство",
    type: "Разрешение",
    date: "28.02.2023",
    status: "Проверен",
  },
  {
    id: 3,
    title: "Технический план",
    type: "Технический",
    date: "05.06.2023",
    status: "Проверен",
  },
  {
    id: 4,
    title: "Акт освидетельствования",
    type: "Акт",
    date: "14.09.2023",
    status: "На проверке",
  },
  {
    id: 5,
    title: "Договор подряда",
    type: "Договор",
    date: "03.11.2023",
    status: "На проверке",
  },
  {
    id: 6,
    title: "Экологическая экспертиза",
    type: "Экспертиза",
    date: "20.01.2024",
    status: "Отклонён",
  },
];

export const PHOTOS: PhotoReportItem[] = [
  {
    id: 1,
    label: "Фундамент",
    image: "/photo-report/foundation.png",
    date: "март 2023",
    gradient: "linear-gradient(150deg, #3D4F3A 0%, #5B7A52 45%, #A89472 100%)",
    accent: "rgba(90,122,82,0.4)",
  },
  {
    id: 2,
    label: "Каркас",
    image: "/photo-report/frame.png",
    date: "июнь 2023",
    gradient: "linear-gradient(150deg, #1E2E4A 0%, #2E4A6E 45%, #7A9BB8 100%)",
    accent: "rgba(46,74,110,0.4)",
  },
  {
    id: 3,
    label: "Фасад",
    image: "/photo-report/facade.png",
    date: "март 2024",
    gradient: "linear-gradient(150deg, #5A3A1A 0%, #9B6A3A 45%, #D4A86A 100%)",
    accent: "rgba(155,106,58,0.4)",
  },
  {
    id: 4,
    label: "Кровля",
    image: "/photo-report/roof.png",
    date: "октябрь 2024",
    gradient: "linear-gradient(150deg, #2A1A3A 0%, #4A2E6A 45%, #8A6AA0 100%)",
    accent: "rgba(74,46,106,0.4)",
  },
  {
    id: 5,
    label: "Фасадные работы",
    image: "/photo-report/facade-works.png",
    date: "апрель 2025",
    gradient: "linear-gradient(150deg, #1A3A3A 0%, #2A6A5A 45%, #5AA890 100%)",
    accent: "rgba(42,106,90,0.4)",
  },
  {
    id: 6,
    label: "Внутренняя отделка",
    image: "/photo-report/interior-finishing.png",
    date: "декабрь 2025",
    gradient: "linear-gradient(150deg, #3A2A1A 0%, #7A5A3A 45%, #C49A6A 100%)",
    accent: "rgba(122,90,58,0.4)",
  },
];

export const OVERALL_PROGRESS = 82;

export const PHASES: Phase[] = [
  { label: "Фундамент", percent: 100, color: "#2D9B57" },
  { label: "Каркас", percent: 100, color: "#2D9B57" },
  { label: "Фасад", percent: 100, color: "#2D9B57" },
  { label: "Внутренняя отделка", percent: 55, color: "#D4A017" },
];

export const MILESTONES: Milestone[] = [
  { label: "Проектирование завершено", date: "фев 2023", done: true },
  { label: "Фундамент сдан", date: "май 2023", done: true },
  { label: "Каркас возведён", date: "ноя 2023", done: true },
  { label: "Фасад завершён", date: "апр 2025", done: true },
  {
    label: "Внутренняя отделка",
    date: "дек 2025",
    done: false,
    current: true,
  },
  { label: "Сдача объекта", date: "июн 2026", done: false },
];