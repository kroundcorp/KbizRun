export type LegalDocType = 'terms' | 'privacy' | 'marketing';

export interface LegalDocVersion {
  docType: LegalDocType;
  version: string;
  effectiveDate: string;
  label: string;
  mdPath: string;
  isCurrent: boolean;
}

export const legalDocTitles: Record<LegalDocType, string> = {
  terms: '이용약관',
  privacy: '개인정보 수집 및 이용 동의',
  marketing: '마케팅 정보 수신 동의',
};

export const termsVersions: LegalDocVersion[] = [
  {
    docType: 'terms',
    version: '2026-04-01',
    effectiveDate: '2026년 4월 1일',
    label: '2026.04.01 시행 (현행)',
    mdPath: '/terms/terms-2026-04-01.md',
    isCurrent: true,
  },
];

export const privacyVersions: LegalDocVersion[] = [
  {
    docType: 'privacy',
    version: '2026-04-01',
    effectiveDate: '2026년 4월 1일',
    label: '2026.04.01 시행 (현행)',
    mdPath: '/terms/privacy-2026-04-01.md',
    isCurrent: true,
  },
];

export const marketingVersions: LegalDocVersion[] = [
  {
    docType: 'marketing',
    version: '2026-04-01',
    effectiveDate: '2026년 4월 1일',
    label: '2026.04.01 시행 (현행)',
    mdPath: '/terms/marketing-2026-04-01.md',
    isCurrent: true,
  },
];

export function getDocVersions(type: LegalDocType): LegalDocVersion[] {
  switch (type) {
    case 'terms':
      return termsVersions;
    case 'privacy':
      return privacyVersions;
    case 'marketing':
      return marketingVersions;
  }
}

export function getCurrentDoc(type: LegalDocType): LegalDocVersion {
  const list = getDocVersions(type);
  return list.find((v) => v.isCurrent) ?? list[0];
}

export function getDocByVersion(
  type: LegalDocType,
  version: string
): LegalDocVersion | undefined {
  return getDocVersions(type).find((v) => v.version === version);
}

// Backward-compat aliases for existing imports
export const getCurrentTerms = () => getCurrentDoc('terms');
export const getTermsByVersion = (version: string) =>
  getDocByVersion('terms', version);
