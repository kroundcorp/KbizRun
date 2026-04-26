'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  getCurrentDoc,
  getDocByVersion,
  getDocVersions,
  legalDocTitles,
  type LegalDocType,
} from '../data/terms';
import LegalDocView from '../components/LegalDocView';

const DOC_TYPES: LegalDocType[] = ['terms', 'privacy', 'marketing'];

export default function Terms() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedDoc = searchParams.get('doc') as LegalDocType | null;
  const docType: LegalDocType = requestedDoc && DOC_TYPES.includes(requestedDoc) ? requestedDoc : 'terms';
  const currentDoc = getCurrentDoc(docType);
  const versions = getDocVersions(docType);
  const selectedVersion =
    searchParams.get('version') ?? currentDoc.version;
  const doc = getDocByVersion(docType, selectedVersion) ?? currentDoc;

  const handleVersionChange = (v: string) => {
    const query = new URLSearchParams();
    if (docType !== 'terms') query.set('doc', docType);
    if (v !== currentDoc.version) query.set('version', v);
    const qs = query.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleDocChange = (nextDoc: LegalDocType) => {
    if (nextDoc === 'terms') {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}?doc=${nextDoc}`);
    }
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{legalDocTitles[docType]}</h1>
        <p className="mt-2 text-sm text-gray-500">
          시행일: {doc.effectiveDate}
          {doc.isCurrent ? (
            <span className="ml-2 inline-flex items-center bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
              현행
            </span>
          ) : (
            <span className="ml-2 inline-flex items-center bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded">
              이전 버전
            </span>
          )}
        </p>
      </header>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-gray-800 mb-1">문서 및 버전 선택</div>
          <div className="text-xs text-gray-500">
            법적 문서가 개정되더라도 이전 버전을 계속 확인할 수 있습니다.
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            value={docType}
            onChange={(e) => handleDocChange(e.target.value as LegalDocType)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[220px]"
          >
            {DOC_TYPES.map((type) => (
              <option key={type} value={type}>
                {legalDocTitles[type]}
              </option>
            ))}
          </select>
          <select
            value={selectedVersion}
            onChange={(e) => handleVersionChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[220px]"
          >
            {versions.map((v) => (
              <option key={v.version} value={v.version}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <article className="bg-white border border-gray-200 rounded-lg p-8">
        <LegalDocView
          docType={docType}
          version={selectedVersion}
          showVersionSelector={false}
        />
      </article>

      <div className="mt-8 text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>
          본 약관과 관련하여 문의사항이 있으신 경우 고객센터(1600-5933) 또는 contact@kbizrun.com 으로 연락 부탁드립니다.
        </p>
      </div>
    </main>
  );
}
