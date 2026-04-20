'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { LegalDocType, legalDocTitles, getCurrentDoc } from '../data/terms';
import LegalDocView from './LegalDocView';

interface LegalDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: LegalDocType;
}

export default function LegalDocModal({
  isOpen,
  onClose,
  docType,
}: LegalDocModalProps) {
  const [version, setVersion] = useState<string>(getCurrentDoc(docType).version);

  useEffect(() => {
    if (isOpen) {
      setVersion(getCurrentDoc(docType).version);
    }
  }, [isOpen, docType]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-[720px] overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                {legalDocTitles[docType]}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-6">
              <LegalDocView
                docType={docType}
                version={version}
                onVersionChange={setVersion}
              />
            </div>

            <div className="border-t border-gray-100 px-6 py-3 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-900 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                확인
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
