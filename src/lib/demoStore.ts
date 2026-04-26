'use client';

import { getBookById } from '../data/books';
import { posts, type Post } from '../data/community';
import { mockCoupons, type Coupon } from '../data/coupons';
import { exams, getExam } from '../data/exams';
import { subjects } from '../data/subjects';
import { videos } from '../data/videos';

const KEYS = {
  profile: 'kbiz-demo-profile',
  cart: 'kbiz-book-cart',
  bookOrders: 'kbiz-book-orders',
  lessonProgress: 'kbiz-lesson-progress',
  examAttempts: 'kbiz-exam-attempts',
  favoriteBooks: 'kbiz-favorite-books',
  coupons: 'kbiz-user-coupons',
  communityPosts: 'kbiz-community-posts',
  mentoringBookings: 'kbiz-mentoring-bookings',
  notifications: 'kbiz-notifications',
};

export type BookOrderStatus = 'paid' | 'preparing' | 'shipped' | 'delivered';

export interface DemoProfile {
  name: string;
  email: string;
  phone: string;
  planName: string;
  planExpiresAt: string;
}

export interface UserCoupon {
  code: string;
  title: string;
  benefit: string;
  expiresAt: string;
  used: boolean;
  registeredAt: string;
}

export interface MentoringBooking {
  id: string;
  mentorName: string;
  topic: string;
  preferredTime: string;
  message: string;
  status: 'requested' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  createdAt: string;
  read: boolean;
}

export interface BookCartItem {
  bookId: string;
  quantity: number;
  addedAt: string;
}

export interface BookOrderItem {
  bookId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  recipientName: string;
  recipientPhone: string;
  zipcode: string;
  address1: string;
  address2: string;
  memo: string;
}

export interface BookOrder {
  orderNo: string;
  items: BookOrderItem[];
  shipping: ShippingAddress;
  status: BookOrderStatus;
  totalAmount: number;
  payMethod: string;
  trackingNo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  videoId: string;
  subjectId: string;
  watchedSeconds: number;
  durationSeconds: number;
  completed: boolean;
  lastWatchedAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  subjectId: string;
  title: string;
  score: number;
  correctCount: number;
  totalCount: number;
  answers: { questionId: number; selected: number | null; correct: number }[];
  wrongQuestionIds: number[];
  submittedAt: string;
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoProfile(): DemoProfile {
  return readJson<DemoProfile>(KEYS.profile, {
    name: '김조달',
    email: 'seoulartb@gmail.com',
    phone: '010-1234-5678',
    planName: '3개월 이용권',
    planExpiresAt: '2026-07-01',
  });
}

export function saveDemoProfile(profile: DemoProfile) {
  writeJson(KEYS.profile, profile);
}

export function getFavoriteBooks(): string[] {
  return readJson<string[]>(KEYS.favoriteBooks, []);
}

export function isFavoriteBook(bookId: string): boolean {
  return getFavoriteBooks().includes(bookId);
}

export function toggleFavoriteBook(bookId: string): string[] {
  const favorites = getFavoriteBooks();
  const next = favorites.includes(bookId)
    ? favorites.filter((id) => id !== bookId)
    : [bookId, ...favorites];
  writeJson(KEYS.favoriteBooks, next.filter((id) => getBookById(id)));
  return next;
}

export function getBookCart(): BookCartItem[] {
  return readJson<BookCartItem[]>(KEYS.cart, []);
}

export function saveBookCart(items: BookCartItem[]) {
  writeJson(KEYS.cart, items.filter((item) => getBookById(item.bookId) && item.quantity > 0));
}

export function addBookToCart(bookId: string, quantity: number) {
  const now = new Date().toISOString();
  const items = getBookCart();
  const existing = items.find((item) => item.bookId === bookId);
  if (existing) {
    existing.quantity += quantity;
    existing.addedAt = now;
  } else {
    items.push({ bookId, quantity, addedAt: now });
  }
  saveBookCart(items);
}

export function replaceBookCart(items: BookCartItem[]) {
  saveBookCart(items.map((item) => ({ ...item, addedAt: item.addedAt || new Date().toISOString() })));
}

export function clearBookCart() {
  saveBookCart([]);
}

export function getCartTotal(items = getBookCart()) {
  return items.reduce((sum, item) => {
    const book = getBookById(item.bookId);
    return sum + (book ? book.price * item.quantity : 0);
  }, 0);
}

export function getBookOrders(): BookOrder[] {
  return readJson<BookOrder[]>(KEYS.bookOrders, []);
}

export function createBookOrder(input: {
  items: BookCartItem[];
  shipping: ShippingAddress;
  payMethod: string;
}): BookOrder {
  const now = new Date();
  const orderItems: BookOrderItem[] = input.items
    .map((item) => {
      const book = getBookById(item.bookId);
      if (!book) return null;
      return {
        bookId: book.id,
        title: book.title,
        quantity: item.quantity,
        unitPrice: book.price,
      };
    })
    .filter((item): item is BookOrderItem => Boolean(item));

  const order: BookOrder = {
    orderNo: `BK${now.getFullYear()}${String(now.getTime()).slice(-8)}`,
    items: orderItems,
    shipping: input.shipping,
    status: 'preparing',
    totalAmount: orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    payMethod: input.payMethod,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  writeJson(KEYS.bookOrders, [order, ...getBookOrders()]);
  clearBookCart();
  return order;
}

export function getPaymentRecords() {
  return getBookOrders().map((order) => ({
    id: order.orderNo,
    label: order.items[0]?.title
      ? `${order.items[0].title}${order.items.length > 1 ? ` 외 ${order.items.length - 1}건` : ''}`
      : '교재 주문',
    amount: order.totalAmount,
    method: order.payMethod,
    paidAt: order.createdAt,
  }));
}

export function getUserCoupons(): UserCoupon[] {
  return readJson<UserCoupon[]>(KEYS.coupons, []);
}

export function registerUserCoupon(code: string): { ok: boolean; message: string; coupons: UserCoupon[] } {
  const normalized = code.trim().toUpperCase();
  const source: Coupon | undefined = mockCoupons[normalized];
  const current = getUserCoupons();
  if (!source) return { ok: false, message: '존재하지 않는 쿠폰 번호입니다.', coupons: current };
  if (source.used) return { ok: false, message: '이미 사용된 쿠폰입니다.', coupons: current };
  if (new Date(source.expiresAt).getTime() < Date.now()) return { ok: false, message: '유효기간이 지난 쿠폰입니다.', coupons: current };
  if (current.some((coupon) => coupon.code === normalized)) return { ok: false, message: '이미 등록된 쿠폰입니다.', coupons: current };
  const next: UserCoupon[] = [
    {
      code: source.code,
      title: source.title,
      benefit: source.benefit,
      expiresAt: source.expiresAt,
      used: false,
      registeredAt: new Date().toISOString(),
    },
    ...current,
  ];
  writeJson(KEYS.coupons, next);
  return { ok: true, message: '쿠폰이 등록되었습니다.', coupons: next };
}

export type CommunityPost = Post;

export function getCommunityPosts(): CommunityPost[] {
  return readJson<CommunityPost[]>(KEYS.communityPosts, posts);
}

export function getCommunityPost(id: number): CommunityPost | undefined {
  return getCommunityPosts().find((post) => post.id === id);
}

export function createCommunityPost(input: {
  subject: string;
  type: CommunityPost['type'];
  title: string;
  author: string;
  body: string;
}): CommunityPost {
  const current = getCommunityPosts();
  const nextId = Math.max(0, ...current.map((post) => post.id)) + 1;
  const today = new Date().toISOString().slice(0, 10);
  const post: CommunityPost = {
    id: nextId,
    subject: input.subject,
    type: input.type,
    title: input.title,
    author: input.author,
    createdAt: today,
    views: 0,
    comments: 0,
    body: input.body,
    replies: [],
  };
  writeJson(KEYS.communityPosts, [post, ...current]);
  return post;
}

export function addCommunityReply(postId: number, input: { author: string; body: string }): CommunityPost | null {
  const current = getCommunityPosts();
  const idx = current.findIndex((post) => post.id === postId);
  if (idx < 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  const target = current[idx];
  const replies = [...(target.replies ?? []), { author: input.author, body: input.body, createdAt: today }];
  const updated: CommunityPost = { ...target, replies, comments: replies.length };
  const next = [...current];
  next[idx] = updated;
  writeJson(KEYS.communityPosts, next);
  return updated;
}

export function getMentoringBookings(): MentoringBooking[] {
  return readJson<MentoringBooking[]>(KEYS.mentoringBookings, []);
}

export function createMentoringBooking(input: {
  mentorName: string;
  topic: string;
  preferredTime: string;
  message: string;
}): MentoringBooking {
  const booking: MentoringBooking = {
    id: `MB${Date.now()}`,
    mentorName: input.mentorName,
    topic: input.topic,
    preferredTime: input.preferredTime,
    message: input.message,
    status: 'requested',
    createdAt: new Date().toISOString(),
  };
  writeJson(KEYS.mentoringBookings, [booking, ...getMentoringBookings()]);
  return booking;
}

export function getNotifications(): DemoNotification[] {
  return readJson<DemoNotification[]>(KEYS.notifications, [
    { id: 'notice-1', title: '신규 강의 업로드 — 필기 기본이론', createdAt: new Date().toISOString(), read: false },
    { id: 'notice-2', title: '내 게시글에 새 댓글이 달렸어요', createdAt: new Date().toISOString(), read: false },
    { id: 'notice-3', title: '이용권이 7일 뒤 만료됩니다', createdAt: new Date().toISOString(), read: true },
  ]);
}

export function markNotificationRead(id: string): DemoNotification[] {
  const next = getNotifications().map((item) => (item.id === id ? { ...item, read: true } : item));
  writeJson(KEYS.notifications, next);
  return next;
}

export function getLessonProgress(): LessonProgress[] {
  return readJson<LessonProgress[]>(KEYS.lessonProgress, []);
}

export function getLessonProgressMap(): Record<string, LessonProgress> {
  return Object.fromEntries(getLessonProgress().map((item) => [item.videoId, item]));
}

export function saveLessonProgress(progress: LessonProgress) {
  const items = getLessonProgress();
  const idx = items.findIndex((item) => item.videoId === progress.videoId);
  if (idx >= 0) items[idx] = progress;
  else items.push(progress);
  writeJson(KEYS.lessonProgress, items);
}

export function getSubjectProgress(subjectId: string): number {
  const subjectVideos = videos.filter((video) => video.subjectId === subjectId);
  if (subjectVideos.length === 0) return subjects.find((s) => s.id === subjectId)?.progress ?? 0;
  const progress = getLessonProgressMap();
  const totalPct = subjectVideos.reduce((sum, video) => {
    const item = progress[video.id];
    if (!item) return sum;
    const pct = item.completed ? 100 : Math.min(100, Math.round((item.watchedSeconds / video.durationSec) * 100));
    return sum + pct;
  }, 0);
  return Math.round(totalPct / subjectVideos.length);
}

export function getExamAttempts(): ExamAttempt[] {
  return readJson<ExamAttempt[]>(KEYS.examAttempts, []);
}

export function saveExamAttempt(input: {
  examId: string;
  answers: { questionId: number; selected: number | null; correct: number }[];
}): ExamAttempt | null {
  const exam = getExam(input.examId);
  if (!exam) return null;
  const correctCount = input.answers.filter((item) => item.selected === item.correct).length;
  const totalCount = exam.questions.length;
  const now = new Date().toISOString();
  const attempt: ExamAttempt = {
    id: `EA${Date.now()}`,
    examId: exam.id,
    subjectId: exam.subjectId,
    title: exam.title,
    score: Math.round((correctCount / totalCount) * 100),
    correctCount,
    totalCount,
    answers: input.answers,
    wrongQuestionIds: input.answers
      .filter((item) => item.selected !== item.correct)
      .map((item) => item.questionId),
    submittedAt: now,
  };
  writeJson(KEYS.examAttempts, [attempt, ...getExamAttempts()]);
  return attempt;
}

export function getLatestAttempt(examId: string): ExamAttempt | null {
  return getExamAttempts().find((attempt) => attempt.examId === examId) ?? null;
}

export function getWrongNoteCount(): number {
  const wrongIds = new Set<string>();
  for (const attempt of getExamAttempts()) {
    for (const questionId of attempt.wrongQuestionIds) {
      wrongIds.add(`${attempt.examId}:${questionId}`);
    }
  }
  return wrongIds.size;
}

export function getLearningSummary() {
  const progress = getLessonProgress();
  const attempts = getExamAttempts();
  const watchedSeconds = progress.reduce((sum, item) => sum + item.watchedSeconds, 0);
  const answeredQuestions = attempts.reduce((sum, item) => sum + item.totalCount, 0);
  const correctQuestions = attempts.reduce((sum, item) => sum + item.correctCount, 0);
  return {
    watchedSeconds,
    answeredQuestions,
    averageScore: attempts.length
      ? Math.round(attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length)
      : 0,
    accuracy: answeredQuestions ? Math.round((correctQuestions / answeredQuestions) * 100) : 0,
  };
}

export function seedDemoAttemptsIfEmpty() {
  if (getExamAttempts().length > 0) return;
  const first = exams[0];
  if (!first) return;
  saveExamAttempt({
    examId: first.id,
    answers: first.questions.map((q, i) => ({
      questionId: q.id,
      selected: i % 4 === 0 ? (q.answer + 1) % q.choices.length : q.answer,
      correct: q.answer,
    })),
  });
}
