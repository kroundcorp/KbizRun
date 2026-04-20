import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from '../src/components/SiteChrome';

export const metadata: Metadata = {
  title: 'K-Biz Run | 공공조달관리사 LMS',
  description:
    '34년 조달 전문가가 직접 검수한 콘텐츠로 공공조달관리사 자격증 시험을 대비하세요. 기출·모의고사·AI 튜터·1:1 멘토링 제공.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f8f9fa] font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
