import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trường Lái Xe Chiến Thắng — Đào tạo lái xe uy tín",
    template: "%s | Trường Lái Xe Chiến Thắng",
  },
  description:
    "Trường lái xe Chiến Thắng — đào tạo lái xe hạng B1, B2, C uy tín tại [Địa điểm]. Giáo viên kinh nghiệm, tỉ lệ đậu cao, hỗ trợ thi lại.",
  keywords: [
    "trường lái xe",
    "học lái xe",
    "bằng lái xe B2",
    "đào tạo lái xe",
    "Chiến Thắng",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Trường Lái Xe Chiến Thắng",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
