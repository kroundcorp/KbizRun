export interface FieldResult {
  valid: boolean;
  message?: string;
}

export function validateEmail(email: string): FieldResult {
  if (!email) return { valid: false };
  const trimmed = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(trimmed)) {
    return { valid: false, message: '올바른 이메일 형식이 아닙니다.' };
  }
  return { valid: true };
}

export interface PasswordChecks {
  minLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

export function evaluatePassword(pw: string): PasswordChecks {
  return {
    minLength: pw.length >= 8,
    hasLetter: /[A-Za-z]/.test(pw),
    hasNumber: /\d/.test(pw),
    hasSymbol: /[^A-Za-z0-9]/.test(pw),
  };
}

export function isPasswordStrong(pw: string): boolean {
  const c = evaluatePassword(pw);
  return c.minLength && c.hasLetter && c.hasNumber && c.hasSymbol;
}

export function validatePasswordConfirm(
  pw: string,
  confirm: string
): FieldResult {
  if (!confirm) return { valid: false };
  if (pw !== confirm)
    return { valid: false, message: '비밀번호가 일치하지 않습니다.' };
  return { valid: true };
}

export function validateName(name: string): FieldResult {
  const trimmed = name.trim();
  if (trimmed.length < 2)
    return { valid: false, message: '이름은 2자 이상 입력해주세요.' };
  if (trimmed.length > 20)
    return { valid: false, message: '이름은 20자 이하로 입력해주세요.' };
  return { valid: true };
}

// --- Mock "이미 가입된 이메일" 체크 (프론트 데모용) ---
// 실제 서버 연동 전까지 로컬 샘플로 A안(계정 연결) UI를 체험할 수 있도록.
// Phase 2에서 Supabase 조회로 교체.
export type AuthProvider = 'email' | 'kakao' | 'naver' | 'google';

export const mockExistingAccounts: Record<string, AuthProvider> = {
  'test@kbizrun.com': 'email',
  'demo@kakao.com': 'kakao',
  'demo@naver.com': 'naver',
  'demo@gmail.com': 'google',
};

export function checkExistingEmail(email: string): AuthProvider | null {
  const key = email.trim().toLowerCase();
  return mockExistingAccounts[key] ?? null;
}

export const providerLabel: Record<AuthProvider, string> = {
  email: '이메일',
  kakao: '카카오',
  naver: '네이버',
  google: '구글',
};
