import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЦСП — Цифровой строительный паспорт",
  description: "Цифровой строительный паспорт объекта",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
