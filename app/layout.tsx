import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from '../src/components/SiteChrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://kbizrun.com'),
  title: {
    default: 'K-Biz Run | 공공조달관리사 LMS',
    template: '%s | K-Biz Run',
  },
  description:
    '34년 조달 전문가가 직접 검수한 콘텐츠로 공공조달관리사 자격증 시험을 대비하세요. 기출·모의고사·AI 튜터·1:1 멘토링 제공.',
  keywords: ['공공조달관리사', '공공조달', 'LMS', '자격증', '기출문제', 'K-Biz Run', 'kbizrun'],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://kbizrun.com',
    siteName: 'K-Biz Run',
    title: 'K-Biz Run | 공공조달관리사 LMS',
    description:
      '34년 조달 전문가가 직접 검수한 콘텐츠로 공공조달관리사 자격증 시험을 대비하세요.',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'K-Biz Run | 공공조달관리사 LMS',
    description: '34년 조달 전문가가 직접 검수한 공공조달관리사 합격 솔루션',
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
