import { env } from "../../config/env";
import { parseISODate, toISODate } from "../../shared/date-picker/date-utils";
import {
  RentalDateRange,
  RentalItem,
  RentalItemResponse,
  RentalItemsResponse,
  RentalRequestPayload,
  RentalRequestResponse,
} from "../../types/rentals";

/**
 * Buffer applied around the customer's single event date to derive the
 * reserved pickup -> return window sent to the backend. Kept as one constant
 * so it is trivial to tune (and ideally migrates server-side later).
 */
export const RENTAL_BUFFER_DAYS = {
  before: 1, // pickup this many days before the event
  after: 1, // return this many days after the event
};

/** Derive the reserved pickup/return window from a single event date. */
export const deriveDateRange = (eventDate: string): RentalDateRange => {
  const event = parseISODate(eventDate);
  const start = new Date(event);
  start.setDate(start.getDate() - RENTAL_BUFFER_DAYS.before);
  const end = new Date(event);
  end.setDate(end.getDate() + RENTAL_BUFFER_DAYS.after);
  return { startDate: toISODate(start), endDate: toISODate(end) };
};

const baseUrl = () => env.API_BASE_URL;

interface GetAvailableItemsParams {
  dateRange: RentalDateRange;
  category?: string;
  name?: string;
  page?: number;
  limit?: number;
}

/** GET /api/items/available — grid data with real availability for the window. */
export const getAvailableItems = async ({
  dateRange,
  category,
  name,
  page = 1,
  limit = 16,
}: GetAvailableItemsParams): Promise<RentalItemsResponse> => {
  const params = new URLSearchParams({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page: String(page),
    limit: String(limit),
  });
  if (category) params.append("category", category);
  if (name) params.append("name", name);

  const res = await fetch(`${baseUrl()}/api/items/available?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to load rental items (${res.status})`);
  }
  return res.json();
};

/** GET /api/items/{id} — single item detail with availability for the window. */
export const getItem = async (id: string, dateRange?: RentalDateRange): Promise<RentalItem> => {
  const params = new URLSearchParams();
  if (dateRange) {
    params.append("startDate", dateRange.startDate);
    params.append("endDate", dateRange.endDate);
  }
  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${baseUrl()}/api/items/${id}${query}`);
  if (!res.ok) {
    throw new Error(`Failed to load item (${res.status})`);
  }
  const body: RentalItemResponse = await res.json();
  return body.data;
};

/**
 * Fetch the full set of active categories (date-independent). Uses the plain
 * /api/items endpoint with a generous limit so the category filter is complete
 * rather than derived from a single paginated page.
 */
export const getCategories = async (): Promise<string[]> => {
  const params = new URLSearchParams({ page: "1", limit: "200" });
  const res = await fetch(`${baseUrl()}/api/items?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to load categories (${res.status})`);
  }
  const body: RentalItemsResponse = await res.json();
  const unique = new Set<string>();
  (body.data ?? []).forEach((item) => item.category && unique.add(item.category));
  return Array.from(unique).sort((a, b) => a.localeCompare(b));
};

/** POST /api/rental-requests — submit the inquiry. Backend emails both parties. */
export const createRentalRequest = async (payload: RentalRequestPayload): Promise<RentalRequestResponse> => {
  const res = await fetch(`${baseUrl()}/api/rental-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body: RentalRequestResponse = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !body.success) {
    throw new Error(body.message || "We couldn't submit your request. Please try again.");
  }
  return body;
};
