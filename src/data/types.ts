export type ProjectStatus =
  | "В проектировании"
  | "Строится"
  | "Приостановлен"
  | "Сдан";

export type DocStatus = "Проверен" | "На проверке" | "Отклонён";

export interface Project {
  name: string;
  address: string;
  developer: string;
  startDate: string;
  completionDate: string;
  status: ProjectStatus;
  cadastral: string;
  area: string;
  floors: string;
}

export interface ProjectDocument {
  id: number;
  title: string;
  type: string;
  date: string;
  status: DocStatus;
}

export interface PhotoReportItem {
  id: number;
  label: string;
  date: string;
  image: string;
  gradient: string;
  accent: string;
}

export interface Phase {
  label: string;
  percent: number;
  color: string;
}

export interface Milestone {
  label: string;
  date: string;
  done: boolean;
  current?: boolean;
}
