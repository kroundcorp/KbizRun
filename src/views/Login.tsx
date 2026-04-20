'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Info,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import {
  validateEmail,
  checkExistingEmail,
  providerLabel,
} from '../lib/validation';

export default function Login() {
  const router = useRouter();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const emailResult = useMemo(() => validateEmail(email), [email]);
  const canSubmit = emailResult.valid && password.length > 0 && !submitting;

  const handleSocial = () => {
    setNotice('소셜 로그인은 현재 준비중입니다. 이메일로 로그인해 주세요.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setNotice(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    const provider = checkExistingEmail(email);
    if (provider && provider !== 'email') {
      setSubmitting(false);
      setNotice(
        `이 이메일은 ${providerLabel[provider]}로 가입되어 있어요. ${providerLabel[provider]}로 로그인해 주세요.`,
      );
      return;
    }
    setSubmitting(false);
    router.push('/');
  };

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px] bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-10">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="K-Biz Run" className="h-8 mx-auto mb-5" />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">반가워요! 다시 오셨네요</h1>
          <p className="text-gray-500 mt-2 text-[15px]">로그인하고 합격 준비를 이어가세요</p>
        </div>

        {!showEmailForm ? (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSocial}
              className="w-full bg-[#FEE500] text-[#3c1e1e] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#fdd835] transition-all active:scale-[0.98]"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="h-5 w-5" />
              카카오톡으로 로그인
            </button>
            <button
              type="button"
              onClick={handleSocial}
              className="w-full bg-[#03C75A] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#02b350] transition-all active:scale-[0.98]"
            >
              <div className="bg-white text-[#03C75A] w-5 h-5 flex items-center justify-center font-black text-xs rounded-sm">N</div>
              네이버로 로그인
            </button>
            <button
              type="button"
              onClick={handleSocial}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="h-5 w-5" />
              구글로 로그인
            </button>

            {notice && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2 text-[13px] text-blue-800">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{notice}</span>
              </div>
            )}

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-400 font-medium uppercase tracking-wider">또는</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setNotice(null);
                setShowEmailForm(true);
              }}
              className="w-full bg-gray-50 text-gray-600 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98]"
            >
              <Mail className="h-5 w-5" />
              이메일로 로그인
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => {
                setShowEmailForm(false);
                setNotice(null);
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> 뒤로가기
            </button>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <Field
                label="이메일"
                error={touched.email && !emailResult.valid ? emailResult.message ?? '이메일을 입력해주세요.' : undefined}
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ email: true })}
                  className={inputCls(touched.email && !emailResult.valid)}
                  autoComplete="email"
                />
              </Field>

              <Field label="비밀번호">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputCls(false)} pr-12`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </Field>

              {notice && (
                <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2 text-[13px] text-blue-800">
                  <Info className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{notice}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  canSubmit
                    ? 'bg-[#2563eb] text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/20'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                로그인
              </button>

              <div className="flex justify-center gap-4 text-sm text-gray-500">
                <button type="button" className="hover:text-gray-800">아이디 찾기</button>
                <span className="text-gray-200">|</span>
                <button type="button" className="hover:text-gray-800">비밀번호 찾기</button>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-[14px] mt-8 pt-6 border-t border-gray-100">
          <span className="text-gray-500">아직 회원이 아니신가요?</span>
          <Link href="/signup" className="ml-2 text-blue-600 font-bold hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <div className="relative">{children}</div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full h-[52px] pl-12 pr-4 rounded-2xl border text-[15px] placeholder:text-gray-400 bg-gray-50 focus:outline-none transition-all ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-red-50/30'
      : 'border-gray-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100'
  }`;
}
