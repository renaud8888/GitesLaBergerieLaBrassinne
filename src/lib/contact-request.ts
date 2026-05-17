import { siteConfig } from '@/data/site';

export type ContactRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dates: string;
  arrivalDate?: string;
  departureDate?: string;
  gite: string;
  guests: string;
  contactPreference?: string;
  occasion?: string;
  message: string;
  consent?: boolean;
  requestType?: 'contact' | 'booking';
  company?: string;
};

export type ParsedContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dates: string;
  arrivalDate: string;
  departureDate: string;
  gite: string;
  guests: string;
  contactPreference: string;
  occasion: string;
  message: string;
  consent: boolean;
  requestType: string;
  company: string;
};

function normalizeValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getContactDestinationEmail() {
  return process.env.CONTACT_FORM_TO?.trim() || siteConfig.email;
}

export function parseContactRequest(payload: unknown): ParsedContactRequest {
  const record = typeof payload === 'object' && payload !== null ? payload as Record<string, unknown> : {};

  return {
    firstName: normalizeValue(record.firstName),
    lastName: normalizeValue(record.lastName),
    email: normalizeValue(record.email),
    phone: normalizeValue(record.phone),
    dates: normalizeValue(record.dates),
    arrivalDate: normalizeValue(record.arrivalDate),
    departureDate: normalizeValue(record.departureDate),
    gite: normalizeValue(record.gite),
    guests: normalizeValue(record.guests),
    contactPreference: normalizeValue(record.contactPreference),
    occasion: normalizeValue(record.occasion),
    message: normalizeValue(record.message),
    consent: record.consent === true,
    requestType: normalizeValue(record.requestType) || 'contact',
    company: normalizeValue(record.company),
  };
}

export function validateContactRequest(payload: ParsedContactRequest) {
  const requiredFields = payload.requestType === 'booking' ? ['firstName', 'lastName', 'email'] : ['firstName', 'lastName', 'email', 'message'];
  const missingFields = requiredFields.filter((field) => !payload[field as keyof ParsedContactRequest]);
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);

  if (missingFields.length > 0) {
    return {
      valid: false as const,
      error: 'missing_required_fields',
    };
  }

  if (!emailLooksValid) {
    return {
      valid: false as const,
      error: 'invalid_email',
    };
  }

  if (!payload.consent) {
    return {
      valid: false as const,
      error: 'missing_consent',
    };
  }

  return {
    valid: true as const,
  };
}
