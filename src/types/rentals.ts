export interface RentalItemMetadata {
  color?: string;
  material?: string;
  dimensions?: string;
}

export interface RentalItem {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  totalQuantity: number;
  price: number;
  metadata: RentalItemMetadata;
  createdAt: string;
  updatedAt: string;
  availableQuantity: number;
}

export interface Pagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

export interface RentalItemsResponse {
  success: boolean;
  data: RentalItem[];
  pagination: Pagination;
  message?: string;
}

export interface RentalItemResponse {
  success: boolean;
  data: RentalItem;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface RentalFilters {
  category?: string;
  name?: string;
}

/*
-------------------------------------------------------------------
---  DATE RANGE (event date -> derived pickup/return window)
-------------------------------------------------------------------
*/
export interface RentalDateRange {
  startDate: string; // ISO YYYY-MM-DD (pickup)
  endDate: string; // ISO YYYY-MM-DD (return)
}

/*
-------------------------------------------------------------------
---  CART
-------------------------------------------------------------------
*/
export interface CartItem {
  item: RentalItem; // snapshot used for display (name, image, price)
  quantity: number;
}

/*
-------------------------------------------------------------------
---  RENTAL REQUEST (inquiry submission)
-------------------------------------------------------------------
*/
export interface RentalRequestLineItem {
  itemId: string;
  quantity: number;
}

export interface RequesterInfo {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface AgreementAcknowledgment {
  acknowledged: boolean;
  signatureName: string;
  agreementVersion: string;
}

export interface RentalRequestPayload {
  items: RentalRequestLineItem[];
  dateRange: RentalDateRange;
  requester: RequesterInfo;
  agreement: AgreementAcknowledgment;
}

export interface RentalRequestResponse {
  success: boolean;
  data?: {
    _id: string;
    status: string;
    [key: string]: unknown;
  };
  message?: string;
}
