'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Pencil,
  GraduationCap,
  User as UserIcon,
  Heart,
  Ticket,
  FileText,
  Package,
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

function getNickname(email: string | undefined | null) {
  if (!email) return '수험생';
  return email.split('@')[0];
}

function getAvatarUrl(email: string | undefined | null) {
  const seed = email ?? 'kbizrun';
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=eef2ff&textColor=2563eb`;
}

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  if (!user) return null;

  const nickname = getNickname(user.email);
  const avatarUrl = getAvatarUrl(user.email);

  const gridItems = [
    { icon: <GraduationCap className="h-6 w-6" />, label: '내 강의실', href: '/mypage' },
    { icon: <UserIcon className="h-6 w-6" />, label: '프로필', href: '/mypage' },
    { icon: <Heart className="h-6 w-6" />, label: '찜한 교재', href: '/mypage' },
    { icon: <Ticket className="h-6 w-6" />, label: '쿠폰', href: '/mypage', badge: 0 },
    { icon: <FileText className="h-6 w-6" />, label: '이용 가이드', href: '/community' },
    { icon: <Package className="h-6 w-6" />, label: '내 주문', href: '/mypage', badge: 0 },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="유저 메뉴"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full hover:bg-gray-50 p-1 transition-colors"
      >
        <img
          src={avatarUrl}
          alt={nickname}
          className="h-9 w-9 rounded-full border border-gray-200 bg-gray-100 object-cover"
        />
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[340px] rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="pt-6 pb-5 flex flex-col items-center">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={nickname}
                className="h-20 w-20 rounded-full border border-gray-200 bg-gray-100 object-cover"
              />
              <Link
                href="/mypage"
                onClick={() => setOpen(false)}
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                aria-label="프로필 편집"
              >
                <Pencil className="h-3.5 w-3.5 text-gray-700" />
              </Link>
            </div>
            <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
              수험생
            </span>
            <p className="mt-2 text-[15px] font-bold text-gray-900 max-w-[260px] truncate">
              {nickname}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-y-5 px-5 pb-5">
            {gridItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
              >
                <span className="text-gray-900 group-hover:text-blue-600">{item.icon}</span>
                <span className="text-[13px] font-medium">
                  {item.label}
                  {typeof item.badge === 'number' && (
                    <span className="ml-1 text-red-500 font-semibold">{item.badge}건</span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 text-[13px] text-gray-700">
            <Link
              href="/community"
              onClick={() => setOpen(false)}
              className="py-3.5 text-center hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              공지사항
            </Link>
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="py-3.5 text-center hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              이벤트
            </Link>
            <button
              type="button"
              onClick={async () => {
                setOpen(false);
                await signOut();
              }}
              className="py-3.5 text-center hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
