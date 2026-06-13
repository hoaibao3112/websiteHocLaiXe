import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

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
    <html lang="vi" className={`${beVietnamPro.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
