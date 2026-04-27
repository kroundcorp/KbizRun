'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  AlertCircle,
  Info,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LegalDocModal from './LegalDocModal';
import type { LegalDocType } from '../data/terms';
import {
  validateEmail,
  validateName,
  evaluatePassword,
  isPasswordStrong,
  validatePasswordConfirm,
  checkExistingEmail,
  providerLabel,
  validatePhone,
  formatPhone,
  validateSmsCode,
  DEMO_SMS_CODE,
  SMS_CODE_LENGTH,
  SMS_TIMEOUT_SEC,
  type AuthProvider,
} from '../lib/validation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

type Touched = {
  name: boolean;
  email: boolean;
  phone: boolean;
  smsCode: boolean;
  password: boolean;
  confirm: boolean;
};

const initialTouched: Touched = {
  name: false,
  email: false,
  phone: false,
  smsCode: false,
  password: false,
  confirm: false,
};

type SmsStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'expired';

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // SMS 본인인증 (Phase 1 데모 — Phase 2에서 실 SMS API 연동)
  const [smsCode, setSmsCode] = useState('');
  const [smsStatus, setSmsStatus] = useState<SmsStatus>('idle');
  const [smsTimer, setSmsTimer] = useState(0);
  const [smsError, setSmsError] = useState<string | null>(null);

  const [touched, setTouched] = useState<Touched>(initialTouched);
  const [submitting, setSubmitting] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  // Terms states
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [legalDocToView, setLegalDocToView] = useState<LegalDocType | null>(
    null
  );

  const resetFormState = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('');
    setSmsCode('');
    setSmsStatus('idle');
    setSmsTimer(0);
    setSmsError(null);
    setTouched(initialTouched);
    setSubmitting(false);
    setSubmitNotice(null);
    setAgreements({ all: false, terms: false, privacy: false, marketing: false });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  useEffect(() => {
    setMode(initialMode);
    setShowEmailForm(false);
    if (isOpen) resetFormState();
  }, [initialMode, isOpen]);

  // SMS 타이머 (1초 간격 카운트다운)
  useEffect(() => {
    if (smsStatus !== 'sent' && smsStatus !== 'verifying') return;
    if (smsTimer <= 0) {
      setSmsStatus('expired');
      setSmsError('인증 시간이 만료됐어요. 다시 받아주세요.');
      return;
    }
    const id = window.setTimeout(() => setSmsTimer((t) => t - 1), 1000);
    return () => window.clearTimeout(id);
  }, [smsStatus, smsTimer]);

  // Validation derived state
  const emailResult = useMemo(() => validateEmail(email), [email]);
  const nameResult = useMemo(() => validateName(name), [name]);
  const phoneResult = useMemo(() => validatePhone(phone), [phone]);
  const smsCodeResult = useMemo(() => validateSmsCode(smsCode), [smsCode]);
  const pwChecks = useMemo(() => evaluatePassword(password), [password]);
  const pwStrong = useMemo(() => isPasswordStrong(password), [password]);
  const confirmResult = useMemo(
    () => validatePasswordConfirm(password, confirmPassword),
    [password, confirmPassword]
  );

  // A안 중복 이메일 체크 (mock)
  const existingProvider: AuthProvider | null = useMemo(() => {
    if (!emailResult.valid) return null;
    return checkExistingEmail(email);
  }, [email, emailResult.valid]);

  const isSignupBlockingConflict =
    mode === 'signup' && existingProvider !== null;

  const canSubmit = (() => {
    if (submitting) return false;
    if (mode === 'login') {
      return emailResult.valid && password.length > 0;
    }
    // signup
    return (
      nameResult.valid &&
      emailResult.valid &&
      phoneResult.valid &&
      smsStatus === 'verified' &&
      pwStrong &&
      confirmResult.valid &&
      agreements.terms &&
      agreements.privacy &&
      !isSignupBlockingConflict
    );
  })();

  if (!isOpen) return null;

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setShowEmailForm(false);
    resetFormState();
  };

  const handleBack = () => {
    setShowEmailForm(false);
    setSubmitNotice(null);
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    if (key === 'all') {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        terms: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    } else {
      const next = { ...agreements, [key]: !agreements[key] };
      next.all = next.terms && next.privacy && next.marketing;
      setAgreements(next);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitNotice(null);
    setSubmitting(true);

    // Phase 2에서 실제 API 호출로 교체
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (mode === 'login') {
      const p = checkExistingEmail(email);
      if (p && p !== 'email') {
        setSubmitting(false);
        setSubmitNotice(
          `이 이메일은 ${providerLabel[p]}로 가입되어 있어요. ${providerLabel[p]}로 로그인해 주세요.`
        );
        return;
      }
      // 데모: 로그인 성공 처리
      setSubmitting(false);
      onClose();
      return;
    }

    // signup
    if (existingProvider) {
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    onClose();
  };

  const handleSocialDemo = () => {
    setSubmitNotice(
      '소셜 로그인은 현재 준비중입니다. 이메일로 로그인해 주세요.'
    );
  };

  // --- SMS 인증 (Phase 1 데모) ---
  // Phase 2에서 외부 SMS 업체(NHN TOAST / 알리고 / CoolSMS) API 호출로 교체.

  const handleRequestSms = async () => {
    if (!phoneResult.valid || smsStatus === 'sending') return;
    setSmsError(null);
    setSmsCode('');
    setSmsStatus('sending');
    await new Promise((r) => setTimeout(r, 600));
    setSmsStatus('sent');
    setSmsTimer(SMS_TIMEOUT_SEC);
  };

  const handleVerifySms = async () => {
    if (!smsCodeResult.valid || smsStatus === 'verifying') return;
    setSmsError(null);
    setSmsStatus('verifying');
    await new Promise((r) => setTimeout(r, 500));
    if (smsCode === DEMO_SMS_CODE) {
      setSmsStatus('verified');
      setSmsTimer(0);
      return;
    }
    setSmsStatus('sent');
    setSmsError('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
  };

  const handleResetSms = () => {
    setSmsCode('');
    setSmsStatus('idle');
    setSmsTimer(0);
    setSmsError(null);
    setTouched((t) => ({ ...t, smsCode: false }));
  };

  const handlePhoneChange = (v: string) => {
    setPhone(formatPhone(v));
    if (smsStatus !== 'idle') handleResetSms();
  };

  const mmss = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-[480px] overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              {!showEmailForm ? (
                <div className="space-y-8">
                  <div className="text-center">
                    <img src="/logo.png" alt="Kbizrun" className="h-8 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {mode === 'login' ? '반가워요! 다시 오셨네요' : 'Kbizrun에 오신 걸 환영해요!'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-[15px]">
                      {mode === 'login' ? '로그인하고 합격 준비를 이어가세요' : '지금 가입하고 예상문제 샘플을 무료로 확인하세요'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleSocialDemo}
                      className="w-full bg-[#FEE500] text-[#3c1e1e] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#fdd835] transition-all active:scale-[0.98]"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="Kakao" className="h-5 w-5" />
                      카카오톡으로 시작하기
                    </button>

                    <button
                      type="button"
                      onClick={handleSocialDemo}
                      className="w-full bg-[#03C75A] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#02b350] transition-all active:scale-[0.98]"
                    >
                      <div className="bg-white text-[#03C75A] w-5 h-5 flex items-center justify-center font-black text-xs rounded-sm">N</div>
                      네이버로 시작하기
                    </button>

                    <button
                      type="button"
                      onClick={handleSocialDemo}
                      className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98]"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="h-5 w-5" />
                      구글로 시작하기
                    </button>

                    {submitNotice && (
                      <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2 text-[13px] text-blue-800">
                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{submitNotice}</span>
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
                        setSubmitNotice(null);
                        setShowEmailForm(true);
                      }}
                      className="w-full bg-gray-50 text-gray-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                      <Mail className="h-5 w-5" />
                      이메일로 {mode === 'login' ? '로그인' : '가입'}하기
                    </button>
                  </div>

                  <div className="text-center text-[14px]">
                    <span className="text-gray-500">
                      {mode === 'login' ? '아직 회원이 아니신가요?' : '이미 계정이 있으신가요?'}
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleMode}
                      className="ml-2 text-blue-600 font-bold hover:underline"
                    >
                      {mode === 'login' ? '회원가입' : '로그인'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-7">
                  <div>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6 text-sm font-medium"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      뒤로가기
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      이메일로 {mode === 'login' ? '로그인' : '회원가입'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-[15px]">
                      {mode === 'login' ? '아이디와 비밀번호를 입력해주세요' : '정보를 입력하여 가입을 완료해주세요'}
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    {mode === 'signup' && (
                      <FieldShell
                        label="이름"
                        error={touched.name && !nameResult.valid ? nameResult.message ?? '이름을 입력해주세요.' : undefined}
                      >
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="홍길동"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                          className={inputCls(touched.name && !nameResult.valid)}
                        />
                      </FieldShell>
                    )}

                    <FieldShell
                      label="이메일"
                      error={
                        touched.email && !emailResult.valid
                          ? emailResult.message ?? '이메일을 입력해주세요.'
                          : undefined
                      }
                    >
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        className={inputCls(touched.email && !emailResult.valid)}
                        autoComplete="email"
                      />
                    </FieldShell>

                    {/* A안: 중복 이메일 안내 (signup 모드에서 기존 provider가 감지됐을 때) */}
                    {mode === 'signup' && existingProvider && (
                      <ExistingAccountNotice
                        provider={existingProvider}
                        onSwitchToLogin={() => {
                          setMode('login');
                          setTouched((t) => ({ ...t, email: true }));
                        }}
                      />
                    )}

                    {mode === 'signup' && (
                      <div className="space-y-2">
                        <FieldShell
                          label="휴대폰 번호"
                          error={
                            touched.phone && !phoneResult.valid
                              ? phoneResult.message ?? '휴대폰 번호를 입력해주세요.'
                              : undefined
                          }
                        >
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="010-1234-5678"
                            value={phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                            disabled={smsStatus === 'verified'}
                            className={`${inputCls(touched.phone && !phoneResult.valid)} pr-[120px] disabled:bg-gray-50 disabled:text-gray-500`}
                            autoComplete="tel"
                            inputMode="numeric"
                          />
                          <button
                            type="button"
                            onClick={handleRequestSms}
                            disabled={
                              !phoneResult.valid ||
                              smsStatus === 'sending' ||
                              smsStatus === 'verified'
                            }
                            className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                              smsStatus === 'verified'
                                ? 'bg-green-50 text-green-600 cursor-default'
                                : !phoneResult.valid
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
                            }`}
                          >
                            {smsStatus === 'sending' ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : smsStatus === 'verified' ? (
                              <span className="flex items-center gap-1">
                                <ShieldCheck className="h-3.5 w-3.5" /> 인증완료
                              </span>
                            ) : smsStatus === 'sent' || smsStatus === 'verifying' ? (
                              '재전송'
                            ) : (
                              '인증번호 받기'
                            )}
                          </button>
                        </FieldShell>

                        {(smsStatus === 'sent' || smsStatus === 'verifying' || smsStatus === 'expired') && (
                          <div className="space-y-2">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="인증번호 6자리 입력"
                                value={smsCode}
                                onChange={(e) =>
                                  setSmsCode(e.target.value.replace(/\D/g, '').slice(0, SMS_CODE_LENGTH))
                                }
                                onBlur={() => setTouched((t) => ({ ...t, smsCode: true }))}
                                disabled={smsStatus === 'expired'}
                                className={`${inputCls(smsStatus === 'expired' || (touched.smsCode && !smsCodeResult.valid))} pl-4 pr-[110px] tabular-nums tracking-widest disabled:bg-gray-50 disabled:text-gray-400`}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={SMS_CODE_LENGTH}
                              />
                              {smsStatus !== 'expired' && smsTimer > 0 && (
                                <span className="absolute right-[96px] top-1/2 -translate-y-1/2 text-xs font-bold text-red-500 tabular-nums">
                                  {mmss(smsTimer)}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={handleVerifySms}
                                disabled={!smsCodeResult.valid || smsStatus === 'verifying' || smsStatus === 'expired'}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                                  smsCodeResult.valid && smsStatus !== 'expired'
                                    ? 'bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.98]'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {smsStatus === 'verifying' ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  '인증 확인'
                                )}
                              </button>
                            </div>
                            {smsError && (
                              <p className="text-[12px] text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3.5 w-3.5" /> {smsError}
                              </p>
                            )}
                            {!smsError && smsStatus === 'sent' && (
                              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                                <Info className="h-3 w-3" />
                                데모용 인증번호:{' '}
                                <span className="font-bold text-blue-600 tabular-nums">{DEMO_SMS_CODE}</span>
                                <span className="text-gray-400 ml-1">(Phase 2에 실 SMS로 대체 예정)</span>
                              </p>
                            )}
                          </div>
                        )}

                        {smsStatus === 'verified' && (
                          <p className="text-[12px] text-green-600 flex items-center gap-1 font-medium">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            휴대폰 인증이 완료되었습니다.
                          </p>
                        )}
                      </div>
                    )}

                    <FieldShell label="비밀번호">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={mode === 'signup' ? '영문·숫자·특수문자 포함 8자 이상' : '비밀번호 입력'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                        className={`${inputCls(mode === 'signup' && touched.password && !pwStrong)} pr-12`}
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </FieldShell>

                    {mode === 'signup' && password.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 -mt-2 text-[11px]">
                        <PasswordCheck ok={pwChecks.minLength}>8자 이상</PasswordCheck>
                        <PasswordCheck ok={pwChecks.hasLetter}>영문 포함</PasswordCheck>
                        <PasswordCheck ok={pwChecks.hasNumber}>숫자 포함</PasswordCheck>
                        <PasswordCheck ok={pwChecks.hasSymbol}>특수문자 포함</PasswordCheck>
                      </div>
                    )}

                    {mode === 'signup' && (
                      <FieldShell
                        label="비밀번호 확인"
                        error={
                          touched.confirm && !confirmResult.valid
                            ? confirmResult.message ?? '비밀번호 확인이 필요합니다.'
                            : undefined
                        }
                      >
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="비밀번호 다시 입력"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                          className={`${inputCls(touched.confirm && !confirmResult.valid)} pr-12`}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </FieldShell>
                    )}

                    {mode === 'signup' && (
                      <div className="bg-gray-50 rounded-2xl p-5 space-y-4 mt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div
                            onClick={() => handleAgreementChange('all')}
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${agreements.all ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}
                          >
                            {agreements.all && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                          </div>
                          <span className="text-sm font-bold text-gray-900">전체 동의하기</span>
                        </label>

                        <div className="w-full h-px bg-gray-200"></div>

                        <div className="space-y-3">
                          <AgreementRow
                            checked={agreements.terms}
                            onToggle={() => handleAgreementChange('terms')}
                            label="[필수] 이용약관 동의"
                            onView={() => setLegalDocToView('terms')}
                          />
                          <AgreementRow
                            checked={agreements.privacy}
                            onToggle={() => handleAgreementChange('privacy')}
                            label="[필수] 개인정보 수집 및 이용 동의"
                            onView={() => setLegalDocToView('privacy')}
                          />
                          <AgreementRow
                            checked={agreements.marketing}
                            onToggle={() => handleAgreementChange('marketing')}
                            label="[선택] 마케팅 정보 수신 동의"
                            onView={() => setLegalDocToView('marketing')}
                          />
                        </div>
                      </div>
                    )}

                    {submitNotice && (
                      <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-2 text-[13px] text-blue-800">
                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{submitNotice}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={`w-full font-bold py-4 rounded-2xl transition-all mt-4 flex items-center justify-center gap-2 ${
                        canSubmit
                          ? 'bg-[#2563eb] text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/20'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      {mode === 'login' ? '로그인' : '가입하기'}
                    </button>
                  </form>

                  {mode === 'login' && (
                    <div className="flex justify-center gap-4 text-sm text-gray-500">
                      <button className="hover:text-gray-800">아이디 찾기</button>
                      <span className="text-gray-200">|</span>
                      <button className="hover:text-gray-800">비밀번호 찾기</button>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-8 text-[11px] text-gray-400 text-center leading-relaxed">
                가입 시 Kbizrun의{' '}
                <button
                  type="button"
                  onClick={() => setLegalDocToView('terms')}
                  className="underline hover:text-gray-600"
                >
                  이용약관
                </button>{' '}
                및{' '}
                <button
                  type="button"
                  onClick={() => setLegalDocToView('privacy')}
                  className="underline hover:text-gray-600"
                >
                  개인정보 수집 및 이용
                </button>
                에 동의하게 됩니다.
              </p>
            </div>
          </motion.div>

          <LegalDocModal
            isOpen={legalDocToView !== null}
            onClose={() => setLegalDocToView(null)}
            docType={legalDocToView ?? 'terms'}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

function inputCls(hasError: boolean): string {
  return `w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all ${
    hasError
      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
      : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
  }`;
}

function FieldShell({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>
      <div className="relative">{children}</div>
      {error && (
        <p className="text-xs text-red-500 ml-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

function PasswordCheck({
  ok,
  children,
}: {
  ok: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`flex items-center gap-1 ${
        ok ? 'text-green-600' : 'text-gray-400'
      }`}
    >
      <Check className={`h-3 w-3 ${ok ? 'opacity-100' : 'opacity-40'}`} />
      {children}
    </span>
  );
}

function AgreementRow({
  checked,
  onToggle,
  label,
  onView,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  onView: () => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-3">
        <div
          onClick={onToggle}
          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-gray-300 group-hover:border-blue-400'
          }`}
        >
          {checked && <Check className="h-3 w-3 text-white stroke-[3]" />}
        </div>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onView();
        }}
        className="text-[10px] text-gray-400 underline hover:text-gray-700"
      >
        보기
      </button>
    </label>
  );
}

function ExistingAccountNotice({
  provider,
  onSwitchToLogin,
}: {
  provider: AuthProvider;
  onSwitchToLogin: () => void;
}) {
  const label = providerLabel[provider];
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2 text-[13px] text-amber-900">
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
      <div className="flex-1">
        <p className="font-bold mb-0.5">이미 가입된 이메일입니다</p>
        <p className="text-amber-800">
          이 이메일은 <span className="font-bold">{label}</span>로 먼저 가입되어 있어요.{' '}
          {provider === 'email' ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="underline font-bold hover:text-amber-950"
            >
              로그인하러 가기
            </button>
          ) : (
            <>
              상단의 <span className="font-bold">{label}</span> 버튼으로 로그인해 주세요.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
