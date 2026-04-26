export interface Coupon {
  code: string;
  title: string;
  benefit: string;
  expiresAt: string;
  used: boolean;
  kind?: 'coop';
}

export const COOP_COUPON_KIND = 'coop' as const;

// Phase 2에서 Supabase 조회로 교체. 현재는 프론트 데모용.
export const mockCoupons: Record<string, Coupon> = {
  'WELCOME-2026': {
    code: 'WELCOME-2026',
    title: '신규가입 환영 쿠폰',
    benefit: '전 강의 15% 할인',
    expiresAt: '2026-06-30',
    used: false,
  },
  'EXAM-FREE-2': {
    code: 'EXAM-FREE-2',
    title: '기출문제 2건 무료',
    benefit: '무료 모의고사 2회 제공',
    expiresAt: '2026-12-31',
    used: false,
  },
  'EARLYBIRD-30': {
    code: 'EARLYBIRD-30',
    title: '얼리버드 할인 쿠폰',
    benefit: '연간 이용권 30% 할인',
    expiresAt: '2026-05-31',
    used: false,
  },
  'USED-SAMPLE': {
    code: 'USED-SAMPLE',
    title: '(이미 사용된 샘플)',
    benefit: '—',
    expiresAt: '2026-04-01',
    used: true,
  },
  'COOP-2026': {
    code: 'COOP-2026',
    title: '협동조합 전용 쿠폰',
    benefit: '필기+실기 올인원 800,000원 할인 (1,290,000 → 490,000원)',
    expiresAt: '2026-12-31',
    used: false,
    kind: 'coop',
  },
  'COOP-MEMBER-2026': {
    code: 'COOP-MEMBER-2026',
    title: '협동조합 조합원 쿠폰',
    benefit: '필기+실기 올인원 800,000원 할인 (1,290,000 → 490,000원)',
    expiresAt: '2026-12-31',
    used: false,
    kind: 'coop',
  },
};

export type CouponLookupResult =
  | { status: 'success'; coupon: Coupon }
  | { status: 'used'; coupon: Coupon }
  | { status: 'expired'; coupon: Coupon }
  | { status: 'not_found' };

export function lookupCoupon(codeRaw: string): CouponLookupResult {
  const code = codeRaw.trim().toUpperCase();
  const coupon = mockCoupons[code];
  if (!coupon) return { status: 'not_found' };
  if (coupon.used) return { status: 'used', coupon };
  const now = new Date();
  const exp = new Date(coupon.expiresAt);
  if (exp < now) return { status: 'expired', coupon };
  return { status: 'success', coupon };
}
