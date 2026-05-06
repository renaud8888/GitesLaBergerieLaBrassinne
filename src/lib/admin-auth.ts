import crypto from 'node:crypto';

import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'site-admin-session';
const ADMIN_COOKIE_TTL = 60 * 60 * 24 * 7;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? '';
}

function getCookieSecret() {
  return process.env.ADMIN_COOKIE_SECRET || getAdminPassword();
}

function createSignature(value: string) {
  return crypto.createHmac('sha256', getCookieSecret()).update(value).digest('hex');
}

function createSessionValue() {
  const payload = 'authenticated';
  return `${payload}.${createSignature(payload)}`;
}

function isSessionValueValid(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split('.');

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = createSignature(payload);
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isSessionValueValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword) {
    return false;
  }

  const input = Buffer.from(password);
  const expected = Buffer.from(configuredPassword);

  return input.length === expected.length && crypto.timingSafeEqual(input, expected);
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ADMIN_COOKIE_TTL,
    path: '/',
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
