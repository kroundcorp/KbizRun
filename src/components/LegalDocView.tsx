'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  LegalDocType,
  LegalDocVersion,
  getCurrentDoc,
  getDocByVersion,
  getDocVersions,
} from '../data/terms';

type Block =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'hr' }
  | { kind: 'p'; text: string }
  | { kind: 'ol'; items: string[] };

function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (/^-{3,}$/.test(line.trim())) {
      blocks.push({ kind: 'hr' });
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push({ kind: 'h1', text: line.slice(2).trim() });
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h2', text: line.slice(3).trim() });
      i++;
      continue;
    }

    const listMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (listMatch) {
      const items: string[] = [];
      let current = listMatch[2];
      i++;
      while (i < lines.length) {
        const next = lines[i];
        if (next.trim() === '') {
          if (i + 1 < lines.length) {
            const peek = lines[i + 1];
            const nextListMatch = peek.match(/^(\d+)\.\s+(.*)$/);
            const isContinuation = /^\s{4,}\S/.test(peek);
            if (nextListMatch || isContinuation) {
              i++;
              continue;
            }
          }
          break;
        }
        const nextListMatch = next.match(/^(\d+)\.\s+(.*)$/);
        if (nextListMatch) {
          items.push(current.trim());
          current = nextListMatch[2];
          i++;
          continue;
        }
        if (/^\s{4,}\S/.test(next)) {
          current += ' ' + next.trim();
          i++;
          continue;
        }
        break;
      }
      items.push(current.trim());
      blocks.push({ kind: 'ol', items });
      continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (
        next.trim() === '' ||
        next.startsWith('# ') ||
        next.startsWith('## ') ||
        /^-{3,}$/.test(next.trim()) ||
        /^(\d+)\.\s+/.test(next)
      ) {
        break;
      }
      paraLines.push(next);
      i++;
    }
    blocks.push({ kind: 'p', text: paraLines.join(' ').trim() });
  }

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-bold">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export function LegalDocContent({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);
  return (
    <div className="space-y-4 text-[15px] leading-7 text-gray-800">
      {blocks.map((block, idx) => {
        switch (block.kind) {
          case 'h1':
            return (
              <h2
                key={idx}
                className="text-xl font-bold text-gray-900 mt-10 mb-3 pb-2 border-b border-gray-200"
              >
                {block.text}
              </h2>
            );
          case 'h2':
            return (
              <h3 key={idx} className="text-base font-bold text-gray-900 mt-6 mb-2">
                {block.text}
              </h3>
            );
          case 'hr':
            return <hr key={idx} className="my-6 border-gray-200" />;
          case 'p':
            return (
              <p key={idx} className="whitespace-pre-wrap">
                {renderInline(block.text)}
              </p>
            );
          case 'ol':
            return (
              <ol
                key={idx}
                className="list-decimal pl-6 space-y-2 marker:text-gray-500"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

interface LegalDocViewProps {
  docType: LegalDocType;
  version?: string;
  onVersionChange?: (version: string) => void;
  showVersionSelector?: boolean;
}

export default function LegalDocView({
  docType,
  version,
  onVersionChange,
  showVersionSelector = true,
}: LegalDocViewProps) {
  const selected =
    (version ? getDocByVersion(docType, version) : undefined) ??
    getCurrentDoc(docType);
  const versions = getDocVersions(docType);

  const [raw, setRaw] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(selected.mdPath)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => setRaw(text))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [selected.mdPath]);

  return (
    <div>
      {showVersionSelector && versions.length > 1 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">버전</span>
          <select
            value={selected.version}
            onChange={(e) => onVersionChange?.(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {versions.map((v) => (
              <option key={v.version} value={v.version}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 py-12">불러오는 중…</div>
      )}
      {error && (
        <div className="text-center text-red-600 py-12">
          문서를 불러오지 못했습니다: {error}
        </div>
      )}
      {!loading && !error && <LegalDocContent markdown={raw} />}
    </div>
  );
}

export { LegalDocView };
export type { LegalDocViewProps };
