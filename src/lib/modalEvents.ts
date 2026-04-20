export type AuthMode = 'login' | 'signup';

export const AUTH_MODAL_EVENT = 'kbiz:auth-modal';
export const COUPON_MODAL_EVENT = 'kbiz:coupon-modal';

export function openAuthModal(mode: AuthMode = 'login') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<AuthMode>(AUTH_MODAL_EVENT, { detail: mode }));
}

export function openCouponModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(COUPON_MODAL_EVENT));
}
