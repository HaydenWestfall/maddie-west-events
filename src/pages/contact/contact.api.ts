import { env } from "../../config/env";

/**
 * Public contact form submissions.
 *
 * Both the event and studio forms post here. The backend (POST /api/contact)
 * requires only `name` and `email`; every other field is forwarded verbatim
 * into the coordinator's notification email, so a form can add fields without
 * a backend change. Nothing is persisted — this is email-only.
 */

/** Fields the backend validates by name; anything else is passed through. */
export interface ContactFormPayload {
  name: string;
  email: string;
  [field: string]: string;
}

interface ContactApiResponse {
  success: boolean;
  message?: string;
  /** Present on validation failures: { fieldName: "reason" }. */
  data?: Record<string, string>;
}

/** Submission failure carrying the per-field reasons, for a multi-line toast. */
export class ContactSubmitError extends Error {
  readonly details: string[];

  constructor(message: string, details: string[] = []) {
    super(message);
    this.name = "ContactSubmitError";
    this.details = details;
  }
}

const GENERIC_ERROR = "We couldn't send your message. Please try again.";

/**
 * Drop blank optional fields so they don't render as empty rows in the
 * coordinator's email. Required fields are validated by the caller first.
 */
const compact = (payload: ContactFormPayload): Record<string, string> =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== ""));

/** POST /api/contact — emails the coordinator. Rate limited per IP by the backend. */
export const submitContactForm = async (payload: ContactFormPayload): Promise<void> => {
  const res = await fetch(`${env.API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(compact(payload)),
  });

  const body: ContactApiResponse = await res.json().catch(() => ({ success: false }));
  if (res.ok && body.success) return;

  if (res.status === 429) {
    throw new ContactSubmitError(
      body.message || "Too many submissions from this network. Please try again in a little while.",
    );
  }

  // Validation failures come back as { message: "Validation failed", data: { field: reason } }.
  const details = Object.entries(body.data ?? {}).map(([field, reason]) => `${field}: ${reason}`);
  throw new ContactSubmitError(body.message || GENERIC_ERROR, details);
};
