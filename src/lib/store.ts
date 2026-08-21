/**
 * LNMHS Admin Store
 * Uses localStorage to persist admin-created news, events, and notifications.
 * Falls back gracefully on the server (SSR safe).
 */

import { NewsItem, EventItem } from '@/data/news';

export type Notification = {
  id: string;
  message: string;
  linkText?: string;
  linkHref?: string;
  active: boolean;
  createdAt: string;
};

const KEYS = {
  news: 'lnmhs_admin_news',
  events: 'lnmhs_admin_events',
  notifications: 'lnmhs_admin_notifications',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// ── News ──────────────────────────────────────────────────────────────
export function getAdminNews(): NewsItem[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.news) || '[]');
  } catch {
    return [];
  }
}

export function saveAdminNews(items: NewsItem[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.news, JSON.stringify(items));
}

export function addNewsItem(item: NewsItem): void {
  const items = getAdminNews();
  saveAdminNews([item, ...items]);
}

export function updateNewsItem(updated: NewsItem): void {
  const items = getAdminNews().map((n) => (n.id === updated.id ? updated : n));
  saveAdminNews(items);
}

export function deleteNewsItem(id: string): void {
  saveAdminNews(getAdminNews().filter((n) => n.id !== id));
}

// ── Events ────────────────────────────────────────────────────────────
export function getAdminEvents(): EventItem[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.events) || '[]');
  } catch {
    return [];
  }
}

export function saveAdminEvents(items: EventItem[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.events, JSON.stringify(items));
}

export function addEventItem(item: EventItem): void {
  const items = getAdminEvents();
  saveAdminEvents([item, ...items]);
}

export function updateEventItem(updated: EventItem): void {
  const items = getAdminEvents().map((e) => (e.id === updated.id ? updated : e));
  saveAdminEvents(items);
}

export function deleteEventItem(id: string): void {
  saveAdminEvents(getAdminEvents().filter((e) => e.id !== id));
}

// ── Notifications ─────────────────────────────────────────────────────
export function getNotifications(): Notification[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.notifications) || '[]');
  } catch {
    return [];
  }
}

export function saveNotifications(items: Notification[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(KEYS.notifications, JSON.stringify(items));
}

export function getActiveNotification(): Notification | null {
  const notifications = getNotifications();
  return notifications.find((n) => n.active) ?? null;
}

export function addNotification(n: Notification): void {
  saveNotifications([n, ...getNotifications()]);
}

export function updateNotification(updated: Notification): void {
  saveNotifications(getNotifications().map((n) => (n.id === updated.id ? updated : n)));
}

export function deleteNotification(id: string): void {
  saveNotifications(getNotifications().filter((n) => n.id !== id));
}

// ── Utils ─────────────────────────────────────────────────────────────
export function generateId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
